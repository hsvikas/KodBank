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

    // Validation
    if (!userMessage) {
      return res.status(400).json({
        reply: "Message is required"
      });
    }

    // Security check
    if (/otp|password|pin|cvv/i.test(userMessage)) {
      return res.json({
        reply:
          "⚠️ KodBank will never ask for OTP, password, PIN, or CVV. Please stay safe."
      });
    }

    // Call Hugging Face API
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        inputs: `${SYSTEM_PROMPT}\nUser: ${userMessage}\nAssistant:`
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 60000
      }
    );

    console.log("HF RESPONSE:", response.data);

    // Handle Hugging Face errors (important fix)
    if (response.data.error) {
      return res.json({
        reply: "⏳ KodAssist is warming up. Please try again in a few seconds."
      });
    }

    // Extract AI response safely
    let aiReply = "KodAssist could not respond.";

    if (Array.isArray(response.data)) {
      aiReply = response.data[0]?.generated_text || aiReply;
    } else if (response.data.generated_text) {
      aiReply = response.data.generated_text;
    }

    return res.json({ reply: aiReply });

  } catch (error) {
    console.error("❌ FULL ERROR:", error.response?.data || error.message);

    return res.json({
      reply: error.response?.data?.error || "Chat failed"
    });
  }
});

module.exports = router;