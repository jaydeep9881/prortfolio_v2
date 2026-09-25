import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ZonePanelProps {
  zone: any;
  onClose: () => void;
}

export default function ZonePanel({ zone, onClose }: ZonePanelProps) {
  if (!zone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-cyan-400 max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b-2 border-cyan-400 pb-4">
            <div>
              <div className="text-cyan-400 text-sm font-bold mb-1">MISSION BRIEFING</div>
              <h2 className="text-4xl font-bold text-white">{zone.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-cyan-400 text-2xl font-bold px-4 py-2 border border-white hover:border-cyan-400 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Content based on zone type */}
          {zone.id === 'projects' && <ProjectsContent data={zone.data} />}
          {zone.id === 'skills' && <SkillsContent data={zone.data} />}
          {zone.id === 'about' && <AboutContent data={zone.data} />}
          {zone.id === 'contact' && <ContactContent data={zone.data} />}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-cyan-400/30 text-center">
            <p className="text-gray-400 text-sm">Press ESC or click outside to close</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectsContent({ data }: any) {
  return (
    <div className="space-y-6">
      {data.map((project: any, idx: number) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-black/50 border border-cyan-400/30 p-6 hover:border-cyan-400 transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <div className="text-cyan-400 text-sm">MISSION #{idx + 1}</div>
          </div>
          <p className="text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-cyan-400/20 text-cyan-400 text-sm border border-cyan-400/50">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {project.repo !== '#' && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-colors"
              >
                VIEW CODE
              </a>
            )}
            {project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-cyan-400 text-cyan-400 font-bold hover:bg-cyan-400 hover:text-black transition-colors"
              >
                LIVE DEMO
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SkillsContent({ data }: any) {
  return (
    <div className="space-y-6">
      {Object.entries(data).map(([category, skills]: [string, any], idx) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-black/50 border border-cyan-400/30 p-6"
        >
          <h3 className="text-xl font-bold text-cyan-400 mb-4 uppercase">{category}</h3>
          <div className="flex flex-wrap gap-3">
            {Array.isArray(skills) && skills.map((skill: string, i: number) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 border border-cyan-400/50 text-white font-semibold"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AboutContent({ data }: any) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-black/50 border border-cyan-400/30 p-6"
      >
        <div className="text-cyan-400 text-sm font-bold mb-2">CHARACTER PROFILE</div>
        <h3 className="text-2xl font-bold text-white mb-4">{data.roleLine}</h3>
        <p className="text-gray-300 mb-4 leading-relaxed">{data.summary1}</p>
        <p className="text-gray-300 leading-relaxed">{data.summary2}</p>
      </motion.div>
    </div>
  );
}

function ContactContent({ data }: any) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-black/50 border border-cyan-400/30 p-6"
      >
        <div className="text-cyan-400 text-sm font-bold mb-4">CONNECT WITH ME</div>
        <div className="space-y-4">
          <a
            href={`mailto:${data.email}`}
            className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors text-lg"
          >
            <span className="text-2xl">📧</span>
            <span>{data.email}</span>
          </a>
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors text-lg"
          >
            <span className="text-2xl">💻</span>
            <span>GitHub Profile</span>
          </a>
          <a
            href={data.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors text-lg"
          >
            <span className="text-2xl">💼</span>
            <span>LinkedIn Profile</span>
          </a>
          <a
            href={data.resumeUrl}
            download
            className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors text-lg"
          >
            <span className="text-2xl">📄</span>
            <span>Download Resume</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
