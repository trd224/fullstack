const express = require("express");
const http = require('http');
const connectTOMongoDB = require("./connection/dbConnection");
const {initSocket} = require("./socket");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

const PORT = 4001;

connectTOMongoDB("mongodb://127.0.0.1:27017/fullstackTest")
.then(() => console.log("connected to mongodb"))
.catch((err) => console.log(err));

app.use(cors({
    origin: 'http://localhost:4300', // Allow requests from this origin
    methods: ['GET', 'POST'], // Specify the allowed methods
    credentials: true // Allow credentials (if needed)
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

initSocket(server);




app.use("/user", require("./routers/user"));
app.use("/chat", require("./routers/chat"));

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));
server.listen(PORT, () => console.log(`server running on port ${PORT}`));

