import { Router } from 'express';
import { getRedisClient } from '../../db/redis.js';

const router = Router();

router.get('/', async (req, res) => {
    const token = req.cookies.access_token;
    const redisClient = getRedisClient()

    const userProfile = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${req.cookies.access_token}`,
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

    if (token) {
      // optionally verify token
      if (redisClient) {
        const data = await redisClient.get(`user:${userProfileJson.id}`)

        if (data) {
            const savedToken = JSON.parse(data)
            if (savedToken.expires_at < Date.now()) {
                res.json({ authenticated: false });
                return;
            }
        }
      }
      res.json({ authenticated: true });
    } else {
      res.json({ authenticated: false });
    }
});
  

export default router;