import express from "express";
const router = express.Router();
const { createPost } = require("../controller/comments");
const { authenticate } = require("../middlewares/authenticate");

// Create Post
router.post("/", authenticate, createPost);

module.exports = router;
