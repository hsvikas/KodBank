const express = require("express");
const axios = require("axios");
const router = express.Router();

// System prompt to control AI behaviour
const SYSTEM_PROMPT = `
You are KodAssist, a banking assistant for KodBank.

Rules:
- Answer ONLY banking-related questions
- NEVER ask for OTP, password, PIN, CVV
- Do NOT give investment or illegal advice
- Keep answers short, simple, and professional
`;

// POST /api/chat
router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({
        reply: "Message is required"
      });
    }

    // Safety check before calling AI
    if (/otp|password|pin|cvv/i.test(userMessage)) {
      return res.json({
        reply:
          "⚠️ KodBank will never ask for OTP, password, PIN, or CVV. Please stay safe."
      });
    }

    // Call Hugging Face Inference API
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct",
      {
        inputs: `${SYSTEM_PROMPT}\nUser: ${userMessage}\nAssistant:`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 60000 // 60 seconds for cold start
      }
    );

    // SAFELY extract AI response (handles all HF formats)
    let aiReply = "";

    if (Array.isArray(response.data)) {
      aiReply =
        response.data[0]?.generated_text ||
        "KodAssist could not generate a response.";
    } else if (response.data.generated_text) {
      aiReply = response.data.generated_text;
    } else {
      aiReply = "KodAssist could not understand the response.";
    }

    return res.json({ reply: aiReply });
  } catch (error) {
    console.error("❌ Chatbot error:", error.message);

    return res.status(500).json({
      reply:
        "KodAssist is temporarily unavailable. Please try again in a moment."
    });
  }
});

module.exports = router;