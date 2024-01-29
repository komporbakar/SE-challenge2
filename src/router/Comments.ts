import express from "express";
const router = express.Router();
const { createComment, deleteComment } = require("../controller/comments");
const { authenticate } = require("../middlewares/authenticate");

// Create Post
router.post("/", authenticate, createComment);
// Delete Comment
router.delete("/:id", authenticate, deleteComment);

module.exports = router;
