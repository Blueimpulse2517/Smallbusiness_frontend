import React, { useState } from 'react'
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ExperienceSection from './ExperienceSection';
import SkillsSection from './SkillsSection';
import ProjectSection from './ProjectSection';
import ContactSection from './ContactSection'



const Portfolio: React.FC  = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [activeSection, setActiveSection] = useState('Home')

const scrollToSection=(sectionId:string)=>{

const element = document.getElementById(sectionId);

if(element){
    element.scrollIntoView({behavior :'smooth'});
    setActiveSection(sectionId);
    setIsMenuOpen(false)
}

}

  return (
    <div className='min-h-screen bg-[#0f0c29] text-white '>
        <Navigation 
        isMenuOpen = {isMenuOpen} 
        setIsMenuOpen = {setIsMenuOpen}
        activeSection = {activeSection} 
        scrollToSection={scrollToSection}
        />
        <HeroSection   scrollToSection={scrollToSection} />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectSection />
        <ContactSection />
    </div>
  )
}

export default Portfolio