const express = require("express");
const config = require("./config");
const healthRouter = require("./routes/health");

const app = express();

app.use(express.json());
app.use("/health", healthRouter);

app.get("/", (req, res) => {
  res.json({ message: "Express app up and running" });
});

app.listen(config.PORT, config.HOST, () => {
  console.log(`Server running at http://${config.HOST}:${config.PORT}`);
});
