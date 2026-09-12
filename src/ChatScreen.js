import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ChatScreen.css';
import { Avatar } from '@mui/material';
import { useAggressiveChat } from './hooks/useAggressiveChat';

function ChatScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      name: 'Ellen',
      Image: 'https://imageio.forbes.com/specials-images/imageserve/5ed560d07fe4060006bbce1e/0x0.jpg?format=jpg&crop=878,879,x422,y0,safe&height=416&width=416&fit=bounds',
      message: 'Whats up❤️?',
    },
    {
      name: 'Ellen',
      Image: 'https://imageio.forbes.com/specials-images/imageserve/5ed560d07fe4060006bbce1e/0x0.jpg?format=jpg&crop=878,879,x422,y0,safe&height=416&width=416&fit=bounds',
      message: 'How it going!',
    },
  ]);
  const messagesEndRef = useRef(null);

  const sendMessage = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { message: trimmed }]);
    setInput('');
  }, []);

  const { handleChange, isRuining } = useAggressiveChat(setInput, sendMessage);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isRuining]);

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="chatScreen">
      <p className="chatScreen__timestamp">YOU MATCHED WITH ELLEN ON 10/08/23</p>

      {messages.map((message, i) =>
        message.name ? (
          <div key={i} className="chatScreen__message">
            <Avatar className="chatScreen__image" alt={message.name} src={message.Image} />
            <p className="chatScreen__text">{message.message}</p>
          </div>
        ) : (
          <div key={i} className="chatScreen__message">
            <p className="chatScreen__textUser">{message.message}</p>
          </div>
        )
      )}

      {isRuining && (
        <p className="chatScreen__chaosHint">✨ the app is finishing your sentence for you...</p>
      )}

      <div ref={messagesEndRef} />

      <form className="chatScreen__input" onSubmit={handleSend}>
        <input
          value={input}
          onChange={handleChange}
          className={`chatScreen__inputField ${isRuining ? 'chatScreen__inputField--chaos' : ''}`}
          type="text"
          placeholder="Type a message..."
          autoComplete="off"
        />
        <button type="submit" className="chatScreen__inputButton send-button">
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatScreen;
