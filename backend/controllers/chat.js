const Message = require("../models/message");

async function chatHistory(req, res){
    const { sender, receiver } = req.params;
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    }).sort('timestamp');
    res.json(messages);
}

module.exports = { chatHistory}