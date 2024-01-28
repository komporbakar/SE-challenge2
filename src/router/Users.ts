import express from "express";
const router = express.Router();
const { register } = require("../controller/users");

// register
router.post("/register", register);
module.exports = router;
