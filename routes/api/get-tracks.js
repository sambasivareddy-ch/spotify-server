import { Router } from 'express';


const router = Router();

// Get https://api.spotify.com/v1/me/top/tracks
router.get('/', async (req, res) => {
    try {
        // Get User's top tracks from Spotify API
        const topTracks = await fetch('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
                Authorization: `Bearer ${req.cookies.access_token}`,
            },
        });
        const topTracksJson = await topTracks.json();

        if (topTracksJson.error) {
            res.status(topTracksJson.error.status).json({ 
                success: false,
                error: topTracksJson.error
            });
            return;
        }

        res.status(200).json({
            ...topTracksJson
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: 'Error getting top tracks' 
        });
    }   
})

export default router;