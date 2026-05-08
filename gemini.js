const {
GoogleGenerativeAI
} = require("@google/generative-ai");

const config = require("../config");

const genAI =
new GoogleGenerativeAI(config.geminiKey);

module.exports = async (text) => {

try {

const model =
genAI.getGenerativeModel({
model: "gemini-1.5-flash"
});

const result =
await model.generateContent(text);

return result.response.text();

} catch (err) {

return "❌ حدث خطأ في الذكاء الاصطناعي";

}

};