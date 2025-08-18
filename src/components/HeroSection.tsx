import { ChevronDown, Github, Linkedin, Mail, User, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { images } from "./assets";

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  const [typewriterText, setTypeWriterText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);

  const roles = [
    "FullStack Developer",
    "Frontend Developer",
    "Software Developer",
  ];

  useEffect(() => {
    const text = roles[currentRole];
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setTypeWriterText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentRole]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Profile Image */}

          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-1 animate-pulse">
                <img
                  src={images.profilePic}
                  alt="Neha Sharma"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {/* <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-400 rounded-full flex items-center justify-center animate-bounce">
                <Zap className="w-4 h-4 text-slate-900" />
              </div> */}
            </div>
          </div>

          {/* Greeting */}
          {/* <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/30 mb-6">
              👋 Hello, I'm available for work
            </span>
          </div> */}

          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              I'm{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Neha Sharma
              </span>
            </h1>
            <div className="text-2xl md:text-3xl text-gray-300 h-12">
              A{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-semibold">
                {typewriterText}
              </span>
              <span className="animate-pulse">|</span>
            </div>
          </div>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          A developer who loves building clean, responsive, and impactful web applications. I enjoy bringing ideas to life with React, Angular, Node.js, and AWS, creating experiences that are both intuitive and scalable. Beyond code, I’m passionate about learning, solving challenges, and crafting products that make a difference.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400 mb-1">3+</div>
              <div className="text-gray-400 text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">10+</div>
              <div className="text-gray-400 text-sm">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-violet-400 mb-1">
                100K+
              </div>
              <div className="text-gray-400 text-sm">Users Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-300 mb-1">7+</div>
              <div className="text-gray-400 text-sm">Technologies</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-indigo-700 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 rounded-full font-medium transition-all duration-300 hover:border-indigo-400/50"
            >
              Get In Touch
            </button>
          </div>

          <div className="flex justify-center space-x-6 mt-12">
            <a
              href="#"
              className="p-3 rounded-full bg-white/10 text-gray-400 hover:text-indigo-400 hover:bg-indigo-400/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <Github className="w-8 h-8" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-white/10 text-gray-400 hover:text-purple-400 hover:bg-purple-400/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <Linkedin className="w-8 h-8" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-white/10 text-gray-400 hover:text-violet-400 hover:bg-violet-400/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <Mail className="w-8 h-8" />
            </a>
          </div>

          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
