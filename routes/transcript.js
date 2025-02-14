const express = require('express');
const router = express.Router();
const axios = require("axios");


router.post('/', async (req, res) => {
    try {
        const { audioURL } = req.body;
        // Validate input
        if (!audioURL) {
            return res.status(400).json({ error: 'audioURL parameter is required.' });
        }

        // Transcribe the audio using the local file stream
        console.log(`Transcribing audio from URL: ${audioURL}`);
        const transcription = await transcribeAudio(audioURL);

        console.log(transcription)

        return res.status(200).json({ transcription });

    } catch (error) {
        console.error(`Error processing query:`, error);
        // Return error details to the client
        return res.status(500).json({
            error: 'An error occurred while processing your request.',
            details: error.message || error
        });
    }
});

async function transcribeAudio(url) {
    const deepgramAPIKey = process.env.DEEPGRAM_API;
    const endpoint = 'https://api.deepgram.com/v1/listen?model=nova-3&smart_format=true';
    const requestData = {
      url: url
    };
  
    try {
      const response = await axios.post(endpoint, requestData, {
        headers: {
          'Authorization': `Token ${deepgramAPIKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data.results.channels[0].alternatives[0].transcript;
      //console.log('Transcription result:', response.data.results.channels[0].alternatives[0].transcript);
    } catch (error) {
      console.error('Error transcribing audio:', error.response ? error.response.data : error.message);
    }
  }

module.exports = router;
