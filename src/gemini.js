import {
  GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
} from "@google/generative-ai";
let apiKey = "AIzaSyC8kntPRCHGFvqf69Ddot-p56frYQvu3Yg";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 200,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
//   console.log(HarmCategory)
//   console.log(HarmBlockThreshold)
  return result.response.text()
}

export default run;
