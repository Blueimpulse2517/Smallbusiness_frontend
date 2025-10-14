import React from 'react';

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ scrollToSection }) => {
  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Hotel Rooms', id: 'rooms' },
    { label: 'Special Dishes', id: 'dishes' },
    { label: 'Hotel Instagram Videos', id: 'video' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="w-full fixed top-0 z-50 bg-gradient-to-r from-rose-400 to-fuchsia-500 text-white shadow-sm px-4 py-2">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        {/* <div className="text-lg font-bold tracking-wide">
          VINTTAGE <span className="text-yellow-200">PARK</span>
        </div> */}

        {/* Unified Menu for All Screens */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {navItems.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
              }}
              className="hover:text-blue-100 transition whitespace-nowrap"
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full whitespace-nowrap"
          >
            Book Now
          </a>
          <a
            href="/admin-login"
            className="underline text-sm hover:text-blue-100 whitespace-nowrap"
          >
            Admin Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;