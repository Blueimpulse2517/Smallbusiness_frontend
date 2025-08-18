import { Menu, X } from "lucide-react";
import React from "react";

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  activeSection: string;
  scrollToSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  scrollToSection,
}) => {
  const navItems = [
    "home",
    "about",
    "experience",
    "skills",
    "project",
    "contact",
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0f0c29]/90 backdrop-blur-md p-4 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="w-40 h-12 flex items-center justify-center text-xl rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-bold">
            Neha Sharma
          </div>

          {/* Desktop menu */}

          <div className="hidden md:block">
            <div>
              {navItems.map((element) => (
                <button
                  key={element}
                  onClick={() => scrollToSection(element)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 
                                ${
                                  activeSection === element
                                    ? "hover:text-purple-300 transition-colors"
                                    : "text-white hover:text-purple-300"
                                }`}
                >
                  {element.charAt(0).toUpperCase() + element.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu  */}

      {isMenuOpen && (
        <div className="md:hidden bg-[#0f0c29]/90 backdrop-blur-md">
          <div className="px-2 pb-3 pt-2 space-y-l">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block px-3 py-2 text-base font-medium text-white hover:text-purple-300 w-full text-left"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
