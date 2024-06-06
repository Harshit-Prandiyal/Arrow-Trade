const axios = require('axios');
require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function handleQuestion(req, res) {
  const { prompt } = req.body;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return res.status(200).json({ answer : text });
}
module.exports = { handleQuestion };

