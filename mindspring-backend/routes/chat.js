const { Server } = require('socket.io');

const createWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    console.log("user connected", socket.id);

    socket.on('sendMessage', ({userId, text}) => {
      console.log(`User ${userId} sent a message: ${text}`);

      const fullMessage = {
        userId,
        text,
      };

      io.emit('receiveMessage', fullMessage);
    });

    socket.on('disconnect', () => {
      console.log("user disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = createWebSocket;