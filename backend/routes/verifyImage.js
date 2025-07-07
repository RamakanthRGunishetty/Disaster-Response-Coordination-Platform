const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/:id/verify-image', async (req, res) => {
  const { image_url } = req.body;

  const payload = {
    contents: [{
      parts: [{
        text: `Analyze image at ${image_url} for signs of manipulation or disaster context.`
      }]
    }]
  };

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${process.env.GEMINI_API_KEY}`,
      payload
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
