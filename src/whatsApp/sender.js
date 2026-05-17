async function sendText(sock, jid, text) {
  await sock.sendMessage(jid, { text });
}

module.exports = { sendText };