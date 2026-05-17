require("../../config/env");
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const { handleMessage } = require("../commands/handler");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    await handleMessage(sock, msg);
  });

  console.log("WhasBot is running...");
}

module.exports = { startBot };
