const cron = require('node-cron');
const { fetchPlayerData } = require('../services/playerService');
const Player = require('../models/Player');

const playerSyncData = async () => {
  try {
    const players = await fetchPlayerData();

    for (const player of players) {
      await Player.findOneAndUpdate(
        { player_id: player.player_id },
        player,
        { upsert: true, new: true }
      );
    }
    console.log('Player data fetched and database updated successfully.');
  } catch (error) {
    console.error('Error during player data synchronization:', error);
  }
};

const schedulePlayerSyncData = () => {
  // Schedule the job to run once a day at midnight
  //cron.schedule('0 0 * * *', playerSyncData);
  //playerSyncData();
  console.log("Player sync disabled for now");
};

module.exports = schedulePlayerSyncData;