import { Router } from 'express';


const router = Router();

// Get https://api.spotify.com/v1/me/player/queue
router.get('/', async (req, res) => {
    try {
        // Get User Devices from Spotify API
        const queue = await fetch('https://api.spotify.com/v1/me/player/queue', {
            headers: {
                Authorization: `Bearer ${req.cookies.access_token}`,
            },
        });
        const queueJson = await queue.json();

        if (queueJson.error) {
            res.status(queueJson.error.status).json({ 
                success: false,
                error: queueJson.error
            });
            return;
        }

        res.status(200).json({
            ...queueJson
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: 'Error getting current queue' 
        });
    }   
})

export default router;