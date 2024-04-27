const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const imageUpload = require("../utils/imageUpload");

const AdController = require("../controllers/ads.controller");

router.get("/ads", AdController.getAll);
router.get("/ads/:id", AdController.getById);
router.post(
  "/ads",
  authMiddleware,
  imageUpload.single("adPhoto"),
  AdController.addOne
);
router.put(
  "/ads/:id",
  authMiddleware,
  imageUpload.single("adPhoto"),
  AdController.updateOne
);
router.delete("/ads/:id", authMiddleware, AdController.deleteOne);
router.get("/ads/search/:searchPhrase", AdController.searchPhrase);

module.exports = router;
