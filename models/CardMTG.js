const mongoose = require('mongoose');

const CardMTGSchema = new mongoose.Schema({
    id: String,
    name: String,
    lang: String,
    released_at: String,
    card_faces: [ {
        image_uris: {
            normal: String,
        },
        mana_cost: String,
    },],
    image_uris: {
        normal: String,
    },
    mana_cost: String,
    cmc: Number,
    type_line: String,
    oracle_text: String,
    color_identity: Array,
    keywords: Array,
    set: String,
    set_name: String,
    rulings_uri: String,
    rarity: String,
    border_color: String,
    full_art: Boolean,

}, {collection: 'CardImages'});

const CardMTG = mongoose.model('CardMTG', CardMTGSchema);

module.exports = CardMTG;