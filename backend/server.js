const express = require("express");
const cors = require("cors");
const queueRoutes = require("./routes/queue");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/", queueRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.use((err, req, res, next) => {
  console.error("[Error]", err.message);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Smart Queue Optimizer running on http://localhost:${PORT}`);
});