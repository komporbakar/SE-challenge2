import express from "express";
const router = express.Router();
const { create, updatePost } = require("../controller/posts");
const { authenticate } = require("../middlewares/authenticate");

// Create Post
router.post("/", authenticate, create);
// Update Post
router.put("/:id", authenticate, updatePost);

module.exports = router;
