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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-surface/90 border-b border-primary/40 shadow-lg shadow-black/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left: GTA Vice City Logo / Callout */}
        <div className="flex items-center gap-3">
          <a href="#home" className="focus-ring group flex items-center gap-2.5">
            <span className="w-2.5 h-6 bg-accent transform -skew-x-12 group-hover:bg-primary transition-colors" />
            <div className="flex flex-col">
              <span className="font-display font-black text-xl sm:text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-highlight group-hover:from-white group-hover:to-accent transition-all">
                {config.site.title}
              </span>
              <span className="font-hud text-[9px] uppercase tracking-widest text-accent/80 -mt-1 hidden sm:block">
                VICE CITY // {themeContext?.currentThemeConfig.name.toUpperCase() || 'PORTFOLIO'}
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
              className="text-gray-300 hover:text-accent focus-ring py-1 relative group transition-colors"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right: Controls & Profile Trigger */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Blue Overlay Removal Toggle */}
          {themeContext && (
            <button
              onClick={themeContext.toggleBgOverlay}
              title={`Blue Overlay: ${themeContext.bgOverlay.toUpperCase()} (Click to toggle / remove blue tint layer)`}
              aria-label="Toggle background overlay"
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 border font-hud text-xs font-bold transition-all ${
                themeContext.bgOverlay === 'none'
                  ? 'border-green-400 bg-green-500/20 text-green-300 hover:border-green-300'
                  : 'border-accent/40 bg-black/40 text-accent hover:border-accent'
              }`}
            >
              <span>{themeContext.bgOverlay === 'none' ? '☀️' : '🎭'}</span>
              <span className="font-mono text-[10px] tracking-wide">
                BG TINT: {themeContext.bgOverlay === 'none' ? 'OFF' : themeContext.bgOverlay.toUpperCase()}
              </span>
            </button>
          )}

          {/* Quick Font Size Switcher */}
          {themeContext && (
            <button
              onClick={themeContext.cycleTextSize}
              title={`Adjust Text Size: Current ${themeContext.textSize.toUpperCase()}`}
              aria-label="Adjust text size"
              className="hidden sm:flex items-center justify-center px-2 py-1 bg-black/40 hover:bg-primary/20 border border-primary/40 hover:border-accent text-accent font-hud text-xs font-bold transition-all"
            >
              A{themeContext.textSize === 'large' ? '+' : themeContext.textSize === 'xlarge' ? '++' : ''}
            </button>
          )}

          {/* Quick Theme Toggle */}
          <button
            aria-label="Toggle theme"
            title="Toggle theme"
            onClick={cycleTheme}
            className="p-1.5 sm:px-3 sm:py-1.5 bg-black/40 hover:bg-primary/20 border border-primary/40 hover:border-accent text-accent font-hud text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <span>
              {activeTheme === 'vice-light' || activeTheme === 'light' ? '☀️' : activeTheme === 'vice-neon' ? '🌆' : activeTheme === 'vice-dark' ? '🌃' : '🌊'}
            </span>
            <span className="hidden md:inline font-mono text-[11px] uppercase">
              {activeTheme === 'vice-light' || activeTheme === 'light' ? 'LIGHT' : activeTheme === 'vice-neon' ? 'NEON' : activeTheme === 'vice-dark' ? 'DARK' : 'OCEAN'}
            </span>
          </button>

          {/* Resume Download CTA */}
          <a
            href={config.contact.resumeUrl}
            download
            className="px-3 sm:px-4 py-1.5 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-highlight text-white font-hud text-xs font-bold border border-accent shadow-md shadow-primary/30 transition-all duration-200"
          >
            RESUME
          </a>

          {/* Profile HUD Trigger Button */}
          {themeContext && (
            <button
              onClick={() => themeContext.setProfileOpen(true)}
              title="Open Profile & Settings HUD"
              aria-label="Open Agent Profile"
              className="relative p-0.5 border-2 border-accent hover:border-primary transition-all group rounded-none"
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
            className="lg:hidden p-2 text-accent hover:text-white border border-accent/40 hover:border-accent transition-colors"
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
            className="lg:hidden bg-surface/95 border-b border-primary/40 px-6 py-4 space-y-3 font-hud text-sm"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-200 hover:text-accent border-b border-primary/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
            {themeContext && (
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={themeContext.toggleBgOverlay}
                  className="w-full py-2 bg-black/60 border border-accent/50 text-accent font-bold text-center text-xs"
                >
                  🎭 BG BLUE OVERLAY: {themeContext.bgOverlay === 'none' ? 'OFF (CLEAR)' : themeContext.bgOverlay.toUpperCase()}
                </button>
                <button
                  onClick={() => {
                    themeContext.setProfileOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-primary/20 border border-primary text-accent font-bold text-center text-xs"
                >
                  ⚙️ THEME, WALLPAPERS &amp; PROFILE HUD
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
