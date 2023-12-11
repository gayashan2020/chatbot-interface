import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: 'user', content: userInput };
    setMessages([...messages, userMessage]);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userInput }),
    });

    const { response: botMessage } = await response.json();
    setMessages([...messages, userMessage, { role: 'bot', content: botMessage }]);
    setUserInput('');
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleUserInputSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat with GPT-4</h1>
      </header>
      <main>
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleUserInputSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={handleUserInputChange}
            placeholder="Say something..."
          />
          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
}

export default App;
