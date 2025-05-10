import { Router } from 'express';


const router = Router();

// Get https://api.spotify.com/v1/playlists/{playlist_id}/tracks
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Get User Devices from Spotify API
        const playLists = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
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
            error: 'Error getting playlist tracks' 
        });
    }   
})

export default router;