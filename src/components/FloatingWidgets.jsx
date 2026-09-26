import React, { useState, useEffect, useRef } from 'react';

import { Bot, X, Send, ArrowUp, MessageSquare } from 'lucide-react';

import budgetData from '../data/budgetData.json';

const FloatingWidgets = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [showScrollTop, setShowScrollTop] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm BudgetBee AI Assistant. How can I help you with student budgeting today?"
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isChatOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const findAnswer = (query) => {
    const cleanQuery = query.toLowerCase().trim();

    for (let item of budgetData.chatbotKnowledge) {
      for (let key of item.keywords) {
        if (cleanQuery.includes(key)) {
          return item.response;
        }
      }
    }

    return budgetData.chatbotFallback;
  };

  const handleSend = (textToSend) => {
    const questionText = textToSend || inputQuery;

    if (!questionText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: questionText
    };

    setMessages((prev) => [...prev, userMsg]);

    if (!textToSend) {
      setInputQuery('');
    }

    setIsTyping(true);

    setTimeout(() => {
      const answerText = findAnswer(questionText);

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: answerText
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="floating-widgets-wrapper">
      {/* Bottom Left: Scroll to Top Button */}
      {showScrollTop && (
        <div className="floating-left-container">
          <button
            className="floating-action-btn scroll-top-btn-left"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Scroll to Top"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      )}

      {/* Bottom Right: Floating AI Chatbot Container */}
      <div className="floating-right-container">
        {/* Docked Chatbot Window */}
        {isChatOpen && (
          <div className="floating-chatbot-window">
            <div className="chatbot-widget-header">
              <div className="chatbot-widget-title">
                <div className="widget-bot-avatar">
                  <Bot size={20} />
                </div>

                <span>BudgetBee AI</span>
              </div>

              <button
                className="widget-close-btn"
                onClick={() => setIsChatOpen(false)}
                aria-label="Close Chatbot"
              >
                <X size={18} />
              </button>
            </div>

            <div className="widget-prompts-strip">
              {budgetData.chatbotPrompts.slice(0, 3).map((prompt, index) => (
                <button
                  key={index}
                  className="widget-prompt-chip"
                  onClick={() => handleSend(prompt)}
                >
                  <MessageSquare size={11} className="icon-inline" /> {prompt}
                </button>
              ))}
            </div>

            <div className="chatbot-widget-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`widget-msg-row ${msg.sender === 'user' ? 'user-msg' : 'bot-msg'}`}
                >
                  <div className={`widget-msg-bubble ${msg.sender}`}>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="widget-msg-row bot-msg">
                  <div className="widget-msg-bubble bot widget-typing">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            <div className="chatbot-widget-input-area">
              <input
                type="text"
                className="widget-chat-input"
                placeholder="Ask financial query..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
              />

              <button
                className="widget-send-btn"
                onClick={() => handleSend()}
                disabled={!inputQuery.trim() || isTyping}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Floating Chatbot Action Button (Bottom Right) */}
        <button
          className={`floating-action-btn chatbot-toggle-btn ${isChatOpen ? 'active' : ''}`}
          onClick={() => setIsChatOpen((prev) => !prev)}
          title="Open AI Chatbot"
          aria-label="Toggle Chatbot"
        >
          {isChatOpen ? <X size={24} /> : <Bot size={24} />}
        </button>
      </div>
    </div>
  );
};

export default FloatingWidgets;