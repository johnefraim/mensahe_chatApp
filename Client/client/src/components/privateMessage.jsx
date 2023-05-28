import React, { useState } from 'react';

const PrivateMessage = ({ recipient, onSend }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(message);
    setMessage('');
  };

  return (
    <div className="private-message">
      <h3 className="text-lg font-semibold mb-4">
        {recipient}
      </h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-20 resize-none border rounded p-2 mb-4"
          placeholder="Type your message..."
          value={message}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default PrivateMessage;
