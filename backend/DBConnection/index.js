const mongoose = require("mongoose");
async function connectTOMongoDB(url){
    // return await mongoose.connect("mongodb://127.0.0.1:27017/fullstackTest");
    return await mongoose.connect(url);
}

module.exports = connectTOMongoDB;