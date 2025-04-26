import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Bot,
  HelpCircle,
  Building,
  FileText,
  Scale,
  Phone,
  Briefcase,
  User,
  Smile,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Clipboard,
  ArrowUpRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const suggestions = [
  {
    text: "frequently asked questions",
    icon: HelpCircle,
    color: "text-blue-600",
  },
  {
    text: "questions related jobsForHer foundation",
    icon: Building,
    color: "text-purple-600",
  },
  { text: "resume review", icon: FileText, color: "text-green-600" },
  { text: "work life balance", icon: Scale, color: "text-orange-600" },
  { text: "call me and ask anything", icon: Phone, color: "text-red-600" },
  { text: "jobs/mentorship/events", icon: Briefcase, color: "text-indigo-600" },
  { text: "signup/profile update", icon: User, color: "text-pink-600" },
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleSuggestions = () => setShowSuggestions(!showSuggestions);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        message: "Uploading resume for review...",
        isUpload: true,
        fileName: file.name,
      },
    ]);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${backendUrl}/resume/analyze_resume`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const analysis = response.data;
      const structuredResponse = {
        summary: "Resume Analysis Results 📄",
        sections: [
          { title: "Key Skills", icon: "clipboard", content: analysis.skills },
          {
            title: "Recommended Courses",
            icon: "link",
            content: analysis.recommended_courses,
          },
          {
            title: "Career Roadmap",
            icon: "calendar",
            content: analysis.career_roadmap,
          },
          {
            title: "Shortcomings",
            icon: "clipboard",
            content: analysis.shortcomings,
          },
          {
            title: "Improvement Tips",
            icon: "clipboard",
            content: analysis.improvement_tips,
          },
        ],
      };

      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          message: "Here's your resume analysis:",
          structuredResponse,
        },
      ]);
    } catch (error) {
      console.error("Resume analysis error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          message: "Error analyzing resume. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      fileInputRef.current.value = "";
    }
  };

  const getSectionIcon = (icon) => {
    switch (icon) {
      case "calendar":
        return <Calendar className="w-4 h-4" />;
      case "location":
        return <MapPin className="w-4 h-4" />;
      case "link":
        return <LinkIcon className="w-4 h-4" />;
      default:
        return <Clipboard className="w-4 h-4" />;
    }
  };

  const renderStructuredContent = (structuredData) => {
    if (!structuredData) return null;

    return (
      <div className="space-y-3">
        {structuredData.summary && (
          <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">
            {structuredData.summary}
          </p>
        )}

        {structuredData.sections?.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="bg-gray-50 p-3 rounded-lg border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-2 text-gray-600">
              {getSectionIcon(section?.icon)}
              <h3 className="font-medium text-sm">{section.title}</h3>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {section.content?.map((item, itemIndex) => {
                // Handle both string and object content items
                const content =
                  typeof item === "object"
                    ? `${item.step ? `${item.step}. ` : ""}${item.description}`
                    : item.replace(/\*\*/g, "");

                return (
                  <li key={itemIndex} className="text-gray-700 text-sm">
                    {content}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {structuredData.links?.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <LinkIcon className="w-4 h-4" />
              <h4 className="font-medium text-sm">Useful Links</h4>
            </div>
            <div className="space-y-1">
              {structuredData.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm underline">{link.text}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {structuredData.actions?.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <Clipboard className="w-4 h-4" />
              <h4 className="font-medium text-sm">Actions</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {structuredData.actions.map((action, actionIndex) => (
                <button
                  key={actionIndex}
                  onClick={() => window.open(action.url, "_blank")}
                  className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                >
                  {action.type === "register" && (
                    <Clipboard className="w-4 h-4" />
                  )}
                  {action.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const sendMessage = async (messageParam) => {
    const messageToSend = messageParam || input;
    if (messageToSend.trim() === "") return;
    const userMessage = { sender: "user", message: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/chat/ask`, {
        question: messageToSend,
        conversation_id: conversationId,
      });

      const assistantMessage = {
        sender: "assistant",
        message: response.data.response,
        structuredResponse: response.data.structured_response || null,
      };

      setMessages((prev) => [...prev, assistantMessage]);

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
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-blue-800 text-white p-3 rounded-full shadow-lg hover:bg-blue-900 transition-transform transform hover:scale-105"
          onClick={toggleChat}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-2xl h-[90vh] bg-white rounded-3xl shadow-lg flex flex-col relative">
            <div className="relative bg-blue-800 text-white pt-6 pb-12 px-4 rounded-t-3xl font-semibold overflow-hidden">
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
                      <Bot className="text-blue-800 w-5 h-5" />
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 text-sm ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-50 text-gray-800 border border-gray-100"
                      }`}
                    >
                      {msg.isUpload ? (
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>Resume uploaded ({msg.fileName})</span>
                        </div>
                      ) : msg.structuredResponse ? (
                        renderStructuredContent(msg.structuredResponse)
                      ) : (
                        msg.message
                      )}
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
                <div className="flex items-center text-gray-500 text-sm">
                  <Bot className="w-4 h-4 mr-2 animate-pulse" />
                  Assistant is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-500">Quick Suggestions</span>
                <button
                  onClick={toggleSuggestions}
                  className="text-gray-500 hover:text-blue-800 transition-colors p-1"
                  aria-label={
                    showSuggestions ? "Hide suggestions" : "Show suggestions"
                  }
                >
                  {showSuggestions ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronUp className="w-5 h-5" />
                  )}
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  showSuggestions ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => {
                    const Icon = suggestion.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          if (suggestion.text === "resume review") {
                            fileInputRef.current.click();
                          } else {
                            sendMessage(suggestion.text);
                          }
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-white text-gray-800 rounded-xl
                     hover:bg-blue-50 transition-all duration-200 border border-gray-200
                     hover:border-blue-200 hover:text-blue-800"
                      >
                        <Icon className={`w-4 h-4 ${suggestion.color}`} />
                        <span className="whitespace-nowrap">
                          {suggestion.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="border-t p-3 flex items-center rounded-3xl gap-2 bg-white">
              <button
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="text-gray-500 hover:text-blue-800 transition-colors"
              >
                <Smile className="w-5 h-5" />
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-20 left-4 z-50">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
              <input
                type="text"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Type your message here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-blue-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-900 transition-colors flex items-center gap-2"
              >
                Send
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="application/pdf"
              className="hidden"
              onChange={handleResumeUpload}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
