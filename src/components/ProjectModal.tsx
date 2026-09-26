import { motion, AnimatePresence } from 'framer-motion';

export interface ProjectData {
  title: string;
  description: string;
  tech: string[];
  demo: string;
  repo: string;
  images: string[];
  details: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  open: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  if (!open || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl bg-[#041224] border-2 border-cyan-400 shadow-2xl shadow-cyan-500/30 overflow-hidden z-10 my-8 text-white"
          style={{
            clipPath:
              'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
          }}
        >
          {/* Header Bar */}
          <div className="bg-black/80 border-b border-cyan-400/40 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-6 bg-cyan-400 -skew-x-12" />
              <h2 className="font-hud text-base sm:text-lg font-bold tracking-widest text-cyan-400 uppercase">
                MISSION DEBRIEF // {project.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white font-hud font-bold text-sm px-2.5 py-1 border border-cyan-400/30 hover:border-cyan-400 transition-colors"
            >
              ESC ✕
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Project Image Preview */}
            {project.images && project.images.length > 0 && (
              <div className="border border-cyan-400/40 bg-black overflow-hidden shadow-lg shadow-cyan-950/50">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-auto max-h-[360px] object-cover"
                />
              </div>
            )}

            {/* Description & Details */}
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="p-4 bg-cyan-950/30 border-l-4 border-cyan-400 text-sm text-cyan-100 leading-relaxed">
                <span className="font-hud font-bold text-cyan-300 block mb-1 text-xs">
                  ARCHITECTURAL EXECUTION:
                </span>
                {project.details}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <div className="font-hud text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                TECHNOLOGIES UTILIZED:
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-black/60 border border-cyan-400/40 text-cyan-300 font-hud text-xs font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-4 border-t border-cyan-400/20 flex flex-wrap gap-3">
              {project.repo && project.repo !== '#' && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="gta-button-primary text-xs py-2.5 px-6 flex items-center gap-2"
                >
                  <span>🐙</span>
                  <span>VIEW GITHUB REPOSITORY</span>
                </a>
              )}

              {project.demo && project.demo !== '#' && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="gta-button-secondary text-xs py-2.5 px-6 flex items-center gap-2"
                >
                  <span>🌐</span>
                  <span>LIVE DEMO</span>
                </a>
              )}

              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-hud text-xs font-bold border border-white/20 transition-colors ml-auto"
              >
                CLOSE
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
