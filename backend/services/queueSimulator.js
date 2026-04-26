function simulateQueue(hour) {
  const h = parseInt(hour);

  let waitTime, crowdLevel, baseMin, baseMax;

  if (h >= 9 && h < 12) {
    crowdLevel = "high";
    baseMin = 40;
    baseMax = 60;
  } else if (h >= 12 && h < 16) {
    crowdLevel = "medium";
    baseMin = 20;
    baseMax = 40;
  } else if (h >= 16 && h < 19) {
    crowdLevel = "low";
    baseMin = 10;
    baseMax = 25;
  } else if (h >= 7 && h < 9) {
    crowdLevel = "low";
    baseMin = 5;
    baseMax = 15;
  } else if (h >= 19 && h < 21) {
    crowdLevel = "medium";
    baseMin = 15;
    baseMax = 30;
  } else {
    crowdLevel = "peak";
    baseMin = 60;
    baseMax = 90;
  }

  const randomOffset = Math.floor(Math.random() * (baseMax - baseMin + 1));
  waitTime = baseMin + randomOffset;

  const recommendations = {
    low: "Great time to visit! Minimal wait expected. Head in now to breeze through.",
    medium: "Moderate crowd expected. Consider arriving 15 mins early or use the fast-track option.",
    high: "High crowd levels. Try arriving before 9 AM or after 4 PM for a shorter wait.",
    peak: "Peak hours detected. Strongly recommend scheduling for a different time slot if possible.",
  };

  return {
    waitTime,
    crowdLevel,
    recommendation: recommendations[crowdLevel],
  };
}

function generateSuggestion(waitTime, crowdLevel) {
  const level = (crowdLevel || "").toLowerCase();

  if (level === "peak" || waitTime >= 60) {
    return `With a ${waitTime}-minute wait and peak crowd levels, we strongly suggest rescheduling to an off-peak slot (early morning or late evening) to save time.`;
  }

  if (level === "high" || waitTime >= 40) {
    return `Expect a ${waitTime}-minute wait due to high traffic. Arriving 20 minutes earlier or using a pre-booking option can significantly cut your wait.`;
  }

  if (level === "medium" || waitTime >= 20) {
    return `A ${waitTime}-minute wait is typical for this crowd level. Staying patient or grabbing a token online can help you skip the physical queue.`;
  }

  if (level === "low" || waitTime < 20) {
    return `Only a ${waitTime}-minute wait — you're in luck! This is an ideal time to visit with minimal queuing.`;
  }

  return `Current wait time is ${waitTime} minutes. Plan accordingly and consider digital check-in options to reduce time spent in line.`;
}

module.exports = { simulateQueue, generateSuggestion };