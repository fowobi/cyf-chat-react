import React, { useState, useEffect } from "react";
import axios from "axios";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ from: "", text: "" });
  const [loading, setLoading] = useState(true);

  // const fetchLatestMessages = () => {
  //   axios
  //     .get("https://tosin-chat-server.glitch.me/messages/latest")
  //     .then((response) => {
  //       setMessages(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching latest messages:", error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const fetchLatestMessages = () => {
    axios
      .get("https://tosin-chat-server.glitch.me/messages/latest")
      .then((response) => {
        setMessages(response.data);
        setLoading(false); // Set loading to false when data is fetched successfully
      })
      .catch((error) => {
        console.error("Error fetching latest messages:", error);
        setLoading(false); // Set loading to false on error as well
      });
  };

  const deleteMessage = (id) => {
    axios
      .delete(`https://tosin-chat-server.glitch.me/messages/${id}`)
      .then(() => {
        setMessages(messages.filter((msg) => msg.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting message:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMessage({ ...newMessage, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the name or message field is empty
    if (!newMessage.from.trim() || !newMessage.text.trim()) {
      console.log("Name and message cannot be empty!");
      return;
    }

    axios
      .post("https://tosin-chat-server.glitch.me/messages", newMessage)
      .then((response) => {
        fetchLatestMessages(); // Fetch the latest messages again after adding a new one
        setNewMessage({ from: "", text: "" }); // Clear the form fields
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  useEffect(() => {
    fetchLatestMessages();
  }, []);

  return (
    <div>
      {/* Show a loading message while fetching data */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Latest Messages</h2>
          <ul>
            {messages.map((message) => (
              <li key={message.id}>
                <span>
                  From: {message.from}, Message: {message.text}
                </span>
                <button onClick={() => deleteMessage(message.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button onClick={fetchLatestMessages}>See Latest</button>
        </>
      )}

      <h2>Send a message</h2>
      <form onSubmit={handleSubmit}>
        <p>
          Name:{" "}
          <input
            type="text"
            name="from"
            placeholder="Your Name"
            value={newMessage.from}
            onChange={handleInputChange}
          />{" "}
          <br />
          Message:{" "}
          <input
            type="text"
            name="text"
            placeholder="The message..."
            value={newMessage.text}
            onChange={handleInputChange}
          />{" "}
          <br />
        </p>
        <button
          type="submit"
          disabled={!newMessage.from.trim() || !newMessage.text.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageList;
