import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MiniGamesProps {
  isActive: boolean;
  gameType: 'race' | 'collect' | 'target' | null;
  onComplete: (score: number) => void;
  onClose: () => void;
}

export default function MiniGames({ isActive, gameType, onComplete, onClose }: MiniGamesProps) {
  if (!isActive || !gameType) return null;

  return (
    <AnimatePresence>
      {gameType === 'collect' && <CollectGame onComplete={onComplete} onClose={onClose} />}
      {gameType === 'target' && <TargetGame onComplete={onComplete} onClose={onClose} />}
      {gameType === 'race' && <RaceGame onComplete={onComplete} onClose={onClose} />}
    </AnimatePresence>
  );
}

// Collectible Mission - Collect portfolio items
function CollectGame({ onComplete, onClose }: { onComplete: (score: number) => void; onClose: () => void }) {
  const [collected, setCollected] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [items, setItems] = useState(() => 
    Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      collected: false,
    }))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(collected * 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [collected, onComplete]);

  const handleCollect = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, collected: true } : item
      )
    );
    setCollected((prev) => prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur z-[60] flex items-center justify-center p-4"
    >
      <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-cyan-400 max-w-4xl w-full p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-cyan-400 pb-4">
          <div>
            <div className="text-cyan-400 text-sm font-bold">MISSION: COLLECT</div>
            <h2 className="text-3xl font-bold text-white">Gather Portfolio Stars</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-red-400 text-2xl font-bold px-4 py-2 border border-white hover:border-red-400"
          >
            ✕
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mb-6">
          <div className="bg-black/50 border border-cyan-400/50 px-6 py-3">
            <div className="text-gray-400 text-sm">COLLECTED</div>
            <div className="text-cyan-400 text-3xl font-bold">{collected}/10</div>
          </div>
          <div className="bg-black/50 border border-cyan-400/50 px-6 py-3">
            <div className="text-gray-400 text-sm">TIME LEFT</div>
            <div className="text-red-400 text-3xl font-bold">{timeLeft}s</div>
          </div>
        </div>

        {/* Game area */}
        <div className="relative w-full h-96 bg-black border-4 border-cyan-400/50 overflow-hidden">
          <div className="absolute inset-0 retro-grid opacity-20" />
          
          {items.map((item) => (
            <motion.button
              key={item.id}
              initial={{ scale: 1 }}
              animate={item.collected ? { scale: 0, opacity: 0 } : { scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              onClick={() => !item.collected && handleCollect(item.id)}
              className="absolute w-12 h-12 text-3xl"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              disabled={item.collected}
            >
              {!item.collected && '⭐'}
            </motion.button>
          ))}
        </div>

        <div className="mt-4 text-center text-gray-400">
          Click the stars before time runs out!
        </div>
      </div>
    </motion.div>
  );
}

// Target Practice - Test accuracy
function TargetGame({ onComplete, onClose }: { onComplete: (score: number) => void; onClose: () => void }) {
  const [score, setScore] = useState(0);
  const [shots, setShots] = useState(10);
  const [targets, setTargets] = useState(() => generateTargets());

  function generateTargets() {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 10,
      active: true,
    }));
  }

  const handleShoot = (id: number) => {
    if (shots <= 0) return;
    
    setTargets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: false } : t))
    );
    setScore((prev) => prev + 200);
    setShots((prev) => prev - 1);

    // Regenerate targets
    setTimeout(() => {
      setTargets(generateTargets());
    }, 500);
  };

  const handleMiss = () => {
    if (shots <= 0) return;
    setShots((prev) => prev - 1);
  };

  useEffect(() => {
    if (shots <= 0) {
      setTimeout(() => onComplete(score), 1000);
    }
  }, [shots, score, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur z-[60] flex items-center justify-center p-4"
    >
      <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-red-400 max-w-4xl w-full p-8">
        <div className="flex justify-between items-center mb-6 border-b-2 border-red-400 pb-4">
          <div>
            <div className="text-red-400 text-sm font-bold">MISSION: TARGET PRACTICE</div>
            <h2 className="text-3xl font-bold text-white">Shooting Range</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-red-400 text-2xl font-bold px-4 py-2 border border-white hover:border-red-400"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-8 mb-6">
          <div className="bg-black/50 border border-red-400/50 px-6 py-3">
            <div className="text-gray-400 text-sm">SCORE</div>
            <div className="text-red-400 text-3xl font-bold">{score}</div>
          </div>
          <div className="bg-black/50 border border-red-400/50 px-6 py-3">
            <div className="text-gray-400 text-sm">SHOTS LEFT</div>
            <div className="text-yellow-400 text-3xl font-bold">{shots}</div>
          </div>
        </div>

        <div
          className="relative w-full h-96 bg-gradient-to-b from-blue-900/30 to-green-900/30 border-4 border-red-400/50 overflow-hidden cursor-crosshair"
          onClick={handleMiss}
        >
          {targets.map((target) => (
            <motion.button
              key={target.id}
              initial={{ scale: 0 }}
              animate={target.active ? { scale: 1 } : { scale: 0 }}
              className="absolute w-16 h-16"
              style={{ left: `${target.x}%`, top: `${target.y}%` }}
              onClick={(e) => {
                e.stopPropagation();
                handleShoot(target.id);
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-red-500 rounded-full" />
                  <div className="absolute w-2 h-2 bg-red-500 rounded-full" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-4 text-center text-gray-400">
          Click the targets to shoot! Miss = wasted shot
        </div>
      </div>
    </motion.div>
  );
}

// Race Mission - Speed challenge
function RaceGame({ onComplete, onClose }: { onComplete: (score: number) => void; onClose: () => void }) {
  const [position, setPosition] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete(position * 10);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [position, onComplete]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.code === 'Space') {
        setSpeed((prev) => Math.min(prev + 10, 100));
        setPosition((prev) => Math.min(prev + 5, 100));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const decay = setInterval(() => {
      setSpeed((prev) => Math.max(prev - 2, 0));
    }, 100);

    return () => clearInterval(decay);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur z-[60] flex items-center justify-center p-4"
    >
      <div className="bg-gradient-to-br from-gray-900 to-black border-4 border-yellow-400 max-w-4xl w-full p-8">
        <div className="flex justify-between items-center mb-6 border-b-2 border-yellow-400 pb-4">
          <div>
            <div className="text-yellow-400 text-sm font-bold">MISSION: STREET RACE</div>
            <h2 className="text-3xl font-bold text-white">Speed Challenge</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-red-400 text-2xl font-bold px-4 py-2 border border-white hover:border-red-400"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-8 mb-6">
          <div className="bg-black/50 border border-yellow-400/50 px-6 py-3">
            <div className="text-gray-400 text-sm">PROGRESS</div>
            <div className="text-yellow-400 text-3xl font-bold">{position}%</div>
          </div>
          <div className="bg-black/50 border border-yellow-400/50 px-6 py-3">
            <div className="text-gray-400 text-sm">TIME LEFT</div>
            <div className="text-red-400 text-3xl font-bold">{timeLeft}s</div>
          </div>
          <div className="bg-black/50 border border-yellow-400/50 px-6 py-3">
            <div className="text-gray-400 text-sm">SPEED</div>
            <div className="text-cyan-400 text-3xl font-bold">{speed}</div>
          </div>
        </div>

        {/* Race track */}
        <div className="relative w-full h-32 bg-gray-800 border-4 border-yellow-400/50 overflow-hidden mb-4">
          {/* Road lines */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-1 bg-white opacity-30" />
          </div>

          {/* Car */}
          <motion.div
            className="absolute left-0 top-1/2 transform -translate-y-1/2"
            animate={{ left: `${position}%` }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <div className="text-4xl">🏎️</div>
          </motion.div>

          {/* Finish line */}
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-white via-black to-white" />
        </div>

        {/* Speed indicator */}
        <div className="mb-4">
          <div className="text-gray-400 text-sm mb-2">SPEED METER</div>
          <div className="w-full h-8 bg-gray-800 border border-yellow-400/50">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-red-500"
              animate={{ width: `${speed}%` }}
            />
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-2">
            Press SPACEBAR to accelerate! 🏁
          </div>
          <div className="text-gray-400 text-sm">
            Keep pressing to maintain speed and reach 100%!
          </div>
        </div>
      </div>
    </motion.div>
  );
}
