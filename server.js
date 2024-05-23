require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connectToDB, dbUri } = require("./db");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// start express server
const app = express();

// connect to DB
connectToDB(dbUri);

// add middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({
      mongoUrl: dbUri,
      autoRemove: "native", // Default
    }),
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
