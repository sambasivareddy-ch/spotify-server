import { Router } from 'express';

const router = Router();

// Get https://api.spotify.com/v1/tracks/{id}
router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        // Get Song from API
        const track = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                Authorization: `Bearer ${req.cookies.access_token}`,
            },
        });
        const trackJson = await track.json();

        if (trackJson.error) {
            res.status(trackJson.error.status).json({ 
                success: false,
                error:trackJson.error
            });
            return;
        }

        res.status(200).json({
            ...trackJson
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: 'Error getting song' 
        });
    }   
})

export default router;