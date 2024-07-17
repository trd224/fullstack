const User = require("../models/user");
const {setUser} = require("../services/auth");

async function userSignUp(req, res){
    //console.log(req.body);
    const {mobile, email, password} = req.body;
    // const user = await User.findOne({mobile: mobile, email: email});
    const user = await User.findOne({$or: [{mobile},{email}]});
    if(user) return res.json({msg: "user alread exist"});
    await User.create(req.body);
    return res.json({msg: "user created"});
}

async function userLogin(req, res){
    console.log(req.body);
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user) return res.json({msg: "user not found"})
    const token = setUser(user);

    return res.json({email: email, token: token});

}

module.exports = {userSignUp, userLogin}