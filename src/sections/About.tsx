import { motion } from 'framer-motion';
import config from '../data/config';

export default function About() {
  const a = config.about;

  const STATS = [
    { label: 'EDUCATION', value: 'M.Sc. Computer Science', sub: 'Savitribai Phule Pune University' },
    { label: 'CORE SPECIALTY', value: 'Backend & Distributed APIs', sub: 'Spring Boot • Django • Java' },
    { label: 'FRONTEND MASTERY', value: 'Modern React.js & WebGL', sub: 'Interactive Responsive Systems' },
    { label: 'LOCATION BASE', value: 'Pune, Maharashtra', sub: 'Open to Remote & Global Relocation' },
  ];

  return (
    <section id="about" className="pt-24 pb-16">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/20 border-l-4 border-primary text-primary font-hud text-xs font-bold tracking-widest mb-3">
          <span>DEVELOPER PROFILE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
          ABOUT{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-highlight">
            JAYDEEP CHAUDHARI
          </span>
        </h2>
        <div className="w-28 h-1 bg-gradient-to-r from-primary to-accent mt-4" />
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Narrative Biography (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 ocean-card p-6 sm:p-8 space-y-6"
        >
          <div className="border-b border-primary/20 pb-4">
            <span className="font-hud text-xs font-bold text-accent tracking-wider">
              OPERATIONAL BRIEFING
            </span>
            <h3 className="font-display text-2xl font-bold text-white mt-1">
              Building High-Performance, Scalable Software Systems
            </h3>
          </div>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            {a.summary1}
          </p>

          <p className="text-base text-gray-300 leading-relaxed">
            {a.summary2}
          </p>

          <div className="p-4 bg-primary/10 border-l-4 border-primary text-accent text-sm font-hud font-semibold">
            {a.roleLine}
          </div>

          {/* Quick CTA */}
          <div className="pt-2 flex flex-wrap gap-4">
            <a
              href={config.contact.resumeUrl}
              download
              className="gta-button-primary text-xs py-3 px-6"
            >
              DOWNLOAD OFFICIAL CV / RESUME
            </a>
            <a
              href="#contact"
              className="gta-button-secondary text-xs py-3 px-6"
            >
              SEND DIRECT MESSAGE
            </a>
          </div>
        </motion.div>

        {/* Highlight Stats Cards (5 cols) */}
        <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="ocean-card p-5 border-l-4 border-primary hover:border-accent transition-colors"
            >
              <div className="font-hud text-[11px] font-bold text-accent tracking-widest uppercase mb-1">
                {stat.label}
              </div>
              <div className="font-display text-lg sm:text-xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
