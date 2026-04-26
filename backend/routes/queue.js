const express = require("express");
const router = express.Router();
const { simulateQueue, generateSuggestion } = require("../services/queueSimulator");

router.get("/predict-queue", (req, res) => {
  const hour =
    req.query.hour !== undefined
      ? parseInt(req.query.hour)
      : new Date().getHours();

  if (isNaN(hour) || hour < 0 || hour > 23) {
    return res.status(400).json({
      error: "Invalid hour. Must be an integer between 0 and 23.",
    });
  }

  const result = simulateQueue(hour);
  return res.status(200).json(result);
});

router.post("/predict-queue/suggest", (req, res) => {
  const { waitTime, crowdLevel } = req.body;

  if (waitTime === undefined || waitTime === null) {
    return res.status(400).json({ error: "waitTime is required." });
  }

  if (typeof waitTime !== "number" || waitTime < 0) {
    return res.status(400).json({ error: "waitTime must be a non-negative number." });
  }

  if (!crowdLevel || typeof crowdLevel !== "string") {
    return res.status(400).json({ error: "crowdLevel is required and must be a string." });
  }

  const validLevels = ["low", "medium", "high", "peak"];
  if (!validLevels.includes(crowdLevel.toLowerCase())) {
    return res.status(400).json({
      error: `crowdLevel must be one of: ${validLevels.join(", ")}.`,
    });
  }

  const suggestion = generateSuggestion(waitTime, crowdLevel);

  return res.status(200).json({ suggestion });
});

module.exports = router;