const express = require("express");
const http = require('http');
const { Server } = require('socket.io');
const Message = require("./models/message");

const connectTOMongoDB = require("./DBConnection");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST']
  }
});
const PORT = 4001;

connectTOMongoDB("mongodb://127.0.0.1:27017/fullstackTest")
.then(() => console.log("connected to mongodb"))
.catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());






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


app.use("/user", require("./routers/user"));

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));
server.listen(PORT, () => console.log(`server running on port ${PORT}`));

