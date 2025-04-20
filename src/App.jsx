import React from "react";
import ChatWidget from "./components/ChatWidget";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
      </main>
      <ChatWidget />
    </div>
  );
}

export default App;
