const Player = require('../models/Player');
const express = require('express');
const { exists } = require('../models/User');
const router = express.Router();

router.get('/players/:id', async (req, res) => {
    try {
        const playerId = req.params.id;
        const player = await Player.findOne({ player_id: playerId });

        if (!player) {
            return res.json({exists: false});
        }

        res.json({exists: true, player});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;