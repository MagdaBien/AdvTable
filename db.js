const mongoose = require("mongoose");

const connectToDB = () => {
  const NODE_ENV = process.env["NODE_ENV"];
  const DB_PASS = process.env["DB_PASS"];
  let dbUri = "";

  if (NODE_ENV === "production") {
    dbUri = `mongodb+srv://magbie1978:${DB_PASS}@cluster0.ut7tgmr.mongodb.net/adsDB?retryWrites=true&w=majority&appName=Cluster0`;
  } else {
    dbUri = "mongodb://localhost:27017/adsDB";
  }

  console.log("dbUri: ", dbUri, NODE_ENV);
  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;

  // on success
  db.once("open", () => {
    console.log("Connected to the database");
  });

  // on error
  db.on("error", (err) => console.log("Error " + err));
};

module.exports = connectToDB;
