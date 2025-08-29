import { Award, BookOpen, Briefcase, User } from "lucide-react";
import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center  bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-16">
          About Me
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <User className="w-8 h-8 text-indigo-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                {" "}
                Who am i?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                I'm a passionate full-stack developer with 3+ years of
                experience creating digital solutions that combine beautiful
                design with powerful functionality. I specialize in HTML, CSS,
                javaScript, typeScript, React, Angular, Node.js, AWS, DynamoDb and modern web
                technologies.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <Briefcase className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                What I do?
              </h3>
              <p className="text-gray-300 leading-relaxed">
                I build responsive web applications, mobile apps, and user
                interfaces that prioritize performance, accessibility, and user
                experience. From concept to deployment, I handle the entire
                development lifecycle.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <BookOpen className="w-8 h-8 text-violet-400 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                Education
              </h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-semibold text-white">
                 Master of Computer Applications
                  </h4>
                  <p className="text-sm">
                  Sir M. Visvesvaraya Institute of Technology • 2018-2020
                  </p>
                </div>
                {/* <div>
                  <h4 className="font-semibold text-white">
                    Full Stack Web Development
                  </h4>
                  <p className="text-sm">Bootcamp Certification • 2021</p>
                </div> */}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <Award className="w-8 h-8 text-indigo-300 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                Achievements
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Led team of 5 developers on enterprise project</li>
                <li>• 50+ successful project deliveries</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
