const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabase');

// Create a new disaster
router.post('/', async (req, res) => {
  const { title, location_name, description, tags, owner_id } = req.body;
  const { data, error } = await supabase.from('disasters').insert([
    { title, location_name, description, tags, owner_id }
  ]);
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// Get all disasters
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('disasters').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

module.exports = router;
