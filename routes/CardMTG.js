const CardMTG = require('../models/CardMTG');
const express = require('express');
const router = express.Router();

router.get('/card/:id', async (req, res) => {
    console.log("Card IMG hit");
    console.log("Params:", JSON.stringify(req.params));
    console.log("Body:", JSON.stringify(req.body));
    console.log("Query:", JSON.stringify(req.query));
    console.log("---------------");

    try {
        const cardId = req.params.id;
        const card = await CardMTG.findOne({ id: cardId });

        if (!card) {
            return res.status(404).json({ exists: false, message: 'Card not found', badID: cardId });
        }

        let cardImgUris = [];

        if (card.image_uris?.normal) {
            cardImgUris.push(card.image_uris.normal);
        }

        if (card.card_faces) {
            card.card_faces.forEach(face => {
                const faceImgUri = face.image_uris?.normal;
                if (faceImgUri) {
                    cardImgUris.push(faceImgUri);
                }
            });
        }

        if (cardImgUris.length === 0) {
            return res.status(404).json({ exists: false, message: 'No card URI' });
        }

        res.json({ exists: true, cardImgUris });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

