import express from "express";
const router = express.Router();
const { register, login, getById } = require("../controller/users");
const { authenticate } = require("../middlewares/authenticate");

// register
router.post("/register", register);
// login
router.post("/login", login);
// Get Detail User
router.get("/", authenticate, getById);

module.exports = router;
