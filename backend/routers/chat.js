const express = require("express");
const router = express.Router();
const { chatHistory } = require("../controllers/chat");
const { authenticate } = require("../middlewares/auth");

//Socket.IO connection
// router.post('/user-connection', handleUserConnection);

// Socket.IO event handling
// router.post('/private-message', handlePrivateMessage);

// Fetch chat history between users (protected route)
router.get('/history/:sender/:receiver', authenticate, chatHistory);



module.exports = router;
