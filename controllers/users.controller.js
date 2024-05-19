const User = require("../models/user.model");

exports.getLoggedUser = async (req, res) => {
  try {
    //console.log("session w controlerze: ", req.session.user);
    res.json(req.session.user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
