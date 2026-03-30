  import React, { useState } from "react";
import api from "../api";
import "./KodAssist.css";

function KodAssist() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const username = localStorage.getItem("username") || "User";

  const toggleChat = () => {
    setOpen(!open);

    if (!open && messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: `Hi ${username} 👋\nI'm KodAssist, your KodBank assistant.\nI can help you with banking questions, savings tips, and account safety.\nHow can I help you today?`
        }
      ]);
    }
  };

  const sendMessage = async (textFromButton) => {
    const messageToSend = textFromButton || input;
    if (!messageToSend.trim()) return;

    // Add user message
    const userMsg = { sender: "user", text: messageToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const res = await api.post("/api/chat", {
        message: messageToSend
      });

      // ✅ Safe response handling
      const reply =
        res?.data?.reply ||
        "⚠️ KodAssist couldn't understand. Try again.";

      const botMsg = {
        sender: "bot",
        text: reply
      };

      setMessages((prev) => [...prev, botMsg]);

    } catch (err) {
      console.error("CHAT ERROR:", err.response?.data || err.message);

      const errorMsg =
        err?.response?.data?.reply ||
        "⚠️ KodAssist is temporarily unavailable.";

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: errorMsg }
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="chat-button" onClick={toggleChat}>
        💬
      </div>

      {open && (
        <div className="chat-box">
          {/* Header */}
          <div className="chat-header">KodAssist</div>

          {/* Messages */}
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {typing && (
              <div className="msg bot">KodAssist is typing...</div>
            )}
          </div>

          {/* Quick Buttons */}
          <div className="quick-buttons">
            <button onClick={() => sendMessage("How can I save money?")}>
              💰 Save money
            </button>
            <button onClick={() => sendMessage("Is my account secure?")}>
              🔐 Account security
            </button>
            <button onClick={() => sendMessage("Explain bank balance")}>
              📊 Bank balance
            </button>
            <button onClick={() => sendMessage("What is FD and RD?")}>
              🏦 FD & RD
            </button>
          </div>

          {/* Input */}
          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a banking question..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={() => sendMessage()}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default KodAssist;