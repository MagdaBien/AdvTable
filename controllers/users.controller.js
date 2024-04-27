const User = require("../models/user.model");

exports.getLoggedUser = async (req, res) => {
  try {
    res.send(req.session.user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
