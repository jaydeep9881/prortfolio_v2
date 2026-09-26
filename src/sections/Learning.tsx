import { motion } from 'framer-motion';
import config from '../data/config';

interface LabTrack {
  title: string;
  focus: string;
  icon: string;
  progress: number;
  tags: string[];
}

const TRACKS: LabTrack[] = [
  {
    title: 'Autonomous AI Agents',
    focus: 'Multi-agent orchestration, tool use, MCP protocol integrations, and automated code generation workflows.',
    icon: '🤖',
    progress: 85,
    tags: ['Agentic Workflows', 'MCP', 'LLMs', 'Prompt Engineering'],
  },
  {
    title: 'Machine Learning',
    focus: 'Model fine-tuning, neural networks, supervised classification, and mathematical algorithmic foundations.',
    icon: '🧠',
    progress: 80,
    tags: ['PyTorch', 'Scikit-learn', 'Algorithms', 'Deep Learning'],
  },
  {
    title: 'Data Science & Analytics',
    focus: 'Large-scale exploratory data analysis, Pandas pipelines, statistical inference, and visual dashboards.',
    icon: '📊',
    progress: 78,
    tags: ['Pandas', 'NumPy', 'Data Pipelines', 'Statistical Modeling'],
  },
  {
    title: 'Advanced Web Design & 3D',
    focus: 'Interactive 3D WebGL scenes, shader lighting, glassmorphism, responsive micro-animations, and UX accessibility.',
    icon: '💎',
    progress: 90,
    tags: ['Three.js', 'Framer Motion', 'Tailwind CSS', 'A11y'],
  },
];

export default function Learning() {
  const learning = config.learning;
  if (!learning) return null;

  return (
    <section id="learning" className="pt-24 pb-16">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/20 border-l-4 border-primary text-primary font-hud text-xs font-bold tracking-widest mb-3">
          <span>R&amp;D INITIATIVES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
          RESEARCH &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-highlight">
            ADVANCED LEARNING
          </span>
        </h2>
        <div className="w-28 h-1 bg-gradient-to-r from-primary to-accent mt-4" />
      </div>

      {/* Grid of Learning Tracks */}
      <div className="grid sm:grid-cols-2 gap-6">
        {TRACKS.map((track, idx) => (
          <motion.div
            key={track.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="ocean-card p-6 relative group border border-primary/30 hover:border-accent transition-all"
          >
            {/* Header with Icon & Progress */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 bg-black/50 border border-primary/40">
                  {track.icon}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-accent transition-colors">
                    {track.title}
                  </h3>
                  <span className="font-hud text-xs text-accent font-semibold">
                    ACTIVE SPRINT // STATUS: STUDYING
                  </span>
                </div>
              </div>

              <span className="font-mono text-xs font-bold text-primary bg-primary/20 px-2.5 py-1 border border-primary/40">
                {track.progress}%
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              {track.focus}
            </p>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-black/60 border border-primary/30 overflow-hidden mb-5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${track.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-gradient-to-r from-primary to-accent"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {track.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 bg-black/40 border border-primary/25 text-accent font-hud text-[11px]"
                >
                  #{t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
