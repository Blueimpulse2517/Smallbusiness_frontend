import { ExternalLink, Github } from "lucide-react";
import React, { useState } from "react";

interface Projects {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
}

const ProjectSection: React.FC = () => {
  const projects: Projects[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with React, Node.js, and MongoDB",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "fullstack",
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Beautiful task management application with real-time collaboration",
      image:
        "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React", "Firebase", "Tailwind CSS"],
      category: "backend",
      githubUrl: "#",
      liveUrl: "#",
    },
  ];

  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
      <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
      
         <h2 className="text-4xl font-bold text-center  bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-16">
        Projects
        </h2>
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'frontend', 'fullstack','backend', 'design'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 group hover:scale-105 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <a 
                      href={project.githubUrl}
                      className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a 
                      href={project.liveUrl}
                      className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-indigo-600/20 text-indigo-300 rounded-full border border-indigo-600/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
