const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabase');

// Create a report
router.post('/', async (req, res) => {
  const { disaster_id, user_id, content, image_url } = req.body;
  const { data, error } = await supabase.from('reports').insert([
    { disaster_id, user_id, content, image_url, verification_status: 'pending' }
  ]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// List reports by disaster
router.get('/:disaster_id', async (req, res) => {
  const { disaster_id } = req.params;
  const { data, error } = await supabase.from('reports').select('*').eq('disaster_id', disaster_id);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
