

// import React, { useState } from 'react'; 
// import Navigation from './Navigation';
// import HeroSection from './HeroSection';
// import Rooms from './Rooms';
// import InstagramVideo from './InstagramVideo';
// import Dishes from './Dishes';
// import BookingForm from './BookingForm';
// import ContactSection from './ContactSection';
// import Hotel from '../components/Hotel';   // ✅ Correct import

// const Portfolio: React.FC = () => {
//   const [activeSection, setActiveSection] = useState('home');

//   const scrollToSection = (sectionId: string) => {
//     if (sectionId === 'home') {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } else {
//       const element = document.getElementById(sectionId);
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//     setActiveSection(sectionId);
//   };

//   return (
//     <div className="min-h-screen pt-14 bg-[#0f0c29] text-white scroll-smooth">
//       <Navigation scrollToSection={scrollToSection} />
//       <HeroSection scrollToSection={scrollToSection} />
//       <Rooms />
//       <Dishes />
//       <InstagramVideo />
//       <Hotel />   {/* ✅ ADDED HERE */}
//       <BookingForm />
//       <ContactSection />
//     </div>
//   );
// };

// export default Portfolio;

import React, { useState } from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import Rooms from './Rooms';
import InstagramVideo from './InstagramVideo'; // Renamed correctly
import Dishes from './Dishes';
import BookingForm from './BookingForm';
import ContactSection from './ContactSection';



const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen pt-14 bg-[#0f0c29] text-white scroll-smooth">
      {/* Navigation Bar */}
      <Navigation scrollToSection={scrollToSection} />

      {/* Website Sections */}
      <HeroSection scrollToSection={scrollToSection} />
      <Rooms />
      <Dishes /> {/* Special Dishes */}
      <InstagramVideo /> {/* Instagram Videos */}
      
      <BookingForm />
      <ContactSection />
    </div>
  );
};

export default Portfolio;
