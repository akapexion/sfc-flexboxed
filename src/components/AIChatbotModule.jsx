import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, MessageSquare, AlertTriangle, GraduationCap } from 'lucide-react';
import budgetData from '../data/budgetData.json';
import PageHeroBanner from './PageHeroBanner';
import chatbotBannerImg from '../assets/banner_chatbot.jpg';

const AIChatbotModule = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello, I'm your BudgetBasics AI Assistant. How can I help you learn about student budgeting today?"
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

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
    if (!textToSend) setInputQuery('');

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
    }, 600);
  };

  const handlePromptClick = (prompt) => {
    handleSend(prompt);
  };

  return (
    <>
      <PageHeroBanner
        title="AI Financial Assistant"
        subtitle="Ask queries about 50-30-20 rules, student savings, impulse buying, or click suggested prompt chips."
        badge="Instant AI Support"
        bgImage={chatbotBannerImg}
      />

      <section id="chatbot" className="module-section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">AI-Powered Q&A Chatbot Assistant</h2>
            <p className="section-description">
              Have questions about budgeting, savings, or spending habits? Ask our AI learning assistant or click one of the suggested prompt chips below!
            </p>
          </div>

          <div className="chatbot-wrapper border-only">
            <div className="chatbot-header">
              <div className="bot-avatar"><Bot size={28} /></div>
              <div className="bot-info">
                <h3>BudgetBee AI Assistant</h3>
                <span className="bot-status">Online | Ready to help</span>
              </div>
            </div>

            <div className="suggested-prompts-strip">
              <span className="prompts-label">Suggested Prompts:</span>
              <div className="prompts-chips">
                {budgetData.chatbotPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className="prompt-chip"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    <MessageSquare size={12} className="icon-inline" /> {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="chat-messages-container">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
                >
                  {msg.sender === 'bot' && <div className="chat-avatar"><Bot size={20} className="text-primary" /></div>}
                  <div className={`message-bubble ${msg.sender}`}>
                    <p>{msg.text}</p>
                  </div>
                  {msg.sender === 'user' ? <div className="chat-avatar"><GraduationCap /></div> : null}
                </div>
              ))}

              {isTyping && (
                <div className="message-row bot-row">
                  <div className="chat-avatar"><Bot size={20} className="text-primary" /></div>
                  <div className="message-bubble bot typing-bubble">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                className="chat-input"
                placeholder="Ask a financial question (e.g. 'What is a need?', 'How to save money')..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
              />
              <button
                className="btn btn-primary btn-send"
                onClick={() => handleSend()}
                disabled={!inputQuery.trim() || isTyping}
              >
                Ask <Send size={16} />
              </button>
            </div>

            <div className="chatbot-disclaimer-bar">
              <AlertTriangle size={14} className="icon-inline" /> <strong>Disclaimer:</strong> This AI Chatbot provides basic educational information and guidelines only. It does not provide professional banking or licensed financial advice.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AIChatbotModule;
