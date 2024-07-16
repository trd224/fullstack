const User = require("../models/user");
async function userSignUp(req, res){
    //console.log(req.body);
    const {mobile, email, password} = req.body;
    const user = User.findOne({mobile: mobile, email: email});
    if(user) return res.json({msg: "user alread exist"});
    await User.create(req.body);
    return res.json({msg: "user created"});
}

module.exports = {userSignUp}