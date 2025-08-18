import { Award, Briefcase, Code, MapPin } from "lucide-react";
import React, { useState } from "react";

interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  logo: string;
}

const ExperienceSection: React.FC = () => {
  const [activeExperience, setActiveExperienc] = useState(0);
  const experiences: Experience[] = [
    {
      id: 1,
      company: "1729 Digital",
      position: "Senior Developer",
      duration: "2023 - Present",
      location: "Bangalore",
      description:
        "Lead a team of 8 developers in building scalable web applications serving 100K+ users. Architected microservices infrastructure and implemented CI/CD pipelines.",
      achievements: [
        "Reduced application load time by 40% through performance optimization",
        "Led migration from monolith to microservices architecture",
        " Designed and implemented complex UI components using React and Angular with TypeScript and RxJS for real-time interactions.",
        "Built secure authentication flows with JWT and OAuth 2.0.",
        "Resolved multiple Frontend and Backend issues, significantly boosting application stability and responsiveness.",
        "  Delivered responsive, accessible web apps adhering to WCAG standards with cross-browser compatibility.",
        "Proficient in frontend build tools and version control systems like Webpack and Git.",
        "Built Prolish, an AI-powered LinkedIn post classifier with scoring logic using React, Redux, and Firebase, automating the previously manual process and improving accuracy",
      ],
      technologies: ["React", "Angular", "Node.js", "TypeScript", "AWS"],
      logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
    },
    {
      id: 2,
      company: "Techpearl Software Pvt. Ltd.",
      position: "Software Developer",
      duration: "2021 - 2023",
      location: "Bangalore, India",
      description:
        "Developed responsive web applications for Fortune 500 clients. Specialized in React ecosystem and modern frontend architectures.",
      achievements: [
        "Built enterprise-grade web applications using Angular and React, implementing clean, maintainable, and scalable code.",
        " Developed the Employee Management System with dashboards, search, filters, and CRUD operations using React, Redux, javascript.",
        " Created WindowSwap, integrating third-party services, Stripe, Google Maps, Mixpanel,Drag-drop video upload and Vimeo API using React, typeScript, Node.js.",
        "Developed Bravura Event Platform, using Angular, RxJs, typeScript, Node and DynamoDB improving planning efficiency and performance through Lazy loading, code-splitting, and multiple feature implementations.",
        " Built PWA support with infinite scroll and responsive design, driving a 50% increase in user engagement and boosting mobile user engagement by 15%. ",
        "Deployed serverless backend APIs using Node.js and AWS Lambda, improving scalability and reducing infrastructure overhead.",
        "Deployed an AWS-hosted application with 99.9% uptime, praised by clients for its usability and performance in production.",
        "  Contributed to CI/CD pipelines, enabling continuous integration and automated deployment of frontend builds",
      ],
      technologies: [
        "React",
        "Vue.js",
        "TypeScript",
        "Tailwind CSS",
        "GraphQL",
        "Jest",
      ],
      logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
    },
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-bold text-center  bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-16">
          Proffesional Experience
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Experience Timeline */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  onClick={() => setActiveExperienc(index)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeExperience == index
                      ? "bg-indigo-600/20 border-x-indigo-400 border-2"
                      : "bg-white/10 border border-white/20 hover:bg-white/20 "
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-white font-semibold">
                        {exp.company}
                      </h3>
                      <p className="font-sm text-gray-300">{exp.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Details */}

          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 min-h-[500px]">
              {experiences[activeExperience] && (
                <div className="space-y-6">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {experiences[activeExperience].position}
                      </h3>

                      <div className="flex items-center gap-4 text-gray-300 mb-4">
                        <span className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          {experiences[activeExperience].company}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {experiences[activeExperience].location}
                        </span>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-indigo-600/20 text-indigo-300 rounded-full text-sm font-medium border border-indigo-600/30">
                      {experiences[activeExperience].duration}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {experiences[activeExperience].description}
                  </p>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-indigo-500">
                        Key Achievements
                      </Award>
                    </h4>
                    <ul className="space-y-2">
                      {experiences[activeExperience].achievements.map(
                        (achievement, index) => (
                          <li
                            key={index}
                            className="text-gray-300 flex items-start gap-3"
                          >
                            <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0">
                              {" "}
                            </div>
                            {achievement}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Code className="w-5 h-5 text-purple-400" /> Technologies
                      Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experiences[activeExperience].technologies.map(
                        (tech) => (
                          <div
                            key={tech}
                            className="px-3 py-1 text-sm font-medium bg-purple-600/20 text-purple-300 rounded-full border border-purple-600/30"
                          >
                            {tech}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
