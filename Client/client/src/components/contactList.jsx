import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Fetch the contact list data from your server's API
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

  return (
    <div className="contact-list">
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contacts.id}>{contact.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
