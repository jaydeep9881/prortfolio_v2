import { motion } from 'framer-motion';
import config from '../data/config';

export default function Hero() {
  const h = config.hero;
  return (
    <section id="home" className="pt-20 sm:pt-32 pb-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* GTA-style label */}
            <div className="inline-block mb-4 px-4 py-2 bg-cyan-500/20 border-2 border-cyan-400 text-cyan-400 font-bold text-sm tracking-wider">
              MISSION: HIRE ME
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                {h.name}
              </span>
            </h1>
            
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-6 tracking-wide">
              {h.role}
            </div>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl">
              {h.tagline}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold border-2 border-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 hover:scale-105"
              >
                GET IN TOUCH
              </a>
              <a
                href="#projects"
                className="px-8 py-3 bg-black/50 hover:bg-cyan-500/20 border-2 border-purple-400 hover:border-purple-300 text-purple-400 hover:text-purple-300 font-bold transition-all duration-300"
              >
                VIEW PROJECTS
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Profile Image with GTA styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="justify-self-center md:justify-self-end"
        >
          <div className="relative group">
            {/* Neon border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            {/* Image container */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 overflow-hidden border-4 border-cyan-400 bg-black">
              <img 
                src={h.profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                loading="lazy" 
              />
              
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.5) 2px, rgba(0, 255, 255, 0.5) 4px)',
                  }}
                />
              </div>
            </div>
            
            {/* Character stats overlay (GTA style) */}
            <div className="absolute -bottom-4 -right-4 bg-black/90 border-2 border-cyan-400 p-3">
              <div className="text-cyan-400 text-xs font-bold mb-1">STATUS</div>
              <div className="text-white text-sm font-bold">AVAILABLE</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


