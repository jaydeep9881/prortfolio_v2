import { useState } from 'react';
import { motion } from 'framer-motion';
import config from '../data/config';
import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const h = config.hero;
  const [copied, setCopied] = useState(false);

  let themeContext;
  try {
    themeContext = useTheme();
  } catch {
    themeContext = null;
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="home" className="pt-20 sm:pt-28 pb-16 relative">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Mission Brief & Heading (7 cols) */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* GTA-style Mission Callout Tag */}
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 bg-primary/20 border-l-4 border-primary text-primary font-hud text-xs sm:text-sm font-bold tracking-widest shadow-sm shadow-primary/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span>CURRENT OBJECTIVE: HIRE FULL-STACK DEVELOPER</span>
            </div>

            {/* Massive Hero Name with Dynamic Theme Tokens */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-highlight">
                {h.name}
              </span>
            </h1>

            {/* Role Title with Theme Tokens */}
            <div className="font-hud text-xl sm:text-2xl font-bold text-accent tracking-wider mb-5 flex items-center gap-3">
              <span className="text-primary">⚡</span>
              <span>{h.role}</span>
              <span className="hidden sm:inline text-xs font-mono text-muted font-normal">
                [Java • Spring Boot • React • Django]
              </span>
            </div>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-gray-200 light:text-slate-700 mb-8 leading-relaxed max-w-2xl font-normal">
              {h.tagline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#contact"
                className="gta-button-primary text-xs sm:text-sm px-6 py-3"
              >
                START MISSION (CONTACT)
              </a>

              <a
                href="#projects"
                className="gta-button-secondary text-xs sm:text-sm px-6 py-3"
              >
                VIEW ARSENAL (PROJECTS)
              </a>

              {themeContext && (
                <button
                  onClick={() => themeContext.setProfileOpen(true)}
                  className="px-4 py-3 bg-surface/80 hover:bg-primary/20 border border-primary/60 hover:border-accent text-accent font-hud text-xs font-bold transition-all flex items-center gap-2"
                >
                  <span>⚙️</span>
                  <span>PROFILE &amp; THEMES</span>
                </button>
              )}
            </div>

            {/* Quick Agent Contact Bar */}
            <div className="mt-8 pt-6 border-t border-primary/25 flex flex-wrap items-center gap-4 text-xs font-hud">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 text-accent hover:text-white bg-surface/80 hover:bg-primary/30 px-3 py-1.5 border border-primary/40 transition-colors"
              >
                <span>📧 {config.contact.email}</span>
                <span className="text-[10px] bg-primary text-black px-1 font-bold">
                  {copied ? 'COPIED!' : 'COPY'}
                </span>
              </button>

              <span className="text-gray-400 hidden sm:inline">•</span>
              <span className="text-gray-300 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                SAVITRIBAI PHULE PUNE UNIVERSITY
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Character Card & Stats Widget (5 cols) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-sm"
          >
            <div className="relative group">
              {/* Dynamic Theme Glow Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-primary via-accent to-highlight rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse" />

              {/* Main Card Container */}
              <div className="relative bg-surface/95 border-2 border-primary p-5 shadow-2xl backdrop-blur-xl">
                {/* Card HUD Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-primary/30 font-hud text-xs">
                  <span className="text-accent font-bold tracking-widest">DOSSIER #JC-9881</span>
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-400/40 font-bold">
                    ONLINE // ACTIVE
                  </span>
                </div>

                {/* Profile Image */}
                <div className="relative w-full h-72 sm:h-80 overflow-hidden border border-accent/50 bg-black">
                  <img
                    src={h.profileImage}
                    alt={h.name}
                    className="w-full h-full object-cover object-top filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  {/* Subtle scanline and grid */}
                  <div className="absolute inset-0 scanline-overlay opacity-25 pointer-events-none" />
                  
                  {/* Status overlay badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-sm border border-primary/50 p-2 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-hud text-accent uppercase">EXPERTISE</div>
                      <div className="text-xs font-bold text-white">Full-Stack Architect</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-hud text-accent uppercase">RANK</div>
                      <div className="text-xs font-bold text-amber-400">LVL 99 MASTER</div>
                    </div>
                  </div>
                </div>

                {/* Character Stat Bars with Dynamic Theme Gradients */}
                <div className="mt-4 space-y-2.5 font-hud text-xs">
                  <div>
                    <div className="flex justify-between text-gray-200 mb-1">
                      <span className="text-accent font-bold">BACKEND (Spring Boot / Java / Django)</span>
                      <span className="text-primary font-mono font-bold">95%</span>
                    </div>
                    <div className="w-full h-2 bg-black border border-primary/30 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '95%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-gray-200 mb-1">
                      <span className="text-accent font-bold">FRONTEND (React.js / Tailwind CSS)</span>
                      <span className="text-primary font-mono font-bold">90%</span>
                    </div>
                    <div className="w-full h-2 bg-black border border-primary/30 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '90%' }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-gray-200 mb-1">
                      <span className="text-accent font-bold">DATABASE &amp; SYSTEM DESIGN</span>
                      <span className="text-primary font-mono font-bold">92%</span>
                    </div>
                    <div className="w-full h-2 bg-black border border-primary/30 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '92%' }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
