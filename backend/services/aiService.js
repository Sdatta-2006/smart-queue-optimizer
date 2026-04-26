// POST /predict-queue/suggest
// Body: { waitTime: number, crowdLevel: 'low'|'medium'|'high'|'peak' }
app.post('/predict-queue/suggest', (req, res) => {
  const { waitTime, crowdLevel } = req.body;

  if (!waitTime || !crowdLevel) {
    return res.status(400).json({ error: 'waitTime and crowdLevel are required.' });
  }

  let suggestion = "";

  if (crowdLevel === "peak") {
    suggestion = "The queue is very busy right now. Try visiting later in the evening or early morning to avoid long waits.";
  } else if (crowdLevel === "high") {
    suggestion = "There is a significant crowd. If possible, delay your visit by 1–2 hours.";
  } else if (crowdLevel === "medium") {
    suggestion = "Moderate wait time. You can visit now or wait a bit for a smoother experience.";
  } else {
    suggestion = "Low crowd right now. This is a great time to visit!";
  }

  res.json({ waitTime, crowdLevel, suggestion });
});

  const data = await response.json();
  const suggestion = data.content?.find(b => b.type === 'text')?.text?.trim();

  res.json({ waitTime, crowdLevel, suggestion });
