const express = require("express");
const routers = express.Router();
const { userSignUp, userLogin } = require("../controllers/user");

routers.post("/signup", userSignUp)
routers.post("/login", userLogin)

module.exports = routers;