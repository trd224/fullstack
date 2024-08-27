// const User = require("../models/user");
const {setUser} = require("../services/auth");
const { query_findExistingUser, query_createUser, query_loginUser, query_getAllUsers, query_getUserById } = require('../queries/userQueries');

async function userSignUp(req, res){
    try{

        const user = await query_findExistingUser(req.body);

        if(user) return res.status(409).json({message: "User alread exist"});

        await query_createUser(req.body)
        
        return res.status(201).json({message: "User created"});
    }
    catch(err){
        return res.status(500).json({ error: err });
    }
}

async function userLogin(req, res){
    try{
        const {email, password} = req.body;
       
        const user = await query_loginUser(req.body);

        if(!user) return res.status(404).json({message: "User not found"})

        const token = setUser(user);

        return res.status(200).json({email: email, token: token});
    }
    catch(err){
        return res.status(500).json({ error: err });
    }

}


async function getAllUsers(req, res){
   try{
        const users = await query_getAllUsers(req);

        return res.status(200).json(users);
   }
   catch(err){
        return res.status(500).json({ error: err });
   }
}

async function getUserById(req, res){
    const id = req.params.id;
   
    try{
        if(id === req.currentUserId){
            const user = await query_getUserById(id)
            return res.status(200).json(user);
        }
        return res.status(404).json({message: "Not found"});
        
    }
    catch(err){
        return res.status(500).json({ error: err });
    }
}

module.exports = {userSignUp, userLogin, getAllUsers, getUserById}