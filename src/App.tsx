import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Learning from './sections/Learning';
import About from './sections/About';
import Contact from './sections/Contact';
import config from './data/config';
import Experience from './sections/Experience';
import UniverseBackground from './components/UniverseBackground';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
    const colors = theme === 'dark' ? config.theme.colors : (config.theme.lightColors || config.theme.colors);
    const setVar = (name: string, hex: string) => {
      const v = hexToRgbTriplet(hex);
      root.style.setProperty(`--${name}`, `${v.r} ${v.g} ${v.b}`);
    };
    setVar('background', colors.background);
    setVar('surface', colors.surface);
    setVar('muted', colors.muted);
    setVar('primary', colors.primary);
    setVar('accent', colors.accent);
  }, [theme]);

  return (
    <div className="relative min-h-screen bg-background/80 text-gray-900 dark:text-white backdrop-blur-[1px] overflow-hidden">
      <UniverseBackground theme={theme} />
      <div className="relative z-10">
        <Header theme={theme} setTheme={setTheme} />
        <main className="max-w-6xl mx-auto px-4 sm:px-6">
          <Hero />
          <Experience/>
          <Skills />
          <Projects />  
          <Learning />
          <About />
          
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;

function hexToRgbTriplet(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace('#', '');
  const full = cleaned.length === 3
    ? cleaned.split('').map((c) => c + c).join('')
    : cleaned;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}


