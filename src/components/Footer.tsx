import { useState, useEffect } from 'react';
import config from '../data/config';

export default function Footer() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-28 border-t border-cyan-400/30 bg-[#041224]/90 backdrop-blur-md py-10 px-4 sm:px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Tagline */}
        <div className="text-center md:text-left">
          <div className="font-display font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-400 tracking-wider">
            {config.hero.name.toUpperCase()}
          </div>
          <p className="text-xs font-hud text-gray-400 mt-1">
            FULL-STACK SOFTWARE ENGINEER • SPRING BOOT &amp; REACT • PUNE, INDIA
          </p>
        </div>

        {/* Center: Live Vice City Clock */}
        <div className="flex items-center gap-2 px-4 py-2 bg-black/60 border border-cyan-400/40 text-xs font-hud font-bold">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-gray-400">VICE CITY CLOCK:</span>
          <span className="text-cyan-300 font-mono tracking-widest">{time || '10:49:14 AM'}</span>
        </div>

        {/* Right: Scroll to top & Credits */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="px-4 py-2 bg-cyan-500/15 hover:bg-cyan-500/30 border border-cyan-400/50 hover:border-cyan-400 text-cyan-300 font-hud text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <span>TOP</span>
            <span>▲</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-cyan-400/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-hud text-gray-500">
        <div>
          © {new Date().getFullYear()} {config.site.author}. ALL RIGHTS RESERVED.
        </div>
        <div className="text-cyan-400/70">
          INSPIRED BY GRAND THEFT AUTO VI // VICE CITY OCEAN EDITION
        </div>
      </div>
    </footer>
  );
}
