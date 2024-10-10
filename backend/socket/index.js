
const Message = require("../models/message");
const socketIo = require('socket.io');

let io;

const initSocket = async (server) => {
  io = socketIo(server, {
    cors: {
        origin: 'http://localhost:4300',
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
        //console.log("DDDDDDDDDDDDDDD", data);
        const { sender, receiver, message } = data;
    
        // Store the message in MongoDB
        const newMessage = new Message({ sender, receiver, message });
        await newMessage.save();
    
        // Emit message to the sender and receiver
        socket.to(receiver).emit('chat message', { sender, message });
        socket.emit('chat message', { sender, message });
        });
    
        // Handle user disconnect
        socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
        });
    });
   
} catch (err) {
   
}


};









const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = { initSocket, getIo };
