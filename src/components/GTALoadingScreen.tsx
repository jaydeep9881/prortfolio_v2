import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TIPS = [
  'INITIALIZING VICE CITY ENVIRONMENT...',
  'CONNECTING TO FULL-STACK SPRING BOOT SERVICES...',
  'CALIBRATING REACT.JS & DJANGO ENGINE CORES...',
  'OPTIMIZING POSTGRESQL & MYSQL PERSISTENCE LAYERS...',
  'LOADING AGENT ARSENAL & CREDENTIALS...',
];

export default function GTALoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 900);
    return () => clearInterval(tipInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-black select-none">
      {/* Background with real GTA VI Ocean Image */}
      <div className="absolute inset-0">
        <img
          src="/Grand Theft Auto 6.jpg"
          alt="GTA VI Loading Background"
          className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1] scale-105 animate-pulse duration-[8000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
        <div className="absolute inset-0 scanline-overlay opacity-30" />
      </div>

      {/* Top Bar: Mission Identifier */}
      <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-6 bg-accent -skew-x-12" />
          <span className="font-hud text-xs sm:text-sm font-bold tracking-widest text-accent">
            VICE CITY // DEVELOPER DOSSIER 2026
          </span>
        </div>
        {onComplete && (
          <button
            onClick={onComplete}
            className="font-hud text-xs text-gray-300 hover:text-accent border border-accent/40 px-3 py-1 hover:border-accent transition-colors"
          >
            SKIP [SPACE] ➔
          </button>
        )}
      </div>

      {/* Center: GTA VI Style Massive Title */}
      <div className="relative z-10 px-6 text-center my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1 bg-primary/20 border border-primary text-accent font-hud text-xs sm:text-sm font-bold tracking-widest mb-4">
            MISSION: PORTFOLIO SHOWCASE
          </div>
          <h1
            className="text-5xl sm:text-7xl md:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-highlight tracking-tighter"
            style={{
              textShadow: '0 0 35px rgba(14, 165, 233, 0.4), 0 0 70px rgba(34, 211, 238, 0.2)',
            }}
          >
            JAYDEEP
          </h1>
          <p className="font-hud text-sm sm:text-base font-bold text-accent tracking-widest mt-2 uppercase">
            FULL-STACK DEVELOPER • JAVA • SPRING BOOT • REACT
          </p>
        </motion.div>
      </div>

      {/* Bottom: Progress Bar & Dynamic Status Tips */}
      <div className="relative z-10 p-6 sm:p-10 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between text-xs font-hud font-bold text-accent mb-2">
          <span className="tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-ping" />
            {TIPS[tipIndex]}
          </span>
          <span className="text-sm font-mono text-white">{progress}%</span>
        </div>

        {/* Outer Bar */}
        <div className="w-full h-2 bg-black/70 border border-primary/50 p-0.5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-accent to-highlight shadow-lg shadow-primary/50"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] text-gray-400 font-mono">
          <span>SAVITRIBAI PHULE PUNE UNIVERSITY</span>
          <span>GTA VI EDITION</span>
        </div>
      </div>
    </div>
  );
}
