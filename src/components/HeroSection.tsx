import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navItems = ["Home", "Rooms", "Dining", "Contact"];

  return (
    <section className="bg-gradient-to-r from-rose-400 to-fuchsia-500 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation inside hero */}
        <div className="flex justify-between items-center mb-6">
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.toLowerCase());
                  setIsOpen(false);
                }}
                className="hover:text-blue-100 transition duration-200 font-medium"
              >
                {item}
              </a>
            ))}
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("booking");
                setIsOpen(false);
              }}
              className="bg-white text-pink-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-200"
            >
              Book Now
            </a>
            <a
              href="https://wa.me/919876543210?text=Hello%20VINTTAGE%20PARK%2C%20I%20want%20to%20book%20a%20room"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition duration-200"
              aria-label="Chat on WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.837.74 5.504 2.03 7.86L0 32l8.293-2.03A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.667 0-5.2-.733-7.4-2.133l-.533-.333-4.933 1.2 1.2-4.8-.4-.6C3.2 21.2 2.667 18.667 2.667 16c0-7.333 6-13.333 13.333-13.333S29.333 8.667 29.333 16 23.333 29.333 16 29.333zM22.4 19.733c-.4-.2-2.4-1.2-2.8-1.333-.4-.133-.667-.2-.933.2-.267.4-1.067 1.333-1.333 1.6-.267.267-.533.267-.933.067-.4-.2-1.733-.667-3.267-2-1.2-1.067-2.133-2.4-2.4-2.8-.267-.4-.027-.6.2-.8.2-.2.4-.4.6-.6.2-.2.267-.4.4-.667.133-.267.067-.533 0-.733-.067-.2-.933-2.267-1.267-3.067-.333-.8-.667-.667-.933-.667h-.8c-.267 0-.667.067-1 .4-.333.333-1.333 1.333-1.333 3.2s1.333 3.733 1.6 4.267c.2.4 2.6 4 6.267 5.6.867.373 1.54.597 2.067.76.867.267 1.653.227 2.28.133.733-.107 2.4-.973 2.733-1.907.333-.933.333-1.733.233-1.907-.1-.173-.367-.267-.767-.467z" />
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mb-6">
            <div className="space-y-2 bg-pink-300 p-4 rounded-md">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.toLowerCase());
                    setIsOpen(false);
                  }}
                  className="block text-white hover:text-blue-100 px-3 py-2 rounded-md font-medium"
                >
                  {item}
                </a>
              ))}
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("booking");
                  setIsOpen(false);
                }}
                className="block text-center bg-white text-pink-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-100 transition duration-200"
              >
                Book Now
              </a>
              <a
                href="https://wa.me/919876543210?text=Hello%20VINTTAGE%20PARK%2C%20I%20want%20to%20book%20a%20room"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition duration-200"
                aria-label="Chat on WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="mx-auto h-5 w-5"
                >
                  <path d="M16 0C7.163 0 0 7.163 0 16c0 2.837.74 5.504 2.03 7.86L0 32l8.293-2.03A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.667 0-5.2-.733-7.4-2.133l-.533-.333-4.933 1.2 1.2-4.8-.4-.6C3.2 21.2 2.667 18.667 2.667 16c0-7.333 6-13.333 13.333-13.333S29.333 8.667 29.333 16 23.333 29.333 16 29.333zM22.4 19.733c-.4-.2-2.4-1.2-2.8-1.333-.4-.133-.667-.2-.933.2-.267.4-1.067 1.333-1.333 1.6-.267.267-.533.267-.933.067-.4-.2-1.733-.667-3.267-2-1.2-1.067-2.133-2.4-2.4-2.8-.267-.4-.027-.6.2-.8.2-.2.4-.4.6-.6.2-.2.267-.4.4-.667.133-.267.067-.533 0-.733-.067-.2-.933-2.267-1.267-3.067-.333-.8-.667-.667-.933-.667h-.8c-.267 0-.667.067-1 .4-.333.333-1.333 1.333-1.333 3.2s1.333 3.733 1.6 4.267c.2.4 2.6 4 6.267 5.6.867.373 1.54.597 2.067.76.867.267 1.653.227 2.28.133.733-.107 2.4-.973 2.733-1.907.333-.933.333-1.733.233-1.907-.1-.173-.367-.267-.767-.467z" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
