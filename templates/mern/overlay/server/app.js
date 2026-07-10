const express = require("express");
const cors = require("cors");
const config = require("./config");
require("./db");
const healthRouter = require("./routes/health");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/health", healthRouter);

app.get("/", (req, res) => {
  res.json({ message: "MERN server up and running" });
});

app.listen(config.PORT, config.HOST, () => {
  console.log(`Server running at http://${config.HOST}:${config.PORT}`);
});
