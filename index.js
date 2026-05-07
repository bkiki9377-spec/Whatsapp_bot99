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

// 🔑 Pairing Code بدل QR
const phoneNumber = "212651435709"; // ضع رقمك هنا

setTimeout(async () => {

try {
const code = await sock.requestPairingCode(phoneNumber);

console.log("=================================");
console.log("PAIRING CODE:", code);
console.log("=================================");

} catch (e) {
console.log("فشل إنشاء كود الربط");
}

}, 3000);

// 📩 استقبال الرسائل (بدون أوامر إضافية)
sock.ev.on("messages.upsert", async ({ messages }) => {

const msg = messages[0];
if (!msg.message) return;

const text =
msg.message.conversation ||
msg.message.extendedTextMessage?.text;

if (!text) return;

const from = msg.key.remoteJid;

// رد بسيط فقط
await sock.sendMessage(from, {
text: "ان benchemmar بوت ، تم تطويري لتلبية حاجاتكم في الاجابة عن الاسئلة المتعلقة في جميع المجالات ، جرب الدردشة معي الان!!"
});

});

}

startBot();
