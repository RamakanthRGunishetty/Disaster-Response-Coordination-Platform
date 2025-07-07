const socketIO = require('socket.io');

module.exports = function(server) {
  const io = socketIO(server, {
    cors: {
      origin: '*'
    }
  });

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.emit('disaster_updated', { message: 'Welcome to disaster updates' });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });
};
