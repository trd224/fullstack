const User = require("../models/user");
const {setUser} = require("../services/auth");

async function userSignUp(req, res){
    try{
        //console.log(req.body);
        const {mobile, email, password} = req.body;
        // const user = await User.findOne({mobile: mobile, email: email});
        const user = await User.findOne({$or: [{mobile},{email}]});
        if(user) return res.json({message: "user alread exist"});
        await User.create(req.body);
        return res.json({message: "user created"});
    }
    catch(err){
        throw err;
    }
}

async function userLogin(req, res){
    try{
        console.log(req.body);
        const {email, password} = req.body;
        const user = await User.findOne({email, password});
        if(!user) return res.json({message: "user not found"})
        const token = setUser(user);

        return res.json({email: email, token: token});
    }
    catch(err){
        throw err;
    }

}


async function verifyUserToken(req, res){
    try{
         return res.status(200).json(users);
    }
    catch(err){
         throw err;
    }
 }

async function getAllUsers(req, res){
   try{
        const users = await User.find({_id: req.currentUserId});
        return res.status(200).json(users);
   }
   catch(err){
        throw err;
   }
}

async function getUserById(req, res){
    const id = req.params.id;
   
    try{
        if(id === req.currentUserId){
            const user = await User.findOne({_id: id});
            return res.status(200).json(user);
        }
        return res.status(404).json({message: "not found"})
        
    }
    catch(err){
        throw err;
    }
}

module.exports = {userSignUp, userLogin, verifyUserToken, getAllUsers, getUserById}