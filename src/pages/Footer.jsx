import React from 'react';

const Footer = () => {
  return (
    <div className="fixed bottom-4 md:bottom-8 left-0 right-0 flex justify-between px-4 md:px-8 z-40">
      
      <a href="/contact"><span className="text-xs md:text-sm text-gray-600">CONTACTS</span></a>
      <a href="/tnc"><span className="text-xs md:text-sm text-gray-600">TERMS OF USE</span></a>
    </div>
  );
};

export default Footer;