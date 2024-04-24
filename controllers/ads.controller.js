const Ad = require("../models/ad.model");
const getImageFileType = require("../utils/getImageFileType");

const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find().populate("user"));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) res.status(404).json({ message: "Not found" });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  const { title, adContent, published, price, location, user } = req.body;
  const fileType = req.file ? await getImageFileType(req.file) : "unknown";
  try {
    if (
      title &&
      title.length <= 50 &&
      typeof title === "string" &&
      adContent &&
      adContent.length <= 1000 &&
      typeof adContent === "string" &&
      published &&
      price &&
      typeof price === "string" &&
      location &&
      typeof location === "string" &&
      user &&
      typeof user === "string" &&
      req.file &&
      ["image/png", "image/jpeg", "image/gif"].includes(fileType)
    ) {
      const newAd = new Ad({
        title,
        adContent,
        published,
        adPhoto: req.file.filename,
        price,
        location,
        user,
      });
      console.log("newAd ", newAd);
      await newAd.save();
      res.json({ message: "OK" });
    } else {
      if (req.file.path) {
        await unlinkAsync(req.file.path);
      }
      return res.status(409).json({ message: "data incorrect..." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateOne = async (req, res) => {
  const { title, adContent, price, location } = req.body;
  //console.log(title, adContent, price, location, req.file);

  try {
    const newAd = await Ad.findOne({ _id: req.params.id });
    if (newAd) {
      if (
        title &&
        title.length <= 50 &&
        typeof title === "string" &&
        adContent &&
        adContent.length <= 1000 &&
        typeof adContent === "string" &&
        price &&
        typeof price === "string" &&
        location &&
        typeof location === "string"
      ) {
        newAd.title = title;
        newAd.adContent = adContent;
        newAd.price = price;
        newAd.location = location;
        if (req.file) {
          const fileType = await getImageFileType(req.file);
          if (["image/png", "image/jpeg", "image/gif"].includes(fileType)) {
            const filePath = req.file.path.split(req.file.filename);
            const oldFile = filePath[0] + newAd.adPhoto;
            await unlinkAsync(oldFile);
            newAd.adPhoto = req.file.filename;
          }
        }
        await newAd.save();
        res.json(newAd);
      } else {
        return res.status(409).json({ message: "data incorrect..." });
      }
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const ad = await Ad.findOneAndDelete({ _id: req.params.id });
    if (ad) {
      res.json(ad);
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.searchPhrase = async (req, res) => {
  try {
    const searchPhrase = req.params.searchPhrase;
    const foundAds = await Ad.find({
      $or: [
        {
          title: new RegExp(searchPhrase, "i"),
        },
        {
          adContent: new RegExp(searchPhrase, "i"),
        },
      ],
    }).populate("user");
    if (foundAds.length > 0) {
      res.json(foundAds);
    } else res.json({ message: "Phrase not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
