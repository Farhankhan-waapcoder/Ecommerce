// Auto-adjust position when opening chat to ensure it's visible
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Moon, Sun } from 'lucide-react';
import { chatbotAPI } from '../services/chatbot.js';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const chatbotRef = useRef(null);
  const messagesEndRef = useRef(null);
    const handleToggleOpen = () => {
    if (!isOpen) {
      // When opening, ensure the chat window will be fully visible
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const chatWidth = 400; // Chat window width
      const chatHeight = 600; // Chat window height
      
      setPosition(prev => ({
        x: Math.min(prev.x, windowWidth - chatWidth - 20),
        y: Math.min(prev.y, windowHeight - chatHeight - 20)
      }));
    }
    setIsOpen(!isOpen);
  };
  // Initialize position safely for bottom left
  useEffect(() => {
    setPosition({ 
      x: 20, 
      y: window.innerHeight - 100 
    });
  }, []);

  // Handle window resize to maintain position
  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.min(prev.x, window.innerWidth - 400),
        y: Math.min(prev.y, window.innerHeight - 100)
      }));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle dragging functionality for button
  const handleButtonMouseDown = (e) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Handle dragging functionality for chat window
  const handleWindowMouseDown = (e) => {
    if (e.target.closest('.drag-handle') && isOpen) {
      setIsDragging(true);
      const rect = chatbotRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep chatbot within viewport bounds
      const maxX = isOpen ? window.innerWidth - 400 : window.innerWidth - 80;
      const maxY = isOpen ? window.innerHeight - 600 : window.innerHeight - 80;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    updateLocalChat(inputMessage);
    try {
      const response = await chatbotAPI.processMessage(inputMessage.trim());
      
      const botMessage = {
        id: messages.length + 2,
        text: response.message,
        sender: 'bot',
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting. Please try again!",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };
  const updateLocalChat = (message) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const chatKey = user && user.email ? `${user.email}_chat` : 'guest_chat';

  const existingChat = JSON.parse(localStorage.getItem(chatKey)) || [];

  const updatedChat = [...existingChat, message];
  localStorage.setItem(chatKey, JSON.stringify(updatedChat));
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

return (
  <div className="fixed z-[9999]" style={{ left: position.x, top: position.y }}>
    {/* Chatbot Toggle Button */}
    {!isOpen && (
      <button
        onClick={handleToggleOpen}
        onMouseDown={handleButtonMouseDown}
        className={`
          w-16 h-16 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-grab active:cursor-grabbing
          bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
          dark:from-purple-600 dark:to-blue-600 dark:hover:from-purple-700 dark:hover:to-blue-700
          flex items-center justify-center group
        `}
      >
        <MessageCircle className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
      </button>
    )}

    {/* Chatbot Window */}
    {isOpen && (
      <div
        ref={chatbotRef}
        onMouseDown={handleWindowMouseDown}
        className={`
          w-96 h-[600px] rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden
          bg-white border border-gray-200
          dark:bg-gray-900 dark:border-gray-700
        `}
      >
        {/* Header */}
        <div className={`
          drag-handle cursor-move px-6 py-4 border-b flex items-center justify-between
          bg-gradient-to-r from-blue-50 to-purple-50 border-gray-200
          dark:from-gray-800 dark:to-gray-700 dark:border-gray-600
        `}>
          <div className="flex items-center space-x-3">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center
              bg-gradient-to-r from-blue-500 to-purple-600
              dark:from-purple-600 dark:to-blue-600
            `}>
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">AI Assistant</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleToggleOpen}
              className="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 text-gray-600 hover:text-gray-800 dark:hover:bg-gray-600 dark:text-gray-300 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px] bg-gray-50 dark:bg-gray-900">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                ${message.sender === 'user'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 dark:from-purple-600 dark:to-blue-600'}
              `}>
                {message.sender === 'user'
                  ? <User className="w-4 h-4 text-white" />
                  : <Bot className="w-4 h-4 text-white" />}
              </div>

              <div className={`
                max-w-[280px] rounded-2xl px-4 py-3 shadow-sm
                ${message.sender === 'user'
                  ? 'text-white bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600'
                  : 'bg-white text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700'}
              `}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`
                  text-xs mt-2 opacity-70
                  ${message.sender === 'user' 
                    ? 'text-green-100' 
                    : 'text-gray-500 dark:text-gray-400'}
                `}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 dark:from-purple-600 dark:to-blue-600">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="rounded-2xl px-4 py-3 shadow-sm bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full animate-bounce bg-gray-500 dark:bg-gray-400" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full animate-bounce bg-gray-500 dark:bg-gray-400" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full animate-bounce bg-gray-500 dark:bg-gray-400" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className={`
                flex-1 px-4 py-3 rounded-xl border transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                bg-gray-50 text-gray-800 border-gray-200 placeholder-gray-500
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className={`
                px-4 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
                dark:from-purple-600 dark:to-blue-600 dark:hover:from-purple-700 dark:hover:to-blue-700
                text-white shadow-sm hover:shadow-md active:scale-95
              `}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

};

export default Chatbot;