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

// connect to DB
connectToDB();
const corsOptions = {
  credentials: true,
  origin:
    "https://f1289947-7722-49d7-937f-4ea697bda01d-00-1fttp15mfftfw.riker.replit.dev:8000",
};

// add middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
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

// add  routes
const adsRoutes = require("./routes/ads.routes");
const usersRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
app.use("/api", adsRoutes);
app.use("/api", usersRoutes);
app.use("/api/auth", authRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running in mode..." + process.env.NODE_ENV);
});

app.use((req, res) => {
  res.status(404).send({ message: "Not found..." });
});
