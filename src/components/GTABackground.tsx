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
  const bgOverlay = themeContext ? themeContext.bgOverlay : 'none';
  const activeWallpaper = themeContext?.wallpaper || '/Grand Theft Auto 6.jpg';

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!bgEffects) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [bgEffects]);

  // Compute overlay based on user's overlay preference:
  // 'none' = completely clear image without blue tint layer!
  // 'subtle' = minimal neutral dark scrim
  // 'tinted' = full thematic color tint
  const overlayStyle = useMemo(() => {
    if (bgOverlay === 'none') {
      // Completely clear! No blue layer at all!
      return 'linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.35) 100%)';
    }

    if (bgOverlay === 'subtle') {
      return 'linear-gradient(180deg, rgba(3, 10, 20, 0.55) 0%, rgba(3, 10, 20, 0.3) 50%, rgba(3, 10, 20, 0.65) 100%)';
    }

    // 'tinted': Theme-specific color layer
    switch (currentTheme) {
      case 'vice-neon':
        return 'linear-gradient(180deg, rgba(14, 6, 24, 0.82) 0%, rgba(45, 20, 72, 0.6) 40%, rgba(14, 6, 24, 0.88) 100%)';
      case 'vice-dark':
        return 'linear-gradient(180deg, rgba(3, 7, 18, 0.88) 0%, rgba(15, 23, 42, 0.7) 45%, rgba(3, 7, 18, 0.92) 100%)';
      case 'vice-light':
      case 'light':
        return 'linear-gradient(180deg, rgba(240, 249, 255, 0.75) 0%, rgba(224, 242, 254, 0.55) 50%, rgba(240, 249, 255, 0.82) 100%)';
      case 'vice-ocean':
      default:
        return 'linear-gradient(180deg, rgba(4, 18, 36, 0.78) 0%, rgba(7, 34, 61, 0.5) 35%, rgba(6, 28, 52, 0.6) 70%, rgba(4, 18, 36, 0.85) 100%)';
    }
  }, [bgOverlay, currentTheme]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Background Image (provided GTA VI or internet wallpaper) */}
      <div
        className="absolute -inset-4 transition-transform duration-700 ease-out"
        style={{
          transform: bgEffects
            ? `translate3d(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px, 0) scale(1.04)`
            : 'scale(1)',
        }}
      >
        <img
          key={activeWallpaper}
          src={activeWallpaper}
          alt="GTA VI Vice City Skyline & Ocean"
          className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.05] transition-opacity duration-700"
          loading="eager"
        />
      </div>

      {/* Background Overlay Layer (Can be disabled / set to none to remove blue tint!) */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{ background: overlayStyle }}
      />

      {/* Atmospheric Caustics (Only when bgEffects is enabled AND overlay is not none) */}
      {bgEffects && bgOverlay !== 'none' && (
        <>
          <div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full filter blur-[130px] opacity-20 pointer-events-none transition-all duration-1000"
            style={{
              background: 'rgb(var(--primary))',
            }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full filter blur-[140px] opacity-15 pointer-events-none transition-all duration-1000"
            style={{
              background: 'rgb(var(--accent))',
            }}
          />

          <div className="absolute inset-0 opacity-[0.05] animate-ocean-shimmer mix-blend-screen pointer-events-none">
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

      {/* Very subtle edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(2, 6, 18, 0.45) 100%)',
        }}
      />
    </div>
  );
}
