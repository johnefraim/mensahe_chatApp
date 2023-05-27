import React from 'react';
import ChatContent from './chatHistory';
import ChatComposer from './chatComposer';
import ContactList from './contactList';

import Navbar from '../components/navbar';
import SearchBar from './searchbar';

const Layout = () => {
  return (
    <div>
      <header className="bg-gray-800">
        <Navbar />
      </header>
      <main className="container mx-auto py-4">
        <SearchBar/>
        <div className="flex">
          <div className="w-3/4 pr-4">
            <div className="bg-white rounded-lg shadow-lg mt-4">
              <div className="p-4">
                <ChatContent />
              </div>
              <div className="p-4 bg-gray-100">
                <ChatComposer />
              </div>
            </div>
          </div>
          <div className="w-1/4 flex justify-center">
            <ContactList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
