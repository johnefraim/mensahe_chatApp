import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';


const ChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io('http://localhost:4200');

    // Listen for the 'newMessage' event, which is emitted by the server
    // when a new message is sent
    socket.on('newMessage', (message) => {
      setChatHistory((prevHistory) => [...prevHistory, message]);
    });

    // Fetch chat history from the backend
    fetch('http://localhost:4200/api/chatHistory')
      .then((response) => response.json())
      .then((history) => {
        setChatHistory(history);
      })
      .catch((error) => {
        console.error('Error fetching chat history:', error);
      });

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    // Send the composed message to the server
    fetch('http://localhost:4200/api/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
      .then((response) => response.json())
      .then((updatedHistory) => {
        setChatHistory(updatedHistory);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  useEffect(() => {
    // Scroll to the bottom of the chat container when the chat history changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="form" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2>Chat</h2>
      <div
        ref={chatContainerRef}
        style={{ flex: '1', overflowY: 'auto', marginBottom: '10px' }}
      >
        <ul>
          {chatHistory.map((message) => (
            <li key={message._id}>
              <strong>{message.sender}:</strong> {message.content}
            </li>
          ))}
        </ul>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const message = {
            sender: 'Your name', // Replace with the actual sender's name
            content: e.target.elements.message.value,
          };
          sendMessage(message);
          e.target.reset();
        }}
      >
      </form>
    </div>
  );
};

export default ChatHistory;
