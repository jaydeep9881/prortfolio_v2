import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectModal, { ProjectData } from '../components/ProjectModal';
import config from '../data/config';

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ProjectData | null>(null);

  const handleOpen = (project: any) => {
    setActive(project);
    setOpen(true);
  };

  return (
    <section id="projects" className="pt-24 pb-16">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/15 border-l-4 border-cyan-400 text-cyan-300 font-hud text-xs font-bold tracking-widest mb-3">
          <span>VICE CITY PORTFOLIO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
          COMPLETED{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-cyan-400">
            MISSIONS
          </span>
        </h2>
        <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 to-sky-300 mt-4" />
      </div>

      {/* Projects Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {config.projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative"
          >
            {/* Ambient card glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-sky-600 rounded-lg blur-sm opacity-0 group-hover:opacity-60 transition duration-300" />

            {/* Card Content */}
            <div className="relative ocean-card overflow-hidden flex flex-col h-full border border-cyan-400/40 group-hover:border-cyan-400 transition-all duration-300">
              {/* Card Image Preview Banner */}
              <div className="relative w-full h-48 sm:h-56 bg-black overflow-hidden border-b border-cyan-400/30">
                {project.images && project.images[0] ? (
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-hud text-cyan-400 text-xl font-bold bg-[#041224]">
                    MISSION PROJECT
                  </div>
                )}

                {/* Scanline overlay */}
                <div className="absolute inset-0 scanline-overlay opacity-25 pointer-events-none" />

                {/* Mission Number Ribbon */}
                <div className="absolute top-3 left-3 bg-[#041224]/90 border border-cyan-400 px-3 py-1 font-hud text-xs font-bold text-cyan-300">
                  MISSION 0{idx + 1}
                </div>

                {/* Status Stamp */}
                <div className="absolute top-3 right-3 bg-cyan-500 text-black font-hud text-[11px] font-black px-2.5 py-0.5 tracking-wider">
                  PASSED ★★★
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 bg-black/50 border border-cyan-400/30 text-cyan-300 font-hud text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-3 border-t border-cyan-400/20">
                    <button
                      onClick={() => handleOpen(project)}
                      className="flex-1 gta-button-primary text-xs py-2.5"
                    >
                      VIEW DOSSIER
                    </button>

                    {project.repo && project.repo !== '#' && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2.5 bg-black/60 hover:bg-cyan-500/20 border border-cyan-400/40 hover:border-cyan-400 text-cyan-300 font-hud text-xs font-bold transition-all flex items-center gap-1.5"
                        title="View GitHub Repository"
                      >
                        <span>CODE</span>
                        <span>➔</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <ProjectModal project={active} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
