import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MobileControlsProps {
  onMove: (direction: 'forward' | 'backward' | 'left' | 'right' | 'none') => void;
  onJump: () => void;
  onInteract: () => void;
}

export default function MobileControls({ onMove, onJump, onInteract }: MobileControlsProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeDirection, setActiveDirection] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  const handleDirectionPress = (direction: 'forward' | 'backward' | 'left' | 'right') => {
    setActiveDirection(direction);
    onMove(direction);
  };

  const handleDirectionRelease = () => {
    setActiveDirection(null);
    onMove('none');
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Left side - D-pad */}
      <div className="absolute left-4 bottom-24 pointer-events-auto">
        <div className="relative w-40 h-40">
          {/* Center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 border-2 border-cyan-400/30 rounded-full" />
          
          {/* Up */}
          <motion.button
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-lg ${
              activeDirection === 'forward' ? 'bg-cyan-400' : 'bg-black/70'
            } border-2 border-cyan-400 flex items-center justify-center text-white text-xl`}
            whileTap={{ scale: 0.9 }}
            onTouchStart={() => handleDirectionPress('forward')}
            onTouchEnd={handleDirectionRelease}
            onMouseDown={() => handleDirectionPress('forward')}
            onMouseUp={handleDirectionRelease}
          >
            ▲
          </motion.button>

          {/* Down */}
          <motion.button
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-lg ${
              activeDirection === 'backward' ? 'bg-cyan-400' : 'bg-black/70'
            } border-2 border-cyan-400 flex items-center justify-center text-white text-xl`}
            whileTap={{ scale: 0.9 }}
            onTouchStart={() => handleDirectionPress('backward')}
            onTouchEnd={handleDirectionRelease}
            onMouseDown={() => handleDirectionPress('backward')}
            onMouseUp={handleDirectionRelease}
          >
            ▼
          </motion.button>

          {/* Left */}
          <motion.button
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-lg ${
              activeDirection === 'left' ? 'bg-cyan-400' : 'bg-black/70'
            } border-2 border-cyan-400 flex items-center justify-center text-white text-xl`}
            whileTap={{ scale: 0.9 }}
            onTouchStart={() => handleDirectionPress('left')}
            onTouchEnd={handleDirectionRelease}
            onMouseDown={() => handleDirectionPress('left')}
            onMouseUp={handleDirectionRelease}
          >
            ◀
          </motion.button>

          {/* Right */}
          <motion.button
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-lg ${
              activeDirection === 'right' ? 'bg-cyan-400' : 'bg-black/70'
            } border-2 border-cyan-400 flex items-center justify-center text-white text-xl`}
            whileTap={{ scale: 0.9 }}
            onTouchStart={() => handleDirectionPress('right')}
            onTouchEnd={handleDirectionRelease}
            onMouseDown={() => handleDirectionPress('right')}
            onMouseUp={handleDirectionRelease}
          >
            ▶
          </motion.button>
        </div>

        <div className="text-center text-cyan-400 text-xs mt-2 font-bold">MOVE</div>
      </div>

      {/* Right side - Action buttons */}
      <div className="absolute right-4 bottom-24 pointer-events-auto space-y-4">
        {/* Jump */}
        <motion.button
          className="w-16 h-16 bg-black/70 border-2 border-yellow-400 rounded-full flex items-center justify-center text-2xl"
          whileTap={{ scale: 0.9 }}
          onTouchStart={onJump}
          onClick={onJump}
        >
          🚀
        </motion.button>

        {/* Interact */}
        <motion.button
          className="w-16 h-16 bg-black/70 border-2 border-green-400 rounded-full flex items-center justify-center text-2xl"
          whileTap={{ scale: 0.9 }}
          onTouchStart={onInteract}
          onClick={onInteract}
        >
          ⚡
        </motion.button>

        <div className="text-center text-green-400 text-xs font-bold">ACTIONS</div>
      </div>

      {/* Instruction toast */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black/90 border-2 border-cyan-400 px-6 py-3 rounded-lg pointer-events-auto"
      >
        <div className="text-white text-sm text-center">
          <div className="font-bold text-cyan-400 mb-1">MOBILE MODE</div>
          Use on-screen controls to navigate
        </div>
      </motion.div>
    </div>
  );
}
