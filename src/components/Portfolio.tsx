import React, { useState } from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import Video from './Video'; // ✅ Default export assumed
import BookingForm from './BookingForm';
import Rooms from './Rooms';
import Dishes from './Dishes';
import ContactSection from './ContactSection';

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection(sectionId);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] text-white"> 
      <HeroSection scrollToSection={scrollToSection} />
      <Rooms />
      <Video />
      <Dishes />
      <BookingForm />
      <ContactSection />
    </div>
  );
};

export default Portfolio;

