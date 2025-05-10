import { Router } from 'express';


const router = Router();

// Get https://api.spotify.com/v1/audio-features/
router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        // Get Song from API
        const features = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${req.cookies.access_token}`,
            },
        });
        const featuresJson = await features.json();

        if (featuresJson.error) {
            res.status(featuresJson.error.status).json({ 
                success: false,
                error: featuresJson.error
            });
            return;
        }

        res.status(200).json({
            ...featuresJson
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: 'Error getting audio features' 
        });
    }   
})

export default router;