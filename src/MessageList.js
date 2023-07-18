import React, { useState, useEffect } from "react";
import axios from "axios";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  // Function to fetch the latest messages from the server
  const fetchLatestMessages = () => {
    axios
      .get("https://tosin-chat-server.glitch.me/messages/latest")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching latest messages:", error);
      });
  };

  // Function to delete a message from the server and local display
  const deleteMessage = (id) => {
    axios
      .delete(`https://tosin-chat-server.glitch.me/messages/${id}`)
      .then(() => {
        // Remove the deleted message from the local display
        setMessages(messages.filter((msg) => msg.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting message:", error);
      });
  };

  useEffect(() => {
    // Fetch the latest messages on component mount
    fetchLatestMessages();
  }, []);

  return (
    <div>
      <h2>Latest Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <span>
              From: {message.from}, Message: {message.text}
            </span>
            <button onClick={() => deleteMessage(message.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={fetchLatestMessages}>See Latest</button>
    </div>
  );
};

export default MessageList;
