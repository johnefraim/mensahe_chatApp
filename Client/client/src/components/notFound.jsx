import React from 'react';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h2 className='text-4xl font-bold mb-4'>404 Not Found</h2>
      <p className='text-lg text-gray-600'>Oops! The page you're looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
