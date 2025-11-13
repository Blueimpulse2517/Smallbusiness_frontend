import React from 'react';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  return (
    <section
  id="home"
  className="pt-10 sm:pt-12 flex flex-col justify-center items-center text-center text-white bg-gradient-to-r from-rose-400 to-fuchsia-500 py-4 sm:py-6 relative z-0"
>
  <h1 className="text-lg sm:text-xl font-bold m-0">
    Welcome to VINTTAGE PARK
  </h1>
  <p className="text-sm sm:text-base m-0">
    Discover luxury, comfort, and unforgettable experiences.
  </p>
</section>
//     <section
//   id="home"
//   className="flex flex-col justify-center items-center text-center text-white bg-gradient-to-r from-rose-400 to-fuchsia-500 py-6 sm:py-10"
// >
//   <h1 className="text-base sm:text-lg font-bold m-0">
//     Welcome to VINTTAGE PARK
//   </h1>
//   <p className="text-xs sm:text-sm m-0">
//     Discover luxury, comfort, and unforgettable experiences.
//   </p>
// </section>

  );
};

export default HeroSection;
