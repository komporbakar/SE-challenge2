import express from "express";
const router = express.Router();
const { follow, unfollow, getFollows } = require("../controller/follows");
const { authenticate } = require("../middlewares/authenticate");

// Follow User
router.post("/follow", authenticate, follow);
// Unfollow User
router.post("/unfollow", authenticate, unfollow);
// Get Followers
router.get("/follows", authenticate, getFollows);

module.exports = router;
