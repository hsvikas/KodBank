const express = require("express");
const axios = require("axios");
const router = express.Router();

// System prompt to control AI behavior
const SYSTEM_PROMPT = `
You are KodAssist, a banking assistant for KodBank.
Rules:
- Answer only banking related questions
- Never ask for OTP, password, PIN
- Do not give investment or illegal advice
- Keep responses short, simple, and friendly
`;

router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ reply: "Message is required" });
    }

    // Safety check
    if (/otp|password|pin/i.test(userMessage)) {
      return res.json({
        reply: "⚠️ KodBank will never ask for OTP, password, or PIN. Stay safe!"
      });
    }

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct",
      {
        inputs: `${SYSTEM_PROMPT}\nUser: ${userMessage}\nAssistant:`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      reply: response.data[0].generated_text
    });
  } catch (error) {
    console.error("Chatbot error:", error.message);
    res.status(500).json({
      reply: "KodAssist is currently unavailable. Please try again later."
    });
  }
});

module.exports = router;