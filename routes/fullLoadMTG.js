const CardMTG = require('../models/CardMTG');
const express = require('express');
const router = express.Router();

router.get('/allCards/', async (req, res) => {
    console.log("Database Hit - All Cards");
    console.log("Params:", JSON.stringify(req.params));
    console.log("Body:", JSON.stringify(req.body));
    console.log("Query:", JSON.stringify(req.query));
    console.log("---------------");

    try {
        const cards = await CardMTG.aggregate([
            {
                $project: {
                    Id: "$id",
                    Name: "$name",
                    Lang: "$lang",
                    ReleasedAt: "$released_at",
                    CMC: "$cmc",
                    Type: "$type_line",
                    Color: "$color_identity",
                    Set: "$set",
                    FullArt: '$full_art',
                    Image: "$image_uris.normal",CardFaces: {
                        $map: {
                            input: "$card_faces",
                            as: "face",
                            in: {
                                $mergeObjects: [
                                    "$$face", 
                                    { 
                                        ManaCost: "$$face.mana_cost",
                                        Power: "$$face.power",
                                        Toughness: "$$face.toughness",
                                        Image: "$$face.image_uris.normal"
                                    }
                                ]
                            }
                        }
                    },
                    ManaCost: "$mana_cost",
                    Power: "$power",
                    Toughness: "$toughness",
                }
            }
        ]);

        if (!cards) {
            return res.status(404).json({ exists: false, message: 'Error loading cards' });
        }
        res.json({ exists: true, cards });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
