const cron = require('node-cron');
const { fetchUserData } = require('../services/userService');
const User = require('../models/User');

const userSyncData = async () => {
  try {
    const users = await fetchUserData();

    for (const user of users) {
      await User.findOneAndUpdate(
        { user_id: user.user_id },
        user,
        { upsert: true, new: true }
      );
    }
    console.log('User data fetched and database updated successfully.');
  } catch (error) {
    console.error('Error during user data synchronization:', error);
  }
};

const scheduleUserSyncData = () => {
  // Schedule the job to run once a day at midnight
  //cron.schedule('0 0 * * *', userSyncData);
  //userSyncData();
  console.log("User sync disabled for now");
};

module.exports = scheduleUserSyncData;