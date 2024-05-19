const User = require("../models/user.model");

exports.getLoggedUser = async (req, res) => {
  res.json(req.session.user);
};
