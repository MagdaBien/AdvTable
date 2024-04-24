const User = require("../models/user.model");

exports.getLoggedUser = async (req, res) => {
  try {
    // logged
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
