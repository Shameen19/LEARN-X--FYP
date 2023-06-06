import React, { useState } from "react";
import { Avatar, Typography } from "@mui/material";
import "./Chatbot.css";
import imge from "./bot.png";
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", message: inputValue },
      ]);
      try {
        const response = await fetch("http://localhost:8001/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: inputValue }),
        });
        const data = await response.json(); // Add this line to correctly get the response data

        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   { sender: "bot", message: data.result }, // Update the bot message with data.result
        // ]);

        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", message: data.result }, // Update the bot message with data.result
          ]);
        }, 500);
      } catch (error) {
        console.error(error);
      }
      setInputValue("");
    }
  };

  return (
    <div>
      <button
        style={{ padding: "20px", borderRadius: "5px" }}
        className="chatbot-toggle"
        onClick={toggleChatbot}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar src={imge} />
          <Typography variant="h6" sx={{ ml: 1 }}>
            Chatbot
          </Typography>
        </div>
      </button>
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div>Chat Now!</div>
            <button onClick={toggleChatbot}>x</button>
          </div>
          <div className="chatbot-messages-container">
            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <div key={index} className="message-container">
                  {message.sender === "user" ? (
                    <div className="user-message">{message.message}</div>
                  ) : (
                    <div className="bot-message">{message.message}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputValue}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              onChange={handleInputValueChange}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
