import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function GTALoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden">
      {/* GTA VI Vice City Background with gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, #58468c 0%, #7a5ca8 25%, #aa64b4 45%, #e88a9a 65%, #ff9664 85%, #ffc896 100%)`
        }}
      />

      {/* Palm trees and buildings silhouettes */}
      <svg className="absolute bottom-0 w-full h-2/3 opacity-80" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMax slice">
        {/* Buildings */}
        <rect x="100" y="200" width="80" height="300" fill="#2d1b4e" opacity="0.7" />
        <rect x="200" y="150" width="100" height="350" fill="#2d1b4e" opacity="0.7" />
        <rect x="450" y="180" width="110" height="320" fill="#2d1b4e" opacity="0.7" />
        <rect x="700" y="190" width="95" height="310" fill="#2d1b4e" opacity="0.7" />
        <rect x="900" y="170" width="120" height="330" fill="#2d1b4e" opacity="0.7" />
        
        {/* Palm trees */}
        <g opacity="0.8">
          <rect x="50" y="250" width="10" height="250" fill="#1a0b2e" />
          <ellipse cx="55" cy="245" rx="50" ry="25" fill="#1a0b2e" />
          <ellipse cx="55" cy="230" rx="55" ry="22" fill="#1a0b2e" />
        </g>
        <g opacity="0.8">
          <rect x="1100" y="250" width="10" height="250" fill="#1a0b2e" />
          <ellipse cx="1105" cy="245" rx="50" ry="25" fill="#1a0b2e" />
          <ellipse cx="1105" cy="230" rx="55" ry="22" fill="#1a0b2e" />
        </g>
      </svg>

      {/* Ground fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent"></div>

      <div className="relative z-10 w-full max-w-6xl px-8 flex flex-col items-center justify-center h-full">
        {/* GTA VI Style Logo */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-auto mt-32"
        >
          {/* Logo */}
          <div className="relative inline-block mb-6">
            <h1 
              className="text-[10rem] md:text-[14rem] font-black leading-none"
              style={{
                fontFamily: '"Arial Black", sans-serif',
                color: 'white',
                textShadow: '0 0 40px rgba(255,255,255,0.5), 6px 6px 0px rgba(0,0,0,0.3)',
                letterSpacing: '-0.05em'
              }}
            >
              PORTFOLIO
            </h1>
          </div>
        </motion.div>

        {/* Progress bar at bottom */}
        <div className="w-full max-w-2xl mb-24">
          <div className="relative w-full h-1 bg-white/30 overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white rounded-full shadow-lg shadow-white/50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-6 left-0 right-0 text-center z-20">
        <p className="text-white/70 text-xs tracking-wider">
          Inspired by Grand Theft Auto VI © Rockstar Games
        </p>
      </div>
    </div>
  );
}
