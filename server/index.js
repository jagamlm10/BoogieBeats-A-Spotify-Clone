const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const songRoutes = require("./routes/songRoutes");
const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("App is running.");
});

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening at port : ${process.env.PORT}`);
});
