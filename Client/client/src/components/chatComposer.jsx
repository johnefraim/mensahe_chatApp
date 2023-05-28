import React, { useState } from 'react';
import { sendMessage } from '../services/messageService';
import { useSelector } from 'react-redux';
import { FaPaperPlane } from 'react-icons/fa';


const ChatComposer = () => {
  const [message, setMessage] = useState('');
  const user = useSelector((state) => state.auth.user);
  const selectedUser = useSelector((state) => state.auth.selectedUser);
  
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(message.trim() !== ''){
      sendMessage(user._id, selectedUser, message);
    }
    console.log('here');
    setMessage('');
  };

  return (
    <div className='bg-blue-400'>
      <form className='flex justify-end' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleChange}
          className="flex-grow py-2 px-4 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
        />
        <button
        className="bg-blue-500 text-white p-2 hover:bg-blue-600"
        type="submit">
        <FaPaperPlane className="text-xl" />
        </button>

      </form>
    </div>
  );
};

export default ChatComposer;
