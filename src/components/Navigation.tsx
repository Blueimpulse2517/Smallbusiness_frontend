import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Hotel Rooms", id: "rooms" },
    { label: "Special Dishes", id: "dishes" },
    { label: "Hotel Instagram Videos", id: "video" },
    { label: "Contact", id: "contact" },
  ];

  const whatsappNumber = "9845361085";

  const handleAdminClick = () => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      navigate("/admin-dashboard");
    } else {
      navigate("/admin-login");
    }
    setIsOpen(false);
  };

  return (
    <nav className="w-full fixed top-0 z-50 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-1 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        {/* Right - Contact Info + Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-medium">
          {/* Map icon with link before phone number */}
          <a
            href="https://www.google.com/maps/place/Sapna+Book+House/data=!4m2!3m1!1s0x0:0x9e85b191a60cf5a1?sa=X&ved=1t:2428&ictx=111"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
            title="View Hotel Location"
          >
           <img
  src="/assets/map-icon.png"
  alt="Map Icon"
  style={{ width: 24, height: 24 }}
  className="inline-block"
/>

          </a>

          <span className="whitespace-nowrap">📞 +919845361085</span>
          <span className="whitespace-nowrap">📧 hotelvinttagepark777@gmail.com</span>

          <a
            href="#booking"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("booking");
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-3 py-1.5 rounded-full text-xs sm:text-sm shadow-md transition-all"
          >
            Book Now
          </a>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Hello, I want to book a room from your website."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-md transition-all"
          >
            <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>WhatsApp</span>
          </a>

          {/* Hamburger for Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none ml-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex justify-center space-x-6 pb-2 text-sm font-medium">
        {navItems.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(id);
              setIsOpen(false);
            }}
            className="hover:text-blue-100 transition"
          >
            {label}
          </a>
        ))}

        <button
          onClick={handleAdminClick}
          className="underline hover:text-blue-100 transition"
        >
          Admin
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium bg-purple-400 bg-opacity-95 rounded-b-md">
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

          <button
            onClick={handleAdminClick}
            className="block w-full text-center underline text-white hover:text-blue-100"
          >
            Admin
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;




// import React, { useState } from "react"; 
// import { Menu, X } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// interface NavigationProps {
//   scrollToSection: (sectionId: string) => void;
// }

// const Navigation: React.FC<NavigationProps> = ({ scrollToSection }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
//   const toggleMenu = () => setIsOpen(!isOpen);

//   const navItems = [
//     { label: "Home", id: "home" },
//     { label: "Hotel Rooms", id: "rooms" },
//     { label: "Special Dishes", id: "dishes" },
//     { label: "Hotel Instagram Videos", id: "video" },
//     { label: "Contact", id: "contact" },
//   ];

//   const whatsappNumber = "9845361085";

//   // ✅ Navigate to dashboard if logged in, else login
//   const handleAdminClick = () => {
//     const isAdmin = localStorage.getItem("isAdmin");
//     if (isAdmin === "true") {
//       navigate("/admin-dashboard");
//     } else {
//       navigate("/admin-login");
//     }
//     setIsOpen(false);
//   };

//   return (
//     <nav className="w-full fixed top-0 z-50 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-1 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
//         {/* Left - Logo */}
//         {/* <div className="text-lg font-bold tracking-wide">
//           VINTTAGE <span className="text-yellow-200">PARK</span>
//         </div> */}

//         {/* Right - Contact Info + Buttons */}
//         <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-medium">
//           <span className="whitespace-nowrap">📞 +919845361085</span>
//           <span className="whitespace-nowrap">📧 hotelvinttagepark777@gmail.com</span>

//           <a
//             href="#booking"
//             onClick={(e) => {
//               e.preventDefault();
//               scrollToSection("booking");
//             }}
//             className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-3 py-1.5 rounded-full text-xs sm:text-sm shadow-md transition-all"
//           >
//             Book Now
//           </a>
// <a
//   href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
//     "Hello, I want to book a room from your website."
//   )}`}
//   target="_blank"
//   rel="noopener noreferrer"
//   className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-md transition-all"
// >
//   <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
//   <span>WhatsApp</span>
// </a>

//           {/* <a
//             href={`https://wa.me/${whatsappNumber}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-md transition-all"
//           >
//             <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
//             <span>WhatsApp</span>
//           </a> */}

//           {/* Hamburger for Mobile */}
//           <button onClick={toggleMenu} className="md:hidden focus:outline-none ml-2">
//             {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex justify-center space-x-6 pb-2 text-sm font-medium">
//         {navItems.map(({ label, id }) => (
//           <a
//             key={id}
//             href={`#${id}`}
//             onClick={(e) => {
//               e.preventDefault();
//               scrollToSection(id);
//             }}
//             className="hover:text-blue-100 transition"
//           >
//             {label}
//           </a>
//         ))}

//         <button
//           onClick={handleAdminClick}
//           className="underline hover:text-blue-100 transition"
//         >
//           Admin
//         </button>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isOpen && (
//         <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium bg-purple-400 bg-opacity-95 rounded-b-md">
//           {navItems.map(({ label, id }) => (
//             <a
//               key={id}
//               href={`#${id}`}
//               onClick={(e) => {
//                 e.preventDefault();
//                 scrollToSection(id);
//                 setIsOpen(false);
//               }}
//               className="block text-white hover:text-blue-100"
//             >
//               {label}
//             </a>
//           ))}

//           <button
//             onClick={handleAdminClick}
//             className="block w-full text-center underline text-white hover:text-blue-100"
//           >
//             Admin
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navigation;

// import React, { useState } from "react";
// import { Menu, X } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";

// interface NavigationProps {
//   scrollToSection: (sectionId: string) => void;
// }

// const Navigation: React.FC<NavigationProps> = ({ scrollToSection }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleMenu = () => setIsOpen(!isOpen);

//   const navItems = [
//     { label: "Home", id: "home" },
//     { label: "Hotel Rooms", id: "rooms" },
//     { label: "Special Dishes", id: "dishes" },
//     { label: "Hotel Instagram Videos", id: "video" },
//     { label: "Contact", id: "contact" },
//   ];

//   const whatsappNumber = "91 9845361085";

//   return (
//     <nav className="w-full fixed top-0 z-50 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 py-1 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
//         {/* Left - Logo */}
//         {/* <div className="text-base sm:text-lg font-bold tracking-wide">
//           VINTTAGE <span className="text-yellow-200">PARK</span>
//         </div> */}

//         {/* Right - Contact Info + Buttons */}
//         <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-medium">
//           {/* 📞 Contact Number */}
//           <span className="whitespace-nowrap">📞 +91 98453 61085</span>

//           {/* 📧 Email */}
//           <span className="whitespace-nowrap">📧 hotelvinttagepark777@gmail.com</span>

//           {/* 🟠 Book Now */}
//           <a
//             href="#booking"
//             onClick={(e) => {
//               e.preventDefault();
//               scrollToSection("booking");
//             }}
//             className="bg--500 hover:bg-orange-600 text-white font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm shadow-md transition-all"
//           >
//             Book Now
//           </a>

//           {/* ✅ WhatsApp Booking */}
//           <a
//             href={`https://wa.me/${whatsappNumber}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-md transition-all"
//           >
//             <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
//             <span>WhatsApp</span>
//           </a>

//           {/* 🍔 Hamburger for Mobile */}
//           <button
//             onClick={toggleMenu}
//             className="md:hidden focus:outline-none ml-2"
//           >
//             {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>
//       </div>

//       {/* ✅ Desktop Menu */}
//       <div className="hidden md:flex justify-center space-x-6 pb-2 text-sm font-medium">
//         {navItems.map(({ label, id }) => (
//           <a
//             key={id}
//             href={`#${id}`}
//             onClick={(e) => {
//               e.preventDefault();
//               scrollToSection(id);
//             }}
//             className="hover:text-blue-100 transition"
//           >
//             {label}
//           </a>
//         ))}
//         <a
//           href="/admin-login"
//           className="underline hover:text-blue-100 transition"
//         >
//           Admin Login
//         </a>
//       </div>

//       {/* ✅ Mobile Dropdown Menu */}
//       {isOpen && (
//         <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium bg-purple-400 bg-opacity-95 rounded-b-md">
//           {navItems.map(({ label, id }) => (
//             <a
//               key={id}
//               href={`#${id}`}
//               onClick={(e) => {
//                 e.preventDefault();
//                 scrollToSection(id);
//                 setIsOpen(false);
//               }}
//               className="block text-white hover:text-blue-100"
//             >
//               {label}
//             </a>
//           ))}

//           <a
//             href="/admin-login"
//             className="block text-center underline text-white hover:text-blue-100"
//           >
//             Admin Login
//           </a>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navigation;
