import express from "express";
const router = express.Router();
const { create } = require("../controller/posts");
const { authenticate } = require("../middlewares/authenticate");

// Create Post
router.post("/", authenticate, create);

module.exports = router;
