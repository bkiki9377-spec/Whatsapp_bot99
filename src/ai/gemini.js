const axios = require("axios");

async function gemini(prompt) {
  const key = process.env.GEMINI_API_KEY;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`;

  const res = await axios.post(url, {
    contents: [
      { parts: [{ text: prompt }] }
    ]
  });

  return res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}

module.exports = { gemini };