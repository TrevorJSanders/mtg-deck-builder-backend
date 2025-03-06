const axios = require('axios');
const { LEAGUE_ID } = require('../config/constants');

const fetchUserData = async () => {
  try {
    const response = await axios.get("https://api.sleeper.app/v1/league/"+LEAGUE_ID+"/users");
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

module.exports = { fetchUserData };