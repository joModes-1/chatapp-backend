const db = require('./config/db');
const express = require('express');
const fs = require('fs');                          //fs for read, write, create, delete files
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const path = require('path');                       //Join or parse file paths

const app = express();
const PORT = 3000;
const http = require('http');
const { Server } = require('socket.io');

const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send("Here render first file like login");
});

app.use('/', userRoutes);
app.use('/chat', chatRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Track connected users: userId => socketId
const users = {};

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // Store the mapping between userId and socketId
  socket.on('register', (userId) => {
    users[userId] = socket.id;
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  socket.on('typing', (data) => {
    const { senderId, receiverId } = data;
    const receiverSocket = users[receiverId];
    if (receiverSocket) {
      io.to(receiverSocket).emit('typing', { senderId, receiverId });
    }
  });

  socket.on('stopTyping', (data) => {
    const { senderId, receiverId } = data;
    const receiverSocket = users[receiverId];
    if (receiverSocket) {
      io.to(receiverSocket).emit('stopTyping', { senderId, receiverId });
    }
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
    // Remove from users object
    for (const [userId, socketId] of Object.entries(users)) {
      if (socketId === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
