import { motion } from 'framer-motion';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  type: string;
  missionNumber: string;
  achievements: string[];
  tech: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'bizmo',
    missionNumber: 'MISSION 02',
    role: 'Junior Developer Intern',
    company: 'Bizmo Technologies Pvt. Ltd',
    location: 'Pune, Maharashtra',
    period: 'Jun 2024 – Dec 2024',
    duration: '6 Months',
    type: 'Full-Stack Development',
    achievements: [
      'Developed and maintained enterprise web applications using Django and React.js, significantly improving end-user responsiveness and feature velocity.',
      'Collaborated with cross-functional engineering teams to architect and implement RESTful APIs, enabling seamless real-time integration between frontend components and backend microservices.',
      'Implemented responsive UI components using Bootstrap and custom styles, enhancing accessibility standards and multi-device compatibility.',
      'Participated actively in peer code reviews, architectural discussions, and debugging sessions, contributing to clean code quality and latency optimization.',
    ],
    tech: ['Django', 'React.js', 'Python', 'REST APIs', 'Bootstrap', 'Git'],
  },
  {
    id: 'a2z',
    missionNumber: 'MISSION 01',
    role: 'Software Developer Intern',
    company: 'A2Z Infotech',
    location: 'Ahmednagar, Maharashtra',
    period: '2022 – 2023',
    duration: '1 Year',
    type: 'Full-Stack Core Foundations',
    achievements: [
      'Delivered live customer-facing modules using HTML5, CSS3, JavaScript, Java, and MySQL, solidifying foundational full-stack software development experience.',
      'Assisted in the architectural development of web applications and collaborated on crafting intuitive, interactive user interfaces.',
      'Contributed to rigorous regression testing, debugging, and resolving critical issues in the codebase, ensuring robust system reliability.',
    ],
    tech: ['Java', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'OOP'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="pt-24 pb-16">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-500/15 border-l-4 border-cyan-400 text-cyan-300 font-hud text-xs font-bold tracking-widest mb-3">
          <span>CAREER TIMELINE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
          PROFESSIONAL{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-cyan-400">
            EXPERIENCE
          </span>
        </h2>
        <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 to-sky-300 mt-4" />
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-cyan-400/40 ml-4 sm:ml-8 space-y-12">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative pl-6 sm:pl-10"
          >
            {/* Glowing Milestone Marker */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#041224] border-2 border-cyan-400 flex items-center justify-center shadow-md shadow-cyan-400/50">
              <span className="w-2.5 h-2.5 bg-cyan-300 rounded-full animate-ping" />
            </div>

            {/* Experience Card */}
            <div className="ocean-card p-6 sm:p-8 relative group">
              {/* Mission Top Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-cyan-400/20">
                <div className="flex items-center gap-3">
                  <span className="font-hud font-bold text-xs bg-cyan-500/20 text-cyan-300 px-2.5 py-1 border border-cyan-400/50">
                    {exp.missionNumber}
                  </span>
                  <span className="text-xs font-hud font-semibold text-gray-400">
                    {exp.type}
                  </span>
                </div>
                <div className="font-hud text-xs sm:text-sm font-bold text-cyan-300">
                  {exp.period} <span className="text-gray-400">({exp.duration})</span>
                </div>
              </div>

              {/* Job Title & Company */}
              <div className="mb-4">
                <h3 className="font-display text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {exp.role}
                </h3>
                <div className="font-hud text-sm font-semibold text-cyan-400 mt-1">
                  {exp.company} • <span className="text-gray-400">{exp.location}</span>
                </div>
              </div>

              {/* Achievements Bullet List */}
              <ul className="space-y-2.5 mb-6 text-sm sm:text-base text-gray-300">
                {exp.achievements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold mt-1 text-xs">▸</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-cyan-400/15">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 bg-black/40 border border-cyan-400/30 text-cyan-300 font-hud text-xs font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}