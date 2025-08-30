// API/chatbot.js
const CHATBOT_API_URL = 'https://api.adviceslip.com/advice';

export const chatbotAPI = {
  // Get advice from the API
  async getAdvice() {
    try {
      const response = await fetch(CHATBOT_API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch advice');
      }
      const data = await response.json();
      return {
        success: true,
        message: data.slip.advice
      };
    } catch (error) {
      console.error('Chatbot API Error:', error);
      return {
        success: false,
        message: "I'm having trouble connecting right now. Please try again later!"
      };
    }
  },

  // Simulate different types of responses based on user input
  async processMessage(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Handle greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return {
        success: true,
        message: "Hello! I'm your AI assistant. I can give you advice or just chat. What would you like to talk about?"
      };
    }
    
    // Handle goodbye
    if (message.includes('bye') || message.includes('goodbye') || message.includes('see you')) {
      return {
        success: true,
        message: "Goodbye! Feel free to chat with me anytime. Have a great day! 👋"
      };
    }
    
    // Handle advice requests
    if (message.includes('advice') || message.includes('help') || message.includes('suggest')) {
      return await this.getAdvice();
    }
    
    // Handle questions about the bot
    if (message.includes('who are you') || message.includes('what are you')) {
      return {
        success: true,
        message: "I'm a friendly AI chatbot here to help you! I can provide advice, answer questions, and have conversations. What can I help you with today?"
      };
    }
    
    // Default: get random advice
    const responses = [
      "That's interesting! Here's some advice that might help:",
      "Let me share something that might inspire you:",
      "Here's a thought for you to consider:",
      "I think you might find this helpful:"
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const advice = await this.getAdvice();
    
    return {
      success: advice.success,
      message: advice.success ? `${randomResponse} "${advice.message}"` : advice.message
    };
  }
};