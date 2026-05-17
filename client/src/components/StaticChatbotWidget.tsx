import { useState } from "react";
import { useLocation } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const StaticChatbotWidget = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! 👋 I am your Smart Chaty Helper. Feel free to click any quick question below!",
    },
  ]);

  // Hide the floating assistant on the main full-screen chat workspace page
  if (location.pathname === "/chat") return null;

  const quickQuestions = [
    {
      question: "How do I create an account?",
      answer: "Click the 'Sign up' link at the bottom of the card, fill in your details, and hit 'Create Account'!",
    },
    {
      question: "What is Smart Chaty?",
      answer: "Smart Chaty is a premium responsive chat interface with clean layouts, deep navy aesthetic, and dark/light modes.",
    },
    {
      question: "Forgot password?",
      answer: "Click 'Forgot password?' on the login card, enter your email and set a new password securely.",
    },
  ];

  const handleQuestionClick = (q: string, a: string) => {
    // Append the question and answer to messages
    setMessages((prev) => [
      ...prev,
      { role: "user", content: q },
      { role: "assistant", content: a },
    ]);
  };

  return (
    <div className="select-none">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#5245FA] to-[#0F89F7] text-white p-4 rounded-full shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer animate-float flex items-center justify-center drop-shadow-[0_0_15px_rgba(82,69,250,0.3)] size-14"
        title="Open Support Assistant"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] md:w-[380px] h-[480px] bg-[#030C31]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden flex flex-col transition-all duration-300 transform scale-100 origin-bottom-right">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#030C31] to-[#121b44] border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src="/favicon.svg" alt="Helper Avatar" className="w-8 h-8 drop-shadow-[0_0_8px_rgba(82,69,250,0.4)] animate-float" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-[#030C31]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Smart Chaty Assistant</h3>
                <p className="text-[10px] text-[#02D3F8] font-medium">Static Guide Bot</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Conversation Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none bg-black/10">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`text-xs leading-relaxed px-3.5 py-2.5 rounded-xl max-w-[85%] border shadow-xs ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#5245FA] to-[#0F89F7] text-white border-transparent rounded-tr-none"
                      : "bg-[#060a22]/70 text-slate-200 border-white/5 rounded-tl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions Interactive Options */}
          <div className="p-3 bg-[#060a22]/60 border-t border-white/10 shrink-0">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2 px-1">Quick Questions</p>
            <div className="flex flex-col gap-1.5 max-h-[110px] overflow-y-auto scrollbar-none">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuestionClick(q.question, q.answer)}
                  className="w-full text-left text-xs bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 text-slate-300 hover:text-white px-3 py-2 rounded-lg transition-all duration-150 cursor-pointer truncate"
                >
                  {q.question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaticChatbotWidget;
