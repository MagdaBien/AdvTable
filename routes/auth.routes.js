const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const imageUpload = require("../utils/imageUpload");

const AuthController = require("../controllers/auth.controller");

router.post(
  "/register",
  imageUpload.single("avatar"),
  AuthController.registerUser
);
router.post("/login", AuthController.loginUser);
router.get("/user", authMiddleware, AuthController.getUser);
router.delete("/user", authMiddleware, AuthController.removeUser);

module.exports = router;
