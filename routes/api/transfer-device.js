import { Router } from 'express';


const router = Router();

// Get https://api.spotify.com/v1/me/player
router.put('/', async (req, res) => {
    const { device_id, track_uri } = req.body;

    try {
        // Transfer Playback Devices
        const devices = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id[0]}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${req.cookies.access_token}`,
            },
            body: JSON.stringify({
                uris: [track_uri], 
            })
        });

        // Don't parse if status is 204 (No Content)
        if (devices.status !== 204) {
            throw Error("Invalid Response")
        }

        res.status(204);
    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: 'Error in transferring devices' 
        });
    }   
})

export default router;