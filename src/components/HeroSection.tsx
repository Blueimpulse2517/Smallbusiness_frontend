import React from 'react';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  return (
    <section
      id="home"
      className="flex flex-col justify-center items-center text-center text-white px-4 py-20 bg-gradient-to-r from-rose-400 to-fuchsia-500"
    >
<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
  Welcome to VINTTAGE PARK
</h1>
<p className="text-base sm:text-lg md:text-lg max-w-md">
  Discover luxury, comfort, and unforgettable experiences.
</p>

      {/* <button
        onClick={() => scrollToSection('booking')}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition"
      >
        Book Your Stay
      </button> */}
    </section>
  );
};

export default HeroSection;
