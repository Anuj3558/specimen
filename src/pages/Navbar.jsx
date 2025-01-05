import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Hero } from '../Assets';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBagHovered, setIsBagHovered] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const bagItems = [
    { 
      id: 1, 
      title: 'SPECIMEN№15',
      subtitle: '1978 PORSCHE 911 CARRERA',
      price: 45,
      image: Hero
    },
    { 
      id: 2, 
      title: 'SPECIMEN№15',
      subtitle: '1978 PORSCHE 911 CARRERA',
      price: 45,
      image: Hero
    },
    { 
      id: 3, 
      title: 'SPECIMEN№15',
      subtitle: '1978 PORSCHE 911 CARRERA',
      price: 45,
      image: Hero
    },
  ];

  const subtotal = bagItems.reduce((total, item) => total + item.price, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Hamburger Menu for Mobile */}
          <div className="flex items-center md:hidden">
            <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Left Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/projects" className="text-gray-800 hover:text-gray-600 transition-colors">
              PROJECTS
            </Link>
            <Link to="/poster" className="text-gray-800 hover:text-gray-600 transition-colors">
              INDEX VIEW
            </Link>
            <Link to="/login" className="text-gray-800 hover:text-gray-600 transition-colors">
              LOGIN
            </Link>
          </div>

          {/* Centered Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-light tracking-wider">SPECIMEN</h1>
          </Link>

          {/* Right Links */}
          <div className="hidden md:flex space-x-8">
            <div
              className="relative"
              onMouseEnter={() => setIsBagHovered(true)}
              onMouseLeave={() => setIsBagHovered(false)}
            >
              <Link to="/bag" className="text-gray-800 hover:text-gray-600 transition-colors">
                BAG
              </Link>

              <AnimatePresence>
                {isBagHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-96 bg-white p-6 shadow-lg"
                  >
                    <div className="space-y-6">
                      {bagItems.map((item, index) => (
                        <div key={item.id} className="flex space-x-4">
                          <div className="w-16 h-20 bg-gray-100">
                            <img
                              src={item.image}
                              alt={item.subtitle}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{item.title}</p>
                            <p className="text-sm">{item.subtitle}</p>
                            <p className="text-sm mt-1">${item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex justify-between mb-4">
                        <p className="text-sm">SUBTOTAL</p>
                        <p className="text-sm">${subtotal}</p>
                      </div>
                      
                      <Link
                        to="/bag"
                        className="block w-full bg-black text-white text-center py-3 text-sm"
                      >
                        GO TO BAG
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/search" className="text-gray-800 hover:text-gray-600 transition-colors">
              SEARCH
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white backdrop-blur-sm bg-opacity-90 mt-2 overflow-hidden"
            >
              <div className="flex flex-col space-y-4 py-4">
                <Link to="/" className="px-4">PROJECTS</Link>
                <Link to="/poster" className="px-4">INDEX VIEW</Link>
                <Link to="/login" className="px-4">LOGIN</Link>
                <Link to="/bag" className="px-4">BAG</Link>
                <Link to="/search" className="px-4">SEARCH</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}