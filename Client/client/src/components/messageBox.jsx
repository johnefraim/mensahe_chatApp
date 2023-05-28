import React from 'react';
import PrivateMessage from '../components/privateMessage';

const MessageBox = ({ contact, onClose }) => {
  const handleSendMessage = (message) => {
    // Logic to send the private message
    console.log('Sending private message:', message);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-0 right-0 mt-2 mr-2 p-1 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <PrivateMessage recipient={contact.name} onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default MessageBox;
