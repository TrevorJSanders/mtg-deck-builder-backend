const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    player_id: String,
    depth_chart_position: String,
    status: String,
    number: Number,
    injury_start_date: Date,
    position: String,
    practice_participation: String,
    team: String,
    last_name: String,
    injury_status: String,
    age: Number,
    first_name: String,
    depth_chart_order: Number,
})

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;