import { Router } from 'express';

const router = Router();

// Get https://api.spotify.com/v1/me/player/devices
router.get('/', async (req, res) => {
    try {
        // Get User Devices from Spotify API
        const devices = await fetch('https://api.spotify.com/v1/me/player/devices', {
            headers: {
                Authorization: `Bearer ${req.cookies.access_token}`,
            },
        });
        const devicesJson = await devices.json();

        if (devicesJson.error) {
            res.status(devicesJson.error.status).json({ 
                success: false,
                error: devicesJson.error
            });
            return;
        }

        res.status(200).json({
            ...devicesJson
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: 'Error getting active devices' 
        });
    }   
})

export default router;