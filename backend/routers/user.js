const express = require("express");
const routers = express.Router();
const { userSignUp } = require("../controllers/user");

routers.post("/", userSignUp)

module.exports = routers;