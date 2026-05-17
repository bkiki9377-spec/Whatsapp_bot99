const { gemini } = require("./gemini");

async function chatAI(prompt) {
  try {
    const res = await gemini(prompt);
    return res;
  } catch (e) {
    return "Error AI";
  }
}

module.exports = { chatAI };
