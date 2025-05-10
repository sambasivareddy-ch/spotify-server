import { Router } from 'express';


const router = Router();

// Get https://api.spotify.com/v1/me
router.get('/', async (req, res) => {
    try {
        // Get Profile from Spotify API
        const userProfile = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${req.cookies.access_token}`,
            },
        });
        const userProfileJson = await userProfile.json();

        if (userProfileJson.error) {
            res.status(userProfileJson.error.status).json({ 
                success: false,
                error: userProfileJson.error
            });
            return;
        }

        res.status(200).json({
            ...userProfileJson
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: 'Error getting user profile' 
        });
    }   
})

export default router;