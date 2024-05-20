const express = require("express");
const cors = require("cors");
const path = require("path");
const connectToDB = require("./db");

const adsRoutes = require("./routes/ads.routes");

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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/client/build")));

// add photo routes
app.use("/api", require("./routes/ads.routes"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.use((req, res) => {
  res.status(404).send({ message: "Not found..." });
});
