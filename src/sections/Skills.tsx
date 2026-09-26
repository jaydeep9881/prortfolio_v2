import { useState } from 'react';
import { motion } from 'framer-motion';

interface SkillItem {
  name: string;
  level: number;
  badge: string;
}

const SKILL_DATA: Record<string, SkillItem[]> = {
  Backend: [
    { name: 'Java (Core & Advanced)', level: 95, badge: '☕' },
    { name: 'Spring Boot & Microservices', level: 92, badge: '🍃' },
    { name: 'Hibernate & JPA', level: 88, badge: '🗄️' },
    { name: 'Python', level: 90, badge: '🐍' },
    { name: 'Django & DRF', level: 88, badge: '⚡' },
    { name: 'RESTful API Architecture', level: 94, badge: '🔌' },
  ],
  Frontend: [
    { name: 'React.js', level: 92, badge: '⚛️' },
    { name: 'JavaScript (ES6+)', level: 90, badge: '💛' },
    { name: 'HTML5 & Semantic Web', level: 95, badge: '🌐' },
    { name: 'Tailwind CSS', level: 92, badge: '🎨' },
    { name: 'CSS3 / Modern Layouts', level: 88, badge: '✨' },
    { name: 'Bootstrap', level: 90, badge: '🅱️' },
  ],
  'Database & Tools': [
    { name: 'MySQL', level: 92, badge: '🐬' },
    { name: 'PostgreSQL', level: 88, badge: '🐘' },
    { name: 'Git & GitHub Version Control', level: 94, badge: '🐙' },
    { name: 'Docker & Containerization', level: 85, badge: '🐳' },
    { name: 'Postman API Testing', level: 92, badge: '🚀' },
    { name: 'VS Code & Linux CLI', level: 90, badge: '💻' },
  ],
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const categories = ['All', 'Backend', 'Frontend', 'Database & Tools'];

  const getFilteredCategories = () => {
    if (activeTab === 'All') return Object.keys(SKILL_DATA);
    return [activeTab];
  };

  return (
    <section id="skills" className="pt-24 pb-16">
      {/* Section Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/20 border-l-4 border-primary text-primary font-hud text-xs font-bold tracking-widest mb-3">
            <span>VICE CITY SKILL MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            TECHNICAL{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-highlight">
              ARSENAL
            </span>
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-primary to-accent mt-4" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 font-hud text-xs font-bold">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 border transition-all duration-200 ${
                activeTab === cat
                  ? 'border-accent bg-accent/25 text-white shadow-md shadow-accent/30'
                  : 'border-primary/25 bg-surface/80 text-gray-300 hover:border-accent hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredCategories().map((catKey, catIdx) => (
          <motion.div
            key={catKey}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            className="ocean-card p-6 relative group"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-primary/20">
              <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <span className="text-primary">
                  {catKey.includes('Backend') ? '⚙️' : catKey.includes('Frontend') ? '🎨' : '🗄️'}
                </span>
                {catKey}
              </h3>
              <span className="font-hud text-xs text-accent bg-accent/15 px-2 py-0.5 border border-accent/40">
                {SKILL_DATA[catKey]?.length} SKILLS
              </span>
            </div>

            {/* Skill Bars */}
            <div className="space-y-4">
              {SKILL_DATA[catKey]?.map((skill, sIdx) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-hud font-semibold">
                    <span className="text-gray-200 flex items-center gap-2">
                      <span>{skill.badge}</span>
                      <span>{skill.name}</span>
                    </span>
                    <span className="text-accent font-mono font-bold">{skill.level}%</span>
                  </div>

                  {/* Level Bar */}
                  <div className="w-full h-2 bg-black/60 border border-primary/25 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: sIdx * 0.08 }}
                      className="h-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
