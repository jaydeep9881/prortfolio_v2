import { useEffect, useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

interface GTABackgroundProps {
  theme?: string;
}

export default function GTABackground({ theme: propTheme }: GTABackgroundProps) {
  let themeContext;
  try {
    themeContext = useTheme();
  } catch {
    themeContext = null;
  }

  const currentTheme = themeContext?.theme || propTheme || 'vice-ocean';
  const bgEffects = themeContext ? themeContext.bgEffects : true;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Subtle parallax offset
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Theme-specific overlays
  const themeOverlay = useMemo(() => {
    switch (currentTheme) {
      case 'vice-neon':
        return 'linear-gradient(180deg, rgba(14, 6, 24, 0.88) 0%, rgba(45, 20, 72, 0.72) 40%, rgba(14, 6, 24, 0.92) 100%)';
      case 'vice-dark':
        return 'linear-gradient(180deg, rgba(3, 7, 18, 0.94) 0%, rgba(15, 23, 42, 0.82) 45%, rgba(3, 7, 18, 0.96) 100%)';
      case 'vice-light':
      case 'light':
        return 'linear-gradient(180deg, rgba(240, 249, 255, 0.88) 0%, rgba(224, 242, 254, 0.75) 50%, rgba(240, 249, 255, 0.92) 100%)';
      case 'vice-ocean':
      default:
        // Sky Blue / Ocean Turquoise theme
        return 'linear-gradient(180deg, rgba(4, 18, 36, 0.88) 0%, rgba(7, 34, 61, 0.65) 35%, rgba(6, 28, 52, 0.75) 70%, rgba(4, 18, 36, 0.94) 100%)';
    }
  }, [currentTheme]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Real GTA VI Image with parallax */}
      <div
        className="absolute -inset-4 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px, 0) scale(1.04)`,
        }}
      >
        <img
          src="/Grand Theft Auto 6.jpg"
          alt="GTA VI Vice City Skyline & Ocean"
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05]"
          loading="eager"
        />
      </div>

      {/* Atmospheric Theme Gradient Overlay for optimal text readability */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{ background: themeOverlay }}
      />

      {/* Ocean Sun Glint / Caustic shimmer particles */}
      {bgEffects && (
        <>
          {/* Cyan / Sky Blue ambient glow spots */}
          <div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full filter blur-[120px] opacity-25 pointer-events-none transition-all duration-1000"
            style={{
              background: currentTheme === 'vice-neon' ? '#ec4899' : '#00f2fe',
            }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full filter blur-[140px] opacity-20 pointer-events-none transition-all duration-1000"
            style={{
              background: currentTheme === 'vice-neon' ? '#8b5cf6' : '#0ea5e9',
            }}
          />

          {/* Ocean Water Shimmer caustics layer */}
          <div className="absolute inset-0 opacity-[0.07] animate-ocean-shimmer mix-blend-screen pointer-events-none">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <filter id="oceanWaterCaustics">
                <feTurbulence type="fractalNoise" baseFrequency="0.03 0.05" numOctaves="3" result="noise" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.1   0 0 0 0 0.8   0 0 0 0 1   0 0 0 1 0"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#oceanWaterCaustics)" />
            </svg>
          </div>
        </>
      )}

      {/* Vice City scanline overlay */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-40" />

      {/* Vignette Edge Shading */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(2, 6, 18, 0.6) 100%)',
        }}
      />
    </div>
  );
}
