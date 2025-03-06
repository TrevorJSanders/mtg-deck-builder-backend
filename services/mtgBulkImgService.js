const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Function to download the file
const downloadBulkImgFile = async () => {
  const url = 'https://data.scryfall.io/unique-artwork/unique-artwork-20241122100341.json';
  const filePath = path.resolve(__dirname, '../downloads', 'unique-artwork.json');

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

module.exports = { downloadBulkImgFile };