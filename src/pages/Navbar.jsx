import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for the hamburger menu

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBagHovered, setIsBagHovered] = useState(false); // State for bag hover

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Sample bag items (replace with actual data)
  const bagItems = [
    { id: 1, title: '1978 PORSCHE 911 CARRERA', price: 45 },
    { id: 2, title: '1978 PORSCHE 911 CARRERA', price: 45 },
    { id: 3, title: '1978 PORSCHE 911 CARRERA', price: 45 },
  ];

  // Calculate subtotal
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

          {/* Left Links (Hidden on Mobile) */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-gray-600 transition-colors">
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
            <h1 className="text-xl font-light tracking-wider">SPECIMEN.</h1>
          </Link>

          {/* Right Links (Hidden on Mobile) */}
          <div className="hidden md:flex space-x-8">
            {/* Bag Link with Hover Section */}
            <div
              className="relative"
              onMouseEnter={() => setIsBagHovered(true)}
              onMouseLeave={() => setIsBagHovered(false)}
            >
              <Link to="/bag" className="text-gray-800 hover:text-gray-600 transition-colors">
                BAG
              </Link>

              {/* Bag Hover Section */}
              {isBagHovered && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 shadow-lg rounded-lg p-4">
                  {/* Bag Items */}
                  <div className="space-y-4">
                    {bagItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-gray-500">SPECIMEN15</p>
                        </div>
                        <p className="text-sm font-medium">${item.price}</p>
                      </div>
                    ))}
                  </div>

                  {/* Subtotal */}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">SUBTOTAL:</p>
                      <p className="text-sm font-medium">${subtotal}</p>
                    </div>
                  </div>

                  {/* Go to Bag Button */}
                  <Link
                    to="/bag"
                    className="block w-full text-center bg-black text-white py-2 mt-4 rounded-lg text-sm hover:bg-gray-800 transition-colors"
                  >
                    GO TO BAG
                  </Link>
                </div>
              )}
            </div>

            <Link to="/search" className="text-gray-800 hover:text-gray-600 transition-colors">
              SEARCH
            </Link>
          </div>
        </div>

        {/* Mobile Menu (Collapsible) */}
        {isMenuOpen && (
          <div className="md:hidden bg-white backdrop-blur-sm bg-opacity-90 mt-2 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-800 hover:text-gray-600 transition-colors px-4"
                onClick={toggleMenu}
              >
                PROJECTS
              </Link>
              <Link
                to="/poster"
                className="text-gray-800 hover:text-gray-600 transition-colors px-4"
                onClick={toggleMenu}
              >
                INDEX VIEW
              </Link>
              <Link
                to="/login"
                className="text-gray-800 hover:text-gray-600 transition-colors px-4"
                onClick={toggleMenu}
              >
                LOGIN
              </Link>
              <Link
                to="/bag"
                className="text-gray-800 hover:text-gray-600 transition-colors px-4"
                onClick={toggleMenu}
              >
                BAG
              </Link>
              <Link
                to="/search"
                className="text-gray-800 hover:text-gray-600 transition-colors px-4"
                onClick={toggleMenu}
              >
                SEARCH
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}