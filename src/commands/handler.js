const { chatAI } = require("../ai/chatAI");
const { sendText } = require("../whatsapp/sender");
const { prefix } = require("../../config/config");

async function handleMessage(sock, msg) {
  const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
  const jid = msg.key.remoteJid;

  if (!text) return;

  if (text.startsWith(prefix + "ai")) {
    const prompt = text.replace(prefix + "ai", "").trim();
    const reply = await chatAI(prompt);
    return sendText(sock, jid, reply);
  }

  if (text === prefix + "menu") {
    return sendText(sock, jid, "AI Bot:
/ai السؤال
/menu");
  }

  const reply = await chatAI(text);
  return sendText(sock, jid, reply);
}

module.exports = { handleMessage };
