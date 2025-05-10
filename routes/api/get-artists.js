import { Router } from 'express';

const router = Router();

// Get https://api.spotify.com/v1/me/top/artists
router.get('/', async (req, res) => {
    try {
        // Get Users top artists from Spotify API
        const topArtists = await fetch('https://api.spotify.com/v1/me/top/artists', {
            headers: {
                Authorization: `Bearer ${req.cookies.access_token}`,
            },
        });
        const topArtistsJson = await topArtists.json();

        if (topArtistsJson.error) {
            res.status(topArtistsJson.error.status).json({ 
                success: false,
                error: topArtistsJson.error
            });
            return;
        }

        res.status(200).json({
            ...topArtistsJson
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: 'Error getting top artists' 
        });
    }   
})

export default router;