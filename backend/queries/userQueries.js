const User = require("../models/user");

const query_findExistingUser = async (body) => {
    const {mobile, email, password} = body;
    return await User.findOne({$or: [{mobile},{email}]});
};

const query_createUser = async (body) => {
    return await User.create(body);
}

const query_loginUser = async (body) => {
    const {email, password} = body;
    return await User.findOne({email, password});
}

const query_getAllUsers = async (req) => {
    return await User.find({_id: req.currentUserId});
}

const query_getUserById = async (id) => {
    return await User.findOne({_id: id});
}

module.exports = {
    query_findExistingUser, 
    query_createUser,
    query_loginUser,
    query_getAllUsers,
    query_getUserById
}