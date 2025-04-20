import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", message: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/chat/ask`, {
        question: input,
        conversation_id: conversationId,
      });

      const assistantMessage = {
        sender: "assistant",
        message: response.data.message || response.data.response,
      };

      if (Array.isArray(response.data.messages)) {
        setMessages(
          response.data.messages.map((msg) => ({
            sender: msg.type === "human" ? "user" : "assistant",
            message: msg.content,
          }))
        );
      } else {
        setMessages((prev) => [...prev, assistantMessage]);
      }

      if (!conversationId && response.data.conversation_id) {
        setConversationId(response.data.conversation_id);
      }

      const intent = response.data.intent;
      const extractedData = response.data.extracted_data;

      if (intent === "signup") {
        console.log("Extracted Data:", extractedData);

        const signupResponse = await axios.post(
          `${backendUrl}/user/sign_up`,
          {
            // Explicitly include required fields
            name: extractedData.name,
            email: extractedData.email,
            // Include other fields
            ...extractedData,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (signupResponse.status === 201) {
          setMessages((prev) => [
            ...prev,
            {
              sender: "assistant",
              message: "Signup successful! Your profile has been created.",
            },
          ]);
          setUserProfile(signupResponse.data.user);
        }
      } else if (intent === "update") {
        const updateResponse = await axios.post(
          `${backendUrl}/user/update_profile`,
          {
            ...extractedData, // No conversation_id here
          }
        );

        if (updateResponse.status === 200) {
          setMessages((prev) => [
            ...prev,
            {
              sender: "assistant",
              message: "Profile updated successfully!",
            },
          ]);
          setUserProfile(updateResponse.data.user);
        }
      } else {
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          message: "Oops! Something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        onClick={toggleChat}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="w-80 h-96 bg-white shadow-xl rounded-lg flex flex-col mt-3">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg font-semibold">
            Asha AI Chatbot
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg max-w-xs text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-gray-500 text-sm">
                Assistant is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t flex">
            <input
              className="flex-1 border border-gray-300 p-2 rounded-l-md text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {userProfile && (
        <div className="fixed bottom-6 left-6 z-50 bg-white p-3 shadow-lg rounded-lg w-80">
          <h3 className="text-xl font-semibold">User Profile</h3>
          <div className="mt-2">
            <p>
              <strong>Name:</strong> {userProfile.name}
            </p>
            <p>
              <strong>Email:</strong> {userProfile.email}
            </p>
            <p>
              <strong>Phone:</strong> {userProfile.phone}
            </p>
            <p>
              <strong>Skills:</strong> {userProfile.skills.join(", ")}
            </p>
            <p>
              <strong>Bio:</strong> {userProfile.bio}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
