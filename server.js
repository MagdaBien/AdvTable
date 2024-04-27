require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectToDB = require("./db");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

// start express server
const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running...");
});

// connect to DB
connectToDB();

// add middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.secret,
    cookie: {
      secure: process.env.NODE_ENV == "production",
    },
    store: MongoStore.create(mongoose.connection),
    resave: false,
    saveUninitialized: false,
  })
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/client/build")));

// add photo routes
const adsRoutes = require("./routes/ads.routes");
const usersRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
app.use("/api", adsRoutes);
app.use("/api", usersRoutes);
app.use("/auth", authRoutes);

app.get("*", (req, res) => {
  res.send("Server is running...");
});

app.use((req, res) => {
  res.status(404).send({ message: "Not found..." });
});
