const Message = require("../models/message");
const socketIo = require('socket.io');

let io;
const connectedUsers = new Map(); // Map to track socket.id to user.email

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

      // Listen for user details to associate socket with the email
      socket.on('register', (email) => {
        connectedUsers.set(email, socket.id);
        console.log(`${email} is connected with socket id ${socket.id}`);
      });
    
      // Listen for new chat messages
      socket.on('private message', async (data) => {
        const { sender, receiver, message } = data;

        // Store the message in MongoDB
        const newMessage = new Message({ sender, receiver, message });
        await newMessage.save();

        const receiverSocketId = connectedUsers.get(receiver);

        
        // Emit message to the sender and receiver if the receiver is connected
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('private message', { sender, message }); // Send to receiver
        }
        socket.emit('private message', { sender, message }); // Send to sender
      });
    
      // Handle user disconnect
      socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
        // Remove the user from the connected users map
        connectedUsers.forEach((value, key) => {
          if (value === socket.id) {
            connectedUsers.delete(key);
            console.log(`User ${key} disconnected and removed from the map`);
          }
        });
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
