const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const disasterRoutes = require('./routes/disasters');
const geocodeRoutes = require('./routes/geocode');
const socialRoutes = require('./routes/socialMedia');
const resourceRoutes = require('./routes/resources');
const updateRoutes = require('./routes/updates');
const verifyRoutes = require('./routes/verifyImage');

app.use('/disasters', disasterRoutes);
app.use('/geocode', geocodeRoutes);
app.use('/social', socialRoutes);
app.use('/resources', resourceRoutes);
app.use('/updates', updateRoutes);
app.use('/verify', verifyRoutes);

// WebSocket
const http = require('http');
const server = http.createServer(app);
require('./websocket')(server);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
