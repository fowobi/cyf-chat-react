import React from "react";

const MessageList = ({ messages, onDelete }) => {
  return (
    <div>
      <h2>Chat Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.from}: </strong>
            {message.text}
            <p className="message-time">{new Date(message.timeSent).toLocaleString()}</p>
            <button onClick={() => onDelete(message.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
