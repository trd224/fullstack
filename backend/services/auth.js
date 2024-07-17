const jwt = require("jsonwebtoken");
const SECRET = "kfkjdfdsfkkfgkdfjkgdfmgdfkgkdfgf";

function setUser(user){
    const payload = {
        _id: user._id,
        email: user.email
    }

    return jwt.sign(payload, SECRET);
}

module.exports = {setUser}