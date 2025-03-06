const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Function to download the file
const downloadBulkOracleFile = async () => {
  const url = 'https://data.scryfall.io/oracle-cards/oracle-cards-20241122100212.json';
  const filePath = path.resolve(__dirname, '../downloads', 'oracle-cards.json');

  try {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    writer.on('finish', () => {
      console.log('File downloaded and saved successfully!');
    });

    writer.on('error', (err) => {
      console.error('Error writing the file:', err);
    });
  } catch (error) {
    console.error('Error downloading the file:', error);
  }
};

module.exports = { downloadBulkOracleFile };