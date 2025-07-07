const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabase');

router.get('/:id/resources', async (req, res) => {
  const { lat, lon } = req.query;

  const { data, error } = await supabase.rpc('find_nearby_resources', {
    lat: parseFloat(lat),
    lng: parseFloat(lon),
    radius: 10000
  });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
