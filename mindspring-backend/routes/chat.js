const { Server } = require('socket.io');

const createWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on('connection', (socket) => {
    console.log("user connected", socket.id);

    socket.on('sendMessage', (message) => {
      console.log("Message received:", message);
      io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log("user disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = createWebSocket;