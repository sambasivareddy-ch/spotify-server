import { Router } from 'express';


const router = Router();

// Get https://api.spotify.com/v1/me/playlists
router.get('/', async (req, res) => {
    try {
        // Get User Devices from Spotify API
        const playLists = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                Authorization: `Bearer ${req.cookies.access_token}`,
            },
        });
        const playListsJson = await playLists.json();

        if (playListsJson.error) {
            res.status(playListsJson.error.status).json({ 
                success: false,
                error: playListsJson.error
            });
            return;
        }

        res.status(200).json({
            ...playListsJson
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: 'Error getting playlists' 
        });
    }   
})

export default router;