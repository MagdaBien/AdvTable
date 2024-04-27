const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");

const UserController = require("../controllers/users.controller");

router.get("/user", authMiddleware, UserController.getLoggedUser);

module.exports = router;
