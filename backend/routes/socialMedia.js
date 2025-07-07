const express = require('express');
const router = express.Router();

router.get('/:id/social-media', (req, res) => {
  const mockData = [
    { post: "#floodrelief Need food in NYC", user: "citizen1" },
    { post: "#earthquake Stuck in building", user: "user2" }
  ];
  res.json(mockData);
});

module.exports = router;
