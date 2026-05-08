const {
default: makeWASocket,
useMultiFileAuthState,
fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const pino = require("pino");

const config = require("./config");
const handleMessages = require("./handlers/messages");
const logger = require("./utils/logger");

async function startBot() {

const { state, saveCreds } =
await useMultiFileAuthState("./session");

const { version } =
await fetchLatestBaileysVersion();

const sock = makeWASocket({
auth: state,
version,
logger: pino({ level: "silent" }),
printQRInTerminal: false
});

// حفظ الجلسة
sock.ev.on("creds.update", saveCreds);

// Pairing Code
setTimeout(async () => {

try {

const code =
await sock.requestPairingCode(
config.phoneNumber
);

logger.info("PAIRING CODE: " + code);

} catch (err) {

logger.error(err);

}

}, 3000);

// الرسائل
sock.ev.on("messages.upsert", async (m) => {

await handleMessages(sock, m);

});

// إعادة الاتصال
sock.ev.on("connection.update", async (update) => {

const { connection } = update;

if (connection === "close") {

logger.error("Connection closed");

startBot();

}

if (connection === "open") {

logger.success("Bot connected");

}

});

}

startBot();