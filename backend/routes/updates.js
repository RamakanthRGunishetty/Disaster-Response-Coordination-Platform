const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');

router.get('/:id/official-updates', async (req, res) => {
  try {
    const response = await axios.get('https://www.fema.gov/news-releases');
    const $ = cheerio.load(response.data);
    const updates = [];

    $('h2.news-title').each((_, el) => {
      updates.push($(el).text().trim());
    });

    res.json(updates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
