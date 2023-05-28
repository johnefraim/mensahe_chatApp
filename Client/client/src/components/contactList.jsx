import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageBox from '../components/messageBox';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    // Fetch the contact list data from server's API
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:4200/api/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Failed to fetch contact list:', error.message);
      }
    };

    fetchContacts();
  }, []);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowMessageBox(true);
  };

  return (
    <div className="contact-list bg-white-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="flex items-center justify-between py-2"
          >
            <button
              className="text-md font-semibold text-gray-800 hover:underline focus:outline-none"
              onClick={() => handleContactClick(contact)}
            >
              {contact.name}
            </button>
            {contact.online && (
              <span className="bg-green-500 w-3 h-3 rounded-full" />
            )}
          </li>
        ))}
      </ul>
      {showMessageBox && selectedContact && (
        <MessageBox
          contact={selectedContact}
          onClose={() => setShowMessageBox(false)}
          className="fixed bottom-4 right-4"
        />
      )}
    </div>
  );
};

export default ContactList;
