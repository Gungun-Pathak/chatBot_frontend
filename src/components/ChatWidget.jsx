import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MessageCircle, ThumbsUp, ThumbsDown, Bot } from "lucide-react";
import EmojiPicker from "emoji-picker-react"; // Install with: npm install emoji-picker-react

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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
        const signupResponse = await axios.post(`${backendUrl}/user/sign_up`, {
          name: extractedData.name,
          email: extractedData.email,
          ...extractedData,
        });

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
            ...extractedData,
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

  const handleEmojiClick = (emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          onClick={toggleChat}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Fullscreen Chat */}
      {/* Fullscreen Chat */}
      {isOpen && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-2xl h-[90vh] bg-white rounded-lg shadow-lg flex flex-col relative glow-chat">
            {/* Header */}
            <div className="relative bg-blue-600 text-white pt-6 pb-12 px-4 rounded-t-lg font-semibold overflow-hidden">
              <div className="z-10 relative text-lg flex items-center gap-2">
                🤖 Asha AI Chatbot
              </div>
              <svg
                className="absolute bottom-0 left-0 w-full transform -scale-x-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 150"
              >
                <path
                  fill="#ffffff"
                  fillOpacity="1"
                  d="M0,0 C360,120 1080,0 1440,120 L1440,150 L0,150 Z"
                ></path>
              </svg>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex items-end gap-2 max-w-[75%]">
                    {msg.sender === "assistant" && (
                      <Bot className="text-blue-500 w-5 h-5" />
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 text-sm ${
                        msg.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-black"
                      }`}
                    >
                      {msg.message}
                      {msg.sender === "assistant" && (
                        <div className="flex mt-1 justify-end gap-1">
                          <ThumbsUp
                            className="w-4 h-4 text-green-500 hover:scale-110 cursor-pointer"
                            title="Helpful"
                          />
                          <ThumbsDown
                            className="w-4 h-4 text-red-500 hover:scale-110 cursor-pointer"
                            title="Not Helpful"
                          />
                        </div>
                      )}
                    </div>
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

            {/* Input Area */}
            <div className="border-t p-3 flex items-center gap-2">
              <button
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="text-xl"
              >
                😊
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-20 left-4 z-50">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Send
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-2 text-gray-500 hover:text-red-500 text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
