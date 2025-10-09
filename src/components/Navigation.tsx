// Navigation.tsx
import React from 'react';

const Navigation: React.FC = () => {
  return null; // Navigation is now handled inside HeroSection
};

export default Navigation;
// import React, { useState } from 'react';
// import { Menu, X } from 'lucide-react';

// interface NavigationProps {
//   scrollToSection: (section: string) => void;
// }

// const Navigation: React.FC<NavigationProps> = ({ scrollToSection }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleMenu = () => setIsOpen(!isOpen);
//   const navItems = ['Home', 'Rooms', 'Dining', 'Contact'];

//   return (
//     <div className="bg-pink-200 py-4 px-6"> {/* Pink padding container */}
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center space-x-8">
//           {navItems.map((item) => (
//             <a
//               key={item}
//               href={`#${item.toLowerCase()}`}
//               onClick={(e) => {
//                 e.preventDefault();
//                 scrollToSection(item.toLowerCase());
//                 setIsOpen(false);
//               }}
//               className="text-white hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
//             >
//               {item}
//             </a>
//           ))}
//           <a
//             href="#booking"
//             onClick={(e) => {
//               e.preventDefault();
//               scrollToSection('booking');
//               setIsOpen(false);
//             }}
//             className="bg-blue-700 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-800 transition-colors duration-200"
//           >
//             Book Now
//           </a>
//         </div>

//         {/* Mobile menu button */}
//         <div className="md:hidden">
//           <button
//             onClick={toggleMenu}
//             className="text-white hover:text-blue-700 focus:outline-none"
//           >
//             {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isOpen && (
//         <div className="md:hidden mt-4">
//           <div className="space-y-2 bg-pink-100 p-4 rounded-md">
//             {navItems.map((item) => (
//               <a
//                 key={item}
//                 href={`#${item.toLowerCase()}`}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   scrollToSection(item.toLowerCase());
//                   setIsOpen(false);
//                 }}
//                 className="block text-white hover:text-blue-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
//               >
//                 {item}
//               </a>
//             ))}
//             <a
//               href="#booking"
//               onClick={(e) => {
//                 e.preventDefault();
//                 scrollToSection('booking');
//                 setIsOpen(false);
//               }}
//               className="block text-center bg-blue-700 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-800 transition-colors duration-200 mt-2"
//             >
//               Book Now
//             </a>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navigation;
