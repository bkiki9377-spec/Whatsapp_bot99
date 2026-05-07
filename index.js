const {
default: makeWASocket,
useMultiFileAuthState,
fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

async function startBot() {

const { state, saveCreds } = await useMultiFileAuthState("./session");
const { version } = await fetchLatestBaileysVersion();

const sock = makeWASocket({
auth: state,
version,
printQRInTerminal: false
});

// حفظ الجلسة
sock.ev.on("creds.update", saveCreds);

// 🔑 رقمك (معدل)
const phoneNumber = "212651435709";

setTimeout(async () => {

try {
const code = await sock.requestPairingCode(phoneNumber);

console.log("=================================");
console.log("PAIRING CODE:", code);
console.log("=================================");

} catch (err) {
console.log("❌ خطأ في إنشاء كود الربط");
console.log(err);
}

}, 3000);

// 📩 استقبال الرسائل
sock.ev.on("messages.upsert", async ({ messages }) => {

const msg = messages[0];
if (!msg.message) return;

const text =
msg.message.conversation ||
msg.message.extendedTextMessage?.text;

if (!text) return;

const from = msg.key.remoteJid;

await sock.sendMessage(from, {
text: "🤖 البوت شغال بنجاح"
});

});

}

startBot();
