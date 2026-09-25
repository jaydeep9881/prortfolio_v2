import { motion } from 'framer-motion';
import config from '../data/config';

export default function Skills() {
  const s = config.skills;
  return (
    <section id="skills" className="mt-32">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-block px-4 py-2 bg-cyan-500/20 border-2 border-cyan-400 text-cyan-400 font-bold text-sm tracking-wider mb-4">
          SKILL TREE
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
          ABILITIES
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mt-4"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <SkillGroup title="Frontend" items={s.frontend} icon="🎨" color="cyan" />
        <SkillGroup title="Backend" items={s.backend} icon="⚙️" color="purple" />
        <SkillGroup title="Tools" items={s.tools} icon="🛠️" color="pink" />
      </div>
    </section>
  );
}

function SkillGroup({ title, items, icon, color }: { title: string; items: string[]; icon: string; color: string }) {
  const borderColor = color === 'cyan' ? 'border-cyan-400' : color === 'purple' ? 'border-purple-400' : 'border-pink-400';
  const textColor = color === 'cyan' ? 'text-cyan-400' : color === 'purple' ? 'text-purple-400' : 'text-pink-400';
  const bgColor = color === 'cyan' ? 'bg-cyan-500/20' : color === 'purple' ? 'bg-purple-500/20' : 'bg-pink-500/20';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      {/* Neon glow */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-${color}-400 to-${color}-600 rounded opacity-0 group-hover:opacity-75 transition duration-300 blur`}></div>
      
      <div className={`relative bg-black border-2 ${borderColor} p-6`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`text-3xl ${textColor}`}>{icon}</div>
          <h3 className={`text-xl font-bold ${textColor} uppercase tracking-wide`}>{title}</h3>
        </div>

        {/* Skills list */}
        <ul className="space-y-2">
          {items.map((skill, idx) => (
            <motion.li
              key={skill}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center gap-2 group/item"
            >
              <div className={`w-2 h-2 ${bgColor} ${borderColor} border`}></div>
              <span className="text-gray-300 group-hover/item:text-white transition-colors">{skill}</span>
            </motion.li>
          ))}
        </ul>

        {/* Scanlines */}
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


