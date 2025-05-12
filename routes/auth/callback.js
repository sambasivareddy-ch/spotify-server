import { Router } from 'express';

import { getRedisClient } from '../../db/redis.js';

const router = Router();

// Callback routes
router.get('/', async (req, res) => {
    const code  = req.query.code ;
    const state  = req.query.state ;
    const error = req.query.error ;

    if (error) {
        console.error(`Error: ${error}`);
        res.send(`Error: ${error}`);
        return;
    }

    if (!code || !state) {
        console.error('Invalid code or state');
        res.send('Invalid code or state');
        return;
    }

    const redisClient = getRedisClient();
    // let storedState = null;
    // if (redisClient) {
    //     await redisClient.get('state').then((reply) => {
    //         storedState = reply;
    //     });
    // }

    // if (state !== storedState) {
    //     console.error('State mismatch');
    //     res.send('State mismatch');
    //     return;
    // }

    // redisClient?.del('state');
    
    // Exchange the code for an access token and refresh token
    // Save the tokens in Redis
    // Redirect to the frontend
    const client_id= process.env.CLIENT_ID;
    const client_secret= process.env.CLIENT_SECRET;
    const request_uri = process.env.REQUEST_URI || "";
    const redirect_uri = process.env.REDIRECT_URI || "";

    try {
        const response = await fetch(request_uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri
            })
        });

        const data = await response.json();
        const access_token = data.access_token;
        const refresh_token = data.refresh_token;
        const expires_in = data.expires_in;

        const userProfile = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const userProfileJson = await userProfile.json();

        if (userProfileJson.error) {
            res.status(userProfileJson.error.status | 500).json({ 
                success: false,
                error: 'Error getting user profile' 
            });
            return;
        }

        if (redisClient) {
            const redisUserCache = {
                access_token,
                refresh_token,
                expires_at: Date.now() + expires_in * 1000
            };
            redisClient.set(`user:${userProfileJson.id}`, JSON.stringify(redisUserCache));
        }

        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',       // Required for cross-site cookies
        }); // Persists until user clicked logout

        res.send(`
            <html>
                <head>
                <script>
                    window.location.href = '${req.headers.origin}/profile';
                </script>
                </head>
                <body>Redirecting to your dashboard...</body>
            </html>
        `);
    } catch (err) {
        console.error(`Error: ${err}`);
        res.send(`Error: ${err}`);
    }
});

export default router;