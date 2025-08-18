import { Cloud, Code, Cpu, FigmaIcon, GitBranch, Layers, Palette, Server, Zap } from 'lucide-react'
import React from 'react'

interface Skills {
  name: string,
  icon:React.ReactNode,
  level:number

}

const SkillsSection: React.FC = () => {

  const technologies =[
     { name: 'HTML', icon: <Code className="w-6 h-6" />, color: 'text-blue-400' },
      { name: 'CSS', icon: <Code className="w-6 h-6" />, color: 'text-blue-400' },
    { name: 'TypeScript', icon: <Zap className="w-6 h-6" />, color: 'text-blue-500' },
      { name: 'javaScript', icon: <Palette className="w-6 h-6" />, color: 'text-cyan-400' },
       { name: 'React', icon: <Code className="w-6 h-6" />, color: 'text-blue-400' },
    { name: 'Node.js', icon: <Server className="w-6 h-6" />, color: 'text-green-500' },
    { name: 'MongoDB', icon: <Layers className="w-6 h-6" />, color: 'text-green-600' },
     { name: 'DynamoDB', icon: <Layers className="w-6 h-6" />, color: 'text-green-600' },
    { name: 'AWS', icon: <Cloud className="w-6 h-6" />, color: 'text-orange-400' },
    { name: 'Git', icon: <GitBranch className="w-6 h-6" />, color: 'text-orange-500' },
    { name: 'Figma', icon: <FigmaIcon className="w-6 h-6" />, color: 'text-purple-400' },
    { name: 'Tailwind CSS', icon: <Palette className="w-6 h-6" />, color: 'text-cyan-400' },
  ]
  return (
<section id='skills' className='px-4 py-20'>
<div className='max-w-6xl mx-auto'>
  <h2 className="text-4xl font-bold text-center  bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-16">
          Skills & Expertise
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6'>
{
  technologies.map((tech) =>(
<div key={tech.name} className='bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 hover:border-indigo-400/50 transition-all duration-300 group hover:scale-105:'>
<div className={`${tech.color} mb-2 flex justify-center group-hover:scale-110 transition-transform duration-300`}>{tech.icon}</div>
<span className='text-white font-medium text-sm'>{tech.name}</span>
</div>

  ))
}
        </div>
</div>
</section>
  )
}

export default SkillsSection