import React, { useState } from "react";

const MessageForm = ({ onMessageSubmit }) => {
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onMessageSubmit({ from, text });
    setFrom("");
    setText("");
  };

  return (
    <div>
      <h2 className="send-msg">Send a Message</h2>
      <form onSubmit={handleSubmit}>
        <p className="p-text">
          Name:{" "}
          <input
            className="name"
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Your Name"
            required
          />{" "}
          <br />
          Message:{" "}
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="The message..."
            required
          />{" "}
          <br />
        </p>
        <button className="submit-btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
