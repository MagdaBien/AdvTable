const Ad = require("../models/ad.model");
const getImageFileType = require("../utils/getImageFileType");
const uploadFolderPath = require("../utils/uploadFolderPath");

const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

exports.getAll = async (req, res) => {
  try {
    const ads = await Ad.find().populate("user");
    if (!ads) res.status(404).json({ message: "Not found" });
    else res.status(200).json(ads);
    //console.log("hello from getAll: ", res.json);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate("user");
    if (!ad) res.status(404).json({ message: "Not found" });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  const { title, adContent, published, price, location, user } = req.body;
  const fileType = req.file ? await getImageFileType(req.file) : "unknown";
  console.log(
    "dane do dodania: ",
    title,
    adContent,
    published,
    price,
    location,
    user
  );
  try {
    if (
      req.session.user &&
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
      //console.log("newAd ", newAd);
      await newAd.save();
      res.status(200).json(newAd);
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
    const adToUpdate = await Ad.findOne({ _id: req.params.id });
    if (req.session.user.id !== adToUpdate.user) {
      return res.status(404).json({ message: "Not your ad..." });
    }
    if (adToUpdate) {
      if (
        title &&
        title.length <= 50 &&
        typeof title === "string" &&
        adContent &&
        adContent.length <= 1000 &&
        typeof adContent === "string" &&
        price &&
        location &&
        typeof location === "string"
      ) {
        adToUpdate.title = title;
        adToUpdate.adContent = adContent;
        adToUpdate.price = price;
        adToUpdate.location = location;
        if (req.file) {
          const fileType = await getImageFileType(req.file);
          if (["image/png", "image/jpeg", "image/gif"].includes(fileType)) {
            const oldPhotoToDelete =
              uploadFolderPath + "/" + adToUpdate.adPhoto;
            //console.log("oldFile ", oldPhotoToDelete);
            await unlinkAsync(oldPhotoToDelete);
            adToUpdate.adPhoto = req.file.filename;
          }
        }
        await adToUpdate.save();
        res.json(adToUpdate);
      } else {
        return res.status(409).json({ message: "data incorrect..." });
      }
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  //console.log("kasuje ad o id: ", req.params.id, req.session.user);
  try {
    const adToDelete = await Ad.findOneAndDelete({ _id: req.params.id });
    if (req.session.user.id !== adToDelete.user) {
      return res.status(404).json({ message: "Not your ad..." });
    }
    if (adToDelete) {
      const photoToDelete = (await uploadFolderPath) + "/" + adToDelete.adPhoto;
      await unlinkAsync(photoToDelete);
      res.status(200).json(adToDelete);
    } else res.status(404).json({ message: "Not found add to delete..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.searchPhrase = async (req, res) => {
  try {
    const searchPhrase = req.params.searchPhrase;
    //console.log("searchPhrase: ", searchPhrase);
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
      res.status(200).json(foundAds);
    } else res.json({ message: "Phrase not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
