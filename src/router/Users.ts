import express from "express";
const router = express.Router();
const { register, login, getById, update } = require("../controller/users");
const { authenticate } = require("../middlewares/authenticate");

// register
router.post("/register", register);
// login
router.post("/login", login);
// Get Detail User
router.get("/", authenticate, getById);
//Update User
router.put("/", authenticate, update);

module.exports = router;
