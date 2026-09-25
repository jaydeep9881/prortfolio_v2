import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    "Loading Vice City inspired environment...",
    "Spawning vehicles around the map...",
    "Initializing portfolio zones...",
    "Setting up neon lights and buildings...",
    "Preparing interactive missions...",
    "Compiling shader effects...",
    "Ready to explore!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl w-full px-8">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-8xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            PORTFOLIO 6
          </h1>
          <div className="text-2xl text-cyan-400 font-bold tracking-wider">
            Los Portfolio • 2026
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="w-full h-6 bg-gray-900 border-4 border-cyan-400 relative overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl mix-blend-difference">
              {progress}%
            </div>
          </div>
        </div>

        {/* Loading tips */}
        <motion.div
          key={tipIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center text-white text-xl mb-12"
        >
          {tips[tipIndex]}
        </motion.div>

        {/* Instructions */}
        <div className="bg-black/50 border-2 border-cyan-400/50 p-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">GAME CONTROLS</h2>
          <div className="grid grid-cols-2 gap-4 text-white">
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-2 bg-gray-800 border border-cyan-400/50 rounded font-mono">W A S D</kbd>
              <span>Move around the city</span>
            </div>
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-2 bg-gray-800 border border-cyan-400/50 rounded font-mono">SPACE</kbd>
              <span>Jump</span>
            </div>
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-2 bg-gray-800 border border-cyan-400/50 rounded font-mono">SHIFT</kbd>
              <span>Sprint/Run faster</span>
            </div>
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-2 bg-gray-800 border border-cyan-400/50 rounded font-mono">E</kbd>
              <span>Interact with zones</span>
            </div>
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-2 bg-gray-800 border border-cyan-400/50 rounded font-mono">F</kbd>
              <span>Enter/Exit vehicle</span>
            </div>
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-2 bg-gray-800 border border-cyan-400/50 rounded font-mono">MOUSE</kbd>
              <span>Look around</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-cyan-400/30">
            <h3 className="text-xl font-bold text-purple-400 mb-3">MISSION OBJECTIVES</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Explore the city and find 4 interactive zones</li>
              <li>• Visit the <span className="text-cyan-400">PROJECTS</span> zone to see my work</li>
              <li>• Check out the <span className="text-red-400">SKILLS</span> zone for my abilities</li>
              <li>• Learn more at the <span className="text-purple-400">ABOUT</span> zone</li>
              <li>• Make contact at the <span className="text-green-400">CONTACT</span> zone</li>
              <li>• Try entering vehicles for a joy ride!</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2026 Portfolio 6 • Not affiliated with Rockstar Games • Created with React Three Fiber</p>
        </div>
      </div>
    </motion.div>
  );
}
