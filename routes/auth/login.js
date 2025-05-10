import { Router } from 'express';
import querystring from 'querystring';

import { generateRandomString } from '../../utils/utils.js';
import { getRedisClient } from '../../db/redis.js';

const router = Router();

// Login route
router.get('/', (req, res) => {
    const client_id = process.env.CLIENT_ID;
    const redirect_uri = process.env.REDIRECT_URI;
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email user-top-read user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-playback-state playlist-read-private playlist-read-collaborative';

    const queryParams = querystring.stringify({
        response_type: 'code',
        client_id,
        scope,
        redirect_uri,
        state
    });

    const redisClient = getRedisClient();
    if (redisClient) {
        redisClient.set('state', state);
    }

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

export default router;