import React, { useEffect, useState, useRef } from "react";
import { getChatMessages, createMessage } from "@/services/messageService"; // Update path as needed
import { useSession } from "@/hooks/useSession";
import { Message, MessageType } from "@/types/models";
import { CreateMessageRequestType } from "@/types/requestTypes";
import { MessageResponseType } from "@/types/responseTypes";
import { Message as MessageCard } from "../message/Message";
import "./Chat.css";

interface ChatProps {
  chatId: number; // The ID of the chat to fetch messages for
}

export const Chat: React.FC<ChatProps> = ({ chatId }) => {
  const { getSession } = useSession();
  const [messages, setMessages] = useState<Message[] | null>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);

      try {
        const session = getSession();
        if (!session || !session.accessToken) {
          throw new Error("User is not logged in.");
        }

        const response: MessageResponseType = await getChatMessages(
          session,
          chatId
        );

        if (response.errorMessage) {
          setError(response.errorMessage);
        } else if (response.data) {
          setMessages(response.data.reverse()); // Load messages in correct order
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId]);

  // Automatically scroll down when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return; // Don't allow empty messages

    try {
      const session = getSession();
      if (!session || !session.accessToken) {
        throw new Error("User is not logged in.");
      }

      const createMessageRequest: CreateMessageRequestType = {
        type: MessageType.TEXT,
        content: newMessage,
      };

      const response = await createMessage(
        createMessageRequest,
        session,
        chatId
      );

      if (response.errorMessage) {
        setError(response.errorMessage);
      } else if (response.data) {
        setMessages((prevMessages) => [
          ...(prevMessages || []),
          response.data as Message,
        ]);
        setNewMessage(""); // Clear the input field after sending
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  if (loading) {
    return <div className="chat-loading">Loading messages...</div>;
  }

  if (error) {
    return <div className="chat-error">{error}</div>;
  }

  const session = getSession();
  const sessionUsername = session?.username;

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              key={index}
              content={message.content}
              isSentByMe={message.author.username === sessionUsername}
              senderUsername={message.author.username}
              timestamp="12:00"
            />
          ))
        ) : (
          <p className="chat-no-messages">No messages available</p>
        )}
        {/* Reference to the bottom of the messages */}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="chat-send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};
