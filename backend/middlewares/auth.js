const { getUser } = require("../services/auth");

function authenticate(req, res, next){
    req.user = null;
    const authorizationHeaderValue = req.headers['authorization'];
    //console.log(authorizationHeaderValue);
    //console.log(authorizationHeaderValue.startsWith("Bearer"));

    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")){
        return res.status(401).json({"msg": "unauthorized"});
    }

    const token = authorizationHeaderValue.split(" ")[1];
    if(!token) return res.status(401).json({"msg": "unauthorized"});

    //console.log(token);

    const user = getUser(token);
    if(!user) return res.status(401).json({"msg": "unauthorized"});

    //req.user = user;
    req.currentUserId = user._id;
    console.log(req.currentUserId)
    //console.log(req.user);

    next();
}

module.exports = {authenticate};