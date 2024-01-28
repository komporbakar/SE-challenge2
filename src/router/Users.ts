import express from "express";
const router = express.Router();
const { register, login, getById } = require("../controller/users");

// register
router.post("/register", register);
// login
router.post("/login", login);
// Get Detail User
router.get("/", getById);

module.exports = router;
