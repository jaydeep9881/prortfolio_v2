import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../data/config';
import { useTheme } from '../context/ThemeContext';

type HeaderProps = {
  theme?: string;
  setTheme?: (_t: any) => void;
};

export default function Header({ theme: propTheme, setTheme: propSetTheme }: HeaderProps) {
  let themeContext;
  try {
    themeContext = useTheme();
  } catch {
    themeContext = null;
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeTheme = themeContext?.theme || propTheme || 'vice-ocean';
  const cycleTheme = () => {
    if (themeContext) {
      themeContext.cycleTheme();
    } else if (propSetTheme) {
      propSetTheme(activeTheme === 'dark' || activeTheme === 'vice-ocean' ? 'light' : 'dark');
    }
  };

  const navLinks = [
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'LEARNING', href: '#learning' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#041224]/85 border-b border-cyan-400/40 shadow-lg shadow-cyan-950/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Left: GTA Vice City Logo / Callout */}
        <div className="flex items-center gap-3">
          <a href="#home" className="focus-ring group flex items-center gap-2.5">
            <span className="w-2.5 h-6 bg-cyan-400 transform -skew-x-12 group-hover:bg-cyan-300 transition-colors" />
            <div className="flex flex-col">
              <span className="font-display font-black text-xl sm:text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-cyan-400 group-hover:from-white group-hover:to-cyan-300 transition-all">
                {config.site.title}
              </span>
              <span className="font-hud text-[9px] uppercase tracking-widest text-cyan-400/80 -mt-1 hidden sm:block">
                VICE OCEAN // FULL-STACK
              </span>
            </div>
          </a>
        </div>

        {/* Middle: Desktop Navigation */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7 text-xs font-hud font-bold tracking-widest">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-300 hover:text-cyan-300 focus-ring py-1 relative group transition-colors"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-sky-300 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right: Controls & Profile Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Font Size Switcher */}
          {themeContext && (
            <button
              onClick={themeContext.cycleTextSize}
              title={`Adjust Text Size: Current ${themeContext.textSize.toUpperCase()}`}
              aria-label="Adjust text size"
              className="hidden sm:flex items-center justify-center px-2 py-1 bg-black/40 hover:bg-cyan-500/20 border border-cyan-400/40 hover:border-cyan-400 text-cyan-300 font-hud text-xs font-bold transition-all"
            >
              A{themeContext.textSize === 'large' ? '+' : themeContext.textSize === 'xlarge' ? '++' : ''}
            </button>
          )}

          {/* Quick Theme Toggle */}
          <button
            aria-label="Toggle theme"
            title="Toggle theme"
            onClick={cycleTheme}
            className="p-2 sm:px-3 sm:py-1.5 bg-black/40 hover:bg-cyan-500/20 border border-cyan-400/40 hover:border-cyan-400 text-cyan-300 font-hud text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <span>
              {activeTheme === 'vice-light' || activeTheme === 'light' ? '☀️' : activeTheme === 'vice-neon' ? '🌆' : activeTheme === 'vice-dark' ? '🌃' : '🌊'}
            </span>
            <span className="hidden md:inline font-mono text-[11px] uppercase">
              {activeTheme === 'vice-light' || activeTheme === 'light' ? 'LIGHT' : activeTheme === 'vice-neon' ? 'NEON' : activeTheme === 'vice-dark' ? 'DARK' : 'OCEAN'}
            </span>
          </button>

          {/* Resume Download CTA (Satisfies /resume/i test) */}
          <a
            href={config.contact.resumeUrl}
            download
            className="px-3 sm:px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white font-hud text-xs font-bold border border-cyan-300 shadow-md shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all duration-200"
          >
            RESUME
          </a>

          {/* Profile HUD Trigger Button */}
          {themeContext && (
            <button
              onClick={() => themeContext.setProfileOpen(true)}
              title="Open Profile & Settings HUD"
              aria-label="Open Agent Profile"
              className="relative p-0.5 border-2 border-cyan-400 hover:border-white transition-all group rounded-none"
            >
              <img
                src={config.hero.profileImage}
                alt="Jaydeep Profile"
                className="w-7 h-7 sm:w-8 sm:h-8 object-cover"
              />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-black animate-pulse" />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 text-cyan-400 hover:text-white border border-cyan-400/40 hover:border-cyan-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#041224]/95 border-b border-cyan-400/40 px-6 py-4 space-y-3 font-hud text-sm"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-200 hover:text-cyan-400 border-b border-cyan-400/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
            {themeContext && (
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    themeContext.setProfileOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold text-center text-xs"
                >
                  ⚙️ THEME &amp; PROFILE HUD
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
