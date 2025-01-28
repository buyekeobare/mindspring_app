const { Server } = require("socket.io");

const createWebSocket = (server) => {
  const allowedOrigins = [
    process.env.FRONTEND_URL, // Production frontend
    "http://localhost:3000", // Local frontend for development
  ];

  const io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true); // Allow the origin
        } else {
          callback(new Error("CORS policy: This origin is not allowed"));
        }
      },
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", ({ userId, text }) => {
      console.log(`User ${userId} sent a message: ${text}`);

      const fullMessage = {
        userId,
        text,
      };

      io.emit("receiveMessage", fullMessage);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = createWebSocket;
