import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import './App.css';

    function App() {
      const [messages, setMessages] = useState([]);
      const [inputText, setInputText] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      useEffect(() => {
        // Initial welcome message
        setMessages([{ text: "Bonjour ! Comment puis-je vous aider aujourd'hui ?", sender: 'bot' }]);
      }, []);

      const handleInputChange = (event) => {
        setInputText(event.target.value);
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        if (!inputText.trim()) return;

        const userMessage = { text: inputText, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
          const response = await axios.post('/api/chat', { message: inputText, context: messages });
          const botResponse = { text: response.data.response, sender: 'bot' };
          setMessages(prevMessages => [...prevMessages, botResponse]);
        } catch (error) {
          console.error("Erreur lors de la requête API:", error);
          setMessages(prevMessages => [...prevMessages, { text: "Désolé, une erreur s'est produite. Veuillez réessayer.", sender: 'bot' }]);
        } finally {
          setIsLoading(false);
        }
      };

      return (
        <div className="app-container">
          <div className="chat-container">
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.text}
                </div>
              ))}
              {isLoading && <div className="message bot">Chargement...</div>}
            </div>
            <form onSubmit={handleSubmit} className="input-form">
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Tapez votre message..."
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading}>Envoyer</button>
            </form>
          </div>
        </div>
      );
    }

    export default App;
