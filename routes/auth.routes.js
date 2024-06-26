const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const imageUpload = require("../utils/imageUpload");

const AuthController = require("../controllers/auth.controller");
const UserController = require("../controllers/users.controller");

router.post(
  "/register",
  imageUpload.single("avatar"),
  AuthController.registerUser
);
router.post("/login", AuthController.loginUser);
router.get("/user", authMiddleware, UserController.getLoggedUser);
router.delete("/logout", authMiddleware, AuthController.logOutUser);

module.exports = router;
