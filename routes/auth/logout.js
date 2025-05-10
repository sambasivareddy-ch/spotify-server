import { Router } from 'express';
import { getRedisClient } from '../../db/redis.js';

const router = Router();

router.post('/', async (req, res) => {
    const redistClieent = getRedisClient()

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

    if (redistClieent) {
        redistClieent.del(`user:${userProfileJson.id}`)
    }

    res.clearCookie('access_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
    res.json({ message: 'Logged out successfully' });
});
  

export default router;