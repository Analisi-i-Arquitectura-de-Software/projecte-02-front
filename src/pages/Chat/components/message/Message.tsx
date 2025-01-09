import React from "react";
import "./Message.css"; // Add styles for alignment and visuals

interface MessageProps {
  content: string;
  isSentByMe: boolean; // True for messages sent by the user, false for received messages
  senderUsername: string; // Sender's username
  timestamp: string; // Time the message was sent
}

export const Message: React.FC<MessageProps> = ({
  content,
  isSentByMe,
  senderUsername,
  timestamp,
}) => {
  return (
    <div className={`message ${isSentByMe ? "sent" : "received"}`}>
      <div className="message-box">
        {/* Sender's username on the top-left */}
        {!isSentByMe ? (
          <div className="message-header">
            <span className="sender-username">{senderUsername}</span>
          </div>
        ) : null}

        {/* Message content */}
        <p className="message-content">{content}</p>
        {/* Timestamp on the bottom-right */}
        <div className="message-footer">
          <p className="message-timestamp">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};
