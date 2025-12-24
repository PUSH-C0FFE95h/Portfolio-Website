import { useState } from 'react';

export const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hallo! 👋 Ich bin ein KI-Assistent, der dir alles über meine Fähigkeiten als Entwickler erzählen kann. Was möchtest du wissen?", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Placeholder responses - später durch echte AI ersetzt
  const getResponse = (question) => {
    const q = question.toLowerCase();
    
    if (q.includes('skill') || q.includes('können') || q.includes('tech')) {
      return "Ich bin spezialisiert auf Full-Stack-Entwicklung mit React, ASP.NET Core, und PostgreSQL. Außerdem habe ich Erfahrung mit KI-Integration, insbesondere RAG-Systeme und Open Weights Modelle.";
    } else if (q.includes('projekt') || q.includes('work')) {
      return "Ich habe an verschiedenen Projekten gearbeitet, darunter diese Portfolio-Website mit integriertem KI-Chatbot. Scrolle nach unten, um mehr über meine Projekte zu erfahren!";
    } else if (q.includes('kontakt') || q.includes('contact') || q.includes('hire')) {
      return "Ich bin offen für neue Möglichkeiten! Scrolle zur Kontakt-Sektion unten, um meine E-Mail und LinkedIn zu finden.";
    } else if (q.includes('hallo') || q.includes('hi') || q.includes('hey')) {
      return "Hallo! Schön, dich kennenzulernen. Frag mich gerne alles über meine Entwickler-Skills, Projekte oder Kontaktmöglichkeiten!";
    } else {
      return "Interessante Frage! Ich kann dir über meine Skills, Projekte und Kontaktmöglichkeiten erzählen. Was interessiert dich am meisten?";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response with delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getResponse(input),
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Chat Container */}
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b border-white/10 px-6 py-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            KI-Assistent
          </h3>
          <p className="text-sm text-gray-300 mt-1">Frag mich alles über den Entwickler</p>
        </div>

        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-white/10 text-gray-100 backdrop-blur-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 p-4 bg-white/5">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Stell mir eine Frage..."
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Senden
            </button>
          </div>
        </div>
      </div>

      {/* Quick Question Suggestions */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {[
          "Was sind deine Skills?",
          "Welche Projekte hast du?",
          "Wie kann ich dich kontaktieren?"
        ].map((suggestion, index) => (
          <button
            key={index}
            onClick={() => setInput(suggestion)}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-sm text-gray-300 hover:text-white transition-all"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
