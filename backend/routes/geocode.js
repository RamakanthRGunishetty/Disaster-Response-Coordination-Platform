const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const { description } = req.body;

  // Gemini prompt example
  const prompt = {
    contents: [{ parts: [{ text: `Extract location from: ${description}` }] }]
  };

  try {
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      prompt
    );

    const locationName = geminiRes.data.candidates[0].content.parts[0].text;

    const geoRes = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${process.env.GOOGLE_MAPS_KEY}`
    );

    const coords = geoRes.data.results[0].geometry.location;
    res.json({ locationName, lat: coords.lat, lng: coords.lng });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
