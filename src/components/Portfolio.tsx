import React, { useState } from 'react'
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import BookingForm from './BookingForm'
import Rooms from './Rooms';
import Dishes from './Dishes';


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
        
        <Rooms />
        <Dishes />
        <BookingForm />
        
  
        
        <ContactSection />
    </div>
  )
}

export default Portfolio