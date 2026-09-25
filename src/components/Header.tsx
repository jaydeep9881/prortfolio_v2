import { motion } from 'framer-motion';
import config from '../data/config';

type HeaderProps = {
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
};

export default function Header({ theme, setTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b-2 border-cyan-400/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo with GTA styling */}
        <a href="#home" className="font-bold text-2xl focus-ring group">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text group-hover:from-pink-400 group-hover:via-cyan-400 group-hover:to-purple-400 transition-all duration-300">
            {config.site.title}
          </span>
        </a>
        
        {/* Navigation with neon effect */}
        <nav aria-label="Primary" className="hidden md:flex gap-8 text-sm font-semibold">
          <a 
            className="text-gray-300 hover:text-cyan-400 focus-ring transition-colors relative group" 
            href="#experience"
          >
            EXPERIENCE
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
          </a>
          <a 
            className="text-gray-300 hover:text-cyan-400 focus-ring transition-colors relative group" 
            href="#skills"
          >
            SKILLS
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
          </a>
          <a 
            className="text-gray-300 hover:text-cyan-400 focus-ring transition-colors relative group" 
            href="#projects"
          >
            PROJECTS
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
          </a>
          <a 
            className="text-gray-300 hover:text-cyan-400 focus-ring transition-colors relative group" 
            href="#about"
          >
            ABOUT
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
          </a>
          <a 
            className="text-gray-300 hover:text-cyan-400 focus-ring transition-colors relative group" 
            href="#contact"
          >
            CONTACT
            <span className="absolute -bottom-1 left-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
          </a>
        </nav>
        
        {/* CTA Buttons with GTA styling */}
        <div className="flex items-center gap-3">
          <a
            href={config.contact.resumeUrl}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold border-2 border-cyan-400 focus-ring transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70"
            download
          >
            DOWNLOAD CV
          </a>
          
          <motion.button
            aria-label="Toggle theme"
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="px-4 py-2 bg-black/50 hover:bg-cyan-500/20 border-2 border-cyan-400/50 hover:border-cyan-400 text-cyan-400 font-bold focus-ring transition-all duration-300"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </motion.button>
        </div>
      </div>
    </header>
  );
}


