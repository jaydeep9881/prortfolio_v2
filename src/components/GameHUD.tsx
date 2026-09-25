import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GameHUDProps {
  health: number;
  currentZone: any;
}

export default function GameHUD({ health, currentZone }: GameHUDProps) {
  const [time, setTime] = useState('12:00');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Top bar - GTA style */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
        {/* Left side - Zone info */}
        <AnimatePresence>
          {currentZone && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-black/80 border-l-4 border-cyan-400 p-4 backdrop-blur"
            >
              <div className="text-cyan-400 text-sm font-bold mb-1">CURRENT LOCATION</div>
              <div className="text-white text-xl font-bold">{currentZone.title}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right side - Time and wanted level */}
        <div className="bg-black/80 p-3 backdrop-blur text-white">
          <div className="text-xl font-bold font-mono">{time}</div>
          <div className="text-xs text-gray-400">LOS PORTFOLIO</div>
        </div>
      </div>

      {/* Bottom left - Health and stats */}
      <div className="absolute bottom-8 left-8">
        <div className="space-y-3">
          {/* Health bar */}
          <div className="bg-black/80 p-3 backdrop-blur">
            <div className="text-xs text-gray-400 mb-1">HEALTH</div>
            <div className="w-48 h-4 bg-gray-800 border border-gray-600">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 to-red-400"
                initial={{ width: '100%' }}
                animate={{ width: `${health}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="bg-black/80 p-3 backdrop-blur text-white text-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-cyan-400">💰</span>
              <span>Portfolio Value: $999,999</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⭐</span>
              <span>Respect: MAX</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom right - Minimap */}
      <div className="absolute bottom-8 right-8">
        <Minimap />
      </div>

      {/* Controls help */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/70 px-6 py-3 backdrop-blur rounded-lg">
          <div className="flex gap-6 text-white text-sm">
            <div><kbd className="px-2 py-1 bg-gray-700 rounded">WASD</kbd> Move</div>
            <div><kbd className="px-2 py-1 bg-gray-700 rounded">SPACE</kbd> Jump</div>
            <div><kbd className="px-2 py-1 bg-gray-700 rounded">SHIFT</kbd> Sprint</div>
            <div><kbd className="px-2 py-1 bg-gray-700 rounded">E</kbd> Interact</div>
            <div><kbd className="px-2 py-1 bg-gray-700 rounded">F</kbd> Enter Vehicle</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Minimap() {
  return (
    <div className="relative w-48 h-48 bg-black/90 border-4 border-cyan-400/50 backdrop-blur">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <div
              className="absolute w-full h-px bg-cyan-400"
              style={{ top: `${(i + 1) * 20}%` }}
            />
            <div
              className="absolute h-full w-px bg-cyan-400"
              style={{ left: `${(i + 1) * 20}%` }}
            />
          </div>
        ))}
      </div>

      {/* Player indicator (center) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
        <div className="w-1 h-4 bg-white absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full" />
      </div>

      {/* Zone markers */}
      <div className="absolute top-1/4 left-3/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
      <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-red-400 rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
      <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-pulse" />

      {/* Radar sweep effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-cyan-400/20 to-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: 'center' }}
      />

      {/* Label */}
      <div className="absolute -bottom-6 left-0 right-0 text-center text-cyan-400 text-xs font-bold">
        RADAR
      </div>
    </div>
  );
}
