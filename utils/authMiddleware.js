const Session = require("../models/session.model");

const authMiddleware = async (req, res, next) => {
  console.log(
    "hello from middleware: ",
    process.env.NODE_ENV,
    req.session.user
  );
  if (process.env.NODE_ENV !== "production") {
    try {
      // find last session record in db
      const sessionRecord = await Session.findOne({});

      // if session is not found
      // return 401 status and message
      if (!sessionRecord)
        return res
          .status(401)
          .send({ message: "You are not authorized session" });

      // if session is found, parse it and set user in req.session
      const sessionData = JSON.parse(sessionRecord.session);
      req.session.user = {
        id: sessionData.user.id,
        login: sessionData.user.login,
        avatar: sessionData.user.avatar,
      };

      next();
    } catch (err) {
      return res.status(401).send({ message: "You are not authorized local" });
    }
  } else {
    if (req.session.user) {
      next();
    } else {
      res.status(401).send({
        message: "You are not authorized by middleware" + req.session.user,
      });
    }
  }
};

module.exports = authMiddleware;
