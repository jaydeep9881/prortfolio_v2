import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectModal from '../components/ProjectModal';
import config from '../data/config';

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<any>(null);

  return (
    <section id="projects" className="mt-32">
      {/* Section Header - GTA Style */}
      <div className="mb-12">
        <div className="inline-block px-4 py-2 bg-purple-500/20 border-2 border-purple-400 text-purple-400 font-bold text-sm tracking-wider mb-4">
          MISSIONS COMPLETED
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          PROJECTS
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mt-4"></div>
      </div>

      {/* Projects Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {config.projects.map((project, idx) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={idx}
            onOpen={() => {
              setActive(project);
              setOpen(true);
            }}
          />
        ))}
      </div>

      <ProjectModal project={active} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

function ProjectCard({ project, index, onOpen }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Neon border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
      
      {/* Card content */}
      <div className="relative bg-black border-2 border-cyan-400/30 hover:border-cyan-400 p-6 h-full transition-all duration-300">
        {/* Mission number */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center font-bold text-cyan-400">
          {(index + 1).toString().padStart(2, '0')}
        </div>

        <h3 className="text-xl font-bold text-white mb-3 pr-12">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((tech: string) => (
            <span
              key={tech}
              className="px-2 py-1 bg-purple-500/20 border border-purple-400/50 text-purple-400 text-xs font-semibold"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-1 bg-purple-500/20 border border-purple-400/50 text-purple-400 text-xs font-semibold">
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onOpen}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white text-sm font-bold transition-all duration-300"
          >
            VIEW DETAILS
          </button>
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.3) 2px, rgba(0, 255, 255, 0.3) 4px)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}


