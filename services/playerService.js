const axios = require('axios');

const fetchPlayerData = async () => {
  try {
    const response = await axios.get("https://api.sleeper.app/v1/players/nfl");
    const players = response.data;
    
    // Filter fields based on the Player model
    const filteredPlayers = Object.values(players).map(player => ({
      player_id: player.player_id,
      depth_chart_position: player.depth_chart_position,
      status: player.status,
      number: player.number,
      injury_start_date: player.injury_start_date,
      position: player.position,
      practice_participation: player.practice_participation,
      team: player.team,
      last_name: player.last_name,
      injury_status: player.injury_status,
      age: player.age,
      first_name: player.first_name,
      depth_chart_order: player.depth_chart_order
    }));

    return filteredPlayers;

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

module.exports = { fetchPlayerData };