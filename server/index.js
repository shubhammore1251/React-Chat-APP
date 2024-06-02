const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const errorMiddleware = require("./middleware/error");
const logger = require("morgan");
const cors = require("cors");
const { rateLimit } = require('express-rate-limit');
const { addUser, removeUser, getUser, getUsersInRoom } = require("./user");

require("dotenv").config({ path: "./.env" });


const PORT = process.env.PORT;

const router = require("./router");

const app = express();

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

// Enable trust proxy
app.set('trust proxy', 1);
// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 1000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    message: "Too many requests from this IP, please try again after a minute",
    status: 429
  }
});

app.use(limiter);
app.use(logger("dev"));
app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", {
        user: "admin",
        text: `${user.name} has joined the chat!`,
      });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left!`,
      });

      // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  });
});

//Handling Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server due to uncaught Exception");
  process.exit(1);
});


server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down the server due to unhadled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});

app.use(errorMiddleware);
