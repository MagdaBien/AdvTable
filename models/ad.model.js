const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  adContent: { type: String, required: true },
  published: { type: Date, required: true },
  adPhoto: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  user: { type: String, required: true, ref: "User" },
});

module.exports = mongoose.model("Ad", adSchema);
