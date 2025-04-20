import React from "react";
import ChatWidget from "./components/ChatWidget";

function App() {
  return (
    <div className="h-screen w-full bg-gray-100">
      <h1 className="text-3xl font-bold text-center pt-10">
        Welcome to Asha AI ChatBot!
      </h1>
      {/* Your page content */}

      {/* Floating Chatbot */}
      <ChatWidget />
    </div>
  );
}

export default App;
