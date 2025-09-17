import { ChevronDown, Github, Linkedin, Mail, User, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
//import { images } from "./assets";

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  

  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                         VINTTAGE PARK 
        
        </h1>
        <p className="text-xl md:text-2xl text-blue-100">
          A home away from home
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
