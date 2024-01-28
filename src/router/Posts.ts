import express from "express";
const router = express.Router();
const {
  create,
  updatePost,
  deletePost,
  postGetById,
} = require("../controller/posts");
const { authenticate } = require("../middlewares/authenticate");

// Create Post
router.post("/", authenticate, create);
// Update Post
router.put("/:id", authenticate, updatePost);
// Delete Post
router.delete("/:id", authenticate, deletePost);
// Get Detail Post
router.get("/:id", postGetById);

module.exports = router;
