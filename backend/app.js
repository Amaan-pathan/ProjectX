const express = require("express");
const cors = require("cors");
const candidateRoutes = require("./routes/candidate.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/candidates", candidateRoutes);

app.get("/", (req, res) => {
  res.send("Candidate Referral API running");
});

module.exports = app;
