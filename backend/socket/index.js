const Message = require("../models/message");
const socketIo = require('socket.io');

let io;

const initSocket = async (server) => {
  io = socketIo(server, {
    cors: {
      origin: 'http://localhost:4300', // Adjust according to your frontend URL
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  try {
    // Socket.IO
    io.on('connection', (socket) => {
      console.log('User connected: ' + socket.id);
    
      // Listen for new chat messages
      socket.on('private message', async (data) => {
        const { sender, receiver, message } = data;

        // Store the message in MongoDB
        const newMessage = new Message({ sender, receiver, message });
        await newMessage.save();

        // Emit message to the sender and receiver
        socket.to(receiver).emit('private message', { sender, message }); // Send to receiver
        socket.emit('private message', { sender, message }); // Send to sender
      });
    
      // Handle user disconnect
      socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
      });
    });
  } catch (err) {
    console.error(err);
  }
};

const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = { initSocket, getIo };
