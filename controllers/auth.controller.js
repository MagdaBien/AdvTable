const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const getImageFileType = require("../utils/getImageFileType");
const Session = require("../models/Session.model");

const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

exports.registerUser = async (req, res) => {
  const { login, password, tel } = req.body;
  const fileType = req.file ? await getImageFileType(req.file) : "unknown";

  try {
    if (
      login &&
      typeof login === "string" &&
      password &&
      typeof password === "string" &&
      req.file &&
      ["image/png", "image/jpeg", "image/gif"].includes(fileType)
    ) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        if (req.file.path) {
          await unlinkAsync(req.file.path);
        }
        return res.status(409).json({ message: "Login is already in use..." });
      }

      const newUser = new User({
        login,
        password: await bcrypt.hash(password, 10),
        avatar: req.file.filename,
        tel,
      });
      await newUser.save();
      res.json({ message: "User created: " + newUser.login });
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

exports.loginUser = async (req, res) => {
  const { login, password } = req.body;
  console.log("user: ", login, password);
  try {
    if (
      login &&
      typeof login === "string" &&
      password &&
      typeof password === "string"
    ) {
      const user = await User.findOne({ login });
      console.log("user: ", user);
      if (!user) {
        return res
          .status(400)
          .json({ message: "Login or password incorrect..." });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = {
            login: user.login,
            id: user.id,
            avatar: user.avatar,
          };
          return res.status(409).json(req.session.user);
        } else {
          return res
            .status(400)
            .json({ message: "Login or password incorrect..." });
        }
      }
    } else {
      return res
        .status(400)
        .json({ message: "Login or password incorrect..." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.logOutUser = async (req, res) => {
  if (process.env.NODE_ENV !== "production") await Session.deleteMany({});
  req.session.destroy(function (err) {
    if (err) {
      console.log("error: ", err);
      return next(err);
    }
    res.json({ message: "User logout..." });
  });
};
