import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa'; // Make sure react-icons is installed

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Hotel Rooms', id: 'rooms' },
    { label: 'Special Dishes', id: 'dishes' },
    { label: 'Hotel Instagram Videos', id: 'video' },
    { label: 'Contact', id: 'contact' },
  ];

  const whatsappNumber = '919876543210'; // Replace with your actual number

  return (
    <nav className="w-full fixed top-0 z-50 bg-gradient-to-r from-rose-400 to-fuchsia-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        {/* <div className="text-xl font-bold tracking-wide">
          VINTTAGE <span className="text-yellow-200">PARK</span>
        </div> */}

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
          {navItems.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
              }}
              className="hover:text-blue-100 transition"
            >
              {label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('booking');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full"
          >
            Book Now
          </a>
          <a
            href="/admin-login"
            className="underline hover:text-blue-100"
          >
            Admin Login
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-green-300 transition"
          >
            <FaWhatsapp className="w-5 h-5 text-green-400" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium bg-pink-400 bg-opacity-95 rounded-b-md">
          {navItems.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
                setIsOpen(false);
              }}
              className="block text-white hover:text-blue-100"
            >
              {label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('booking');
              setIsOpen(false);
            }}
            className="block bg-blue-600 text-white px-4 py-2 rounded-full text-center hover:bg-blue-700"
          >
            Book Now
          </a>
          <a
            href="/admin-login"
            className="block text-center underline text-white hover:text-blue-100"
          >
            Admin Login
          </a>
          <a
            href={`https://wa.me/${+919845361085}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 text-white hover:text-green-300"
          >
            <FaWhatsapp className="w-5 h-5 text-green-400" />
            <span>WhatsApp</span>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;