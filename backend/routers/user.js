const express = require("express");
const routers = express.Router();
const { userSignUp, userLogin, getAllUsers, getUserById } = require("../controllers/user");
const { authenticate } = require("../middlewares/auth");

routers.post("/signup", userSignUp)
routers.post("/login", userLogin)


routers.get("/all", authenticate, getAllUsers)
routers.get("/:id", authenticate, getUserById)

module.exports = routers;