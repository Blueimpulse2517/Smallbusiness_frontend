import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Removed Hotel icon

interface NavigationProps {
  scrollToSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navItems = ['Home', 'Rooms', 'Dining', 'Contact'];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Removed Logo */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase());
                  setIsOpen(false);
                }}
                className="text-gray-700 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
              >
                {item}
              </a>
            ))}
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('booking');
                setIsOpen(false);
              }}
              className="bg-blue-700 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-800 transition-colors duration-200"
            >
              Book Now
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-700 focus:outline-none focus:text-blue-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.toLowerCase());
                    setIsOpen(false);
                  }}
                  className="text-gray-700 hover:text-blue-700 block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-50 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('booking');
                  setIsOpen(false);
                }}
                className="block text-center bg-blue-700 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-800 transition-colors duration-200 mt-4"
              >
                Book Now
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;