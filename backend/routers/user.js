const express = require("express");
const router = express.Router();
const { userSignUp, userLogin, getAllUsers, getUserById, chat } = require("../controllers/user");
const { authenticate } = require("../middlewares/auth");

router.post("/signup", userSignUp)
router.post("/login", userLogin)


router.get("/all", authenticate, getAllUsers)
router.get("/:id", authenticate, getUserById)


// Fetch chat history between users (protected route)
router.get('/api/history/:sender/:receiver', authenticate, chat);



module.exports = router;
