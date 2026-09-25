import { useEffect, useRef } from 'react';

interface GTABackgroundProps {
  theme: 'light' | 'dark';
}

export default function GTABackground({ theme }: GTABackgroundProps) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* GTA VI Vice City Sunset Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
            linear-gradient(to bottom,
              rgba(88, 70, 140, 0.3) 0%,
              rgba(170, 100, 180, 0.2) 30%,
              rgba(255, 150, 100, 0.2) 70%,
              rgba(255, 200, 150, 0.3) 100%
            ),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2358468c'/%3E%3Cstop offset='30%25' style='stop-color:%237a5ca8'/%3E%3Cstop offset='50%25' style='stop-color:%23aa64b4'/%3E%3Cstop offset='70%25' style='stop-color:%23e88a9a'/%3E%3Cstop offset='85%25' style='stop-color:%23ff9664'/%3E%3Cstop offset='100%25' style='stop-color:%23ffc896'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='800' fill='url(%23sky)'/%3E%3C/svg%3E")
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Palm trees silhouettes - left side */}
        <svg className="absolute bottom-0 left-0 w-80 h-96 opacity-90" viewBox="0 0 200 300" preserveAspectRatio="none">
          {/* Palm 1 - far left */}
          <g opacity="0.7">
            <rect x="45" y="150" width="8" height="150" fill="#2d1b4e" />
            <ellipse cx="49" cy="145" rx="40" ry="20" fill="#2d1b4e" />
            <ellipse cx="49" cy="135" rx="45" ry="18" fill="#2d1b4e" />
            <ellipse cx="49" cy="125" rx="40" ry="15" fill="#2d1b4e" />
          </g>
          {/* Palm 2 */}
          <g opacity="0.8">
            <rect x="95" y="140" width="10" height="160" fill="#2d1b4e" />
            <ellipse cx="100" cy="135" rx="45" ry="22" fill="#2d1b4e" />
            <ellipse cx="100" cy="125" rx="50" ry="20" fill="#2d1b4e" />
            <ellipse cx="100" cy="115" rx="45" ry="18" fill="#2d1b4e" />
          </g>
          {/* Palm 3 */}
          <g opacity="0.9">
            <rect x="150" y="130" width="10" height="170" fill="#1a0b2e" />
            <ellipse cx="155" cy="125" rx="48" ry="24" fill="#1a0b2e" />
            <ellipse cx="155" cy="115" rx="52" ry="22" fill="#1a0b2e" />
            <ellipse cx="155" cy="105" rx="48" ry="20" fill="#1a0b2e" />
          </g>
        </svg>

        {/* Palm trees silhouettes - right side */}
        <svg className="absolute bottom-0 right-0 w-80 h-96 opacity-90" viewBox="0 0 200 300" preserveAspectRatio="none">
          {/* Palm 4 */}
          <g opacity="0.9">
            <rect x="45" y="130" width="10" height="170" fill="#1a0b2e" />
            <ellipse cx="50" cy="125" rx="48" ry="24" fill="#1a0b2e" />
            <ellipse cx="50" cy="115" rx="52" ry="22" fill="#1a0b2e" />
            <ellipse cx="50" cy="105" rx="48" ry="20" fill="#1a0b2e" />
          </g>
          {/* Palm 5 */}
          <g opacity="0.8">
            <rect x="100" y="140" width="10" height="160" fill="#2d1b4e" />
            <ellipse cx="105" cy="135" rx="45" ry="22" fill="#2d1b4e" />
            <ellipse cx="105" cy="125" rx="50" ry="20" fill="#2d1b4e" />
            <ellipse cx="105" cy="115" rx="45" ry="18" fill="#2d1b4e" />
          </g>
        </svg>

        {/* Buildings silhouette - center */}
        <svg className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-96" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax meet">
          {/* Background buildings */}
          <rect x="100" y="120" width="80" height="180" fill="#6b5896" opacity="0.6" />
          <rect x="200" y="100" width="100" height="200" fill="#6b5896" opacity="0.6" />
          <rect x="320" y="110" width="90" height="190" fill="#6b5896" opacity="0.6" />
          <rect x="800" y="110" width="85" height="190" fill="#6b5896" opacity="0.6" />
          <rect x="900" y="100" width="100" height="200" fill="#6b5896" opacity="0.6" />
          <rect x="1020" y="120" width="80" height="180" fill="#6b5896" opacity="0.6" />
          
          {/* Mid buildings */}
          <rect x="420" y="80" width="110" height="220" fill="#4a3570" opacity="0.75" />
          <rect x="550" y="90" width="100" height="210" fill="#4a3570" opacity="0.75" />
          <rect x="670" y="85" width="105" height="215" fill="#4a3570" opacity="0.75" />
          
          {/* Front buildings */}
          <rect x="250" y="130" width="90" height="170" fill="#2d1b4e" opacity="0.9" />
          <rect x="480" y="140" width="80" height="160" fill="#2d1b4e" opacity="0.9" />
          <rect x="720" y="135" width="85" height="165" fill="#2d1b4e" opacity="0.9" />
          <rect x="950" y="130" width="95" height="170" fill="#2d1b4e" opacity="0.9" />
          
          {/* Windows - scattered lights */}
          <rect x="110" y="140" width="5" height="7" fill="#ffb380" opacity="0.8" />
          <rect x="125" y="150" width="5" height="7" fill="#ffb380" opacity="0.7" />
          <rect x="210" y="120" width="5" height="7" fill="#ffb380" opacity="0.8" />
          <rect x="225" y="130" width="5" height="7" fill="#ffb380" opacity="0.9" />
          <rect x="435" y="100" width="5" height="7" fill="#ffb380" opacity="0.8" />
          <rect x="455" y="110" width="5" height="7" fill="#ffb380" opacity="0.7" />
          <rect x="565" y="110" width="5" height="7" fill="#ffb380" opacity="0.8" />
          <rect x="685" y="105" width="5" height="7" fill="#ffb380" opacity="0.9" />
          <rect x="810" y="130" width="5" height="7" fill="#ffb380" opacity="0.8" />
          <rect x="910" y="120" width="5" height="7" fill="#ffb380" opacity="0.8" />
        </svg>

        {/* Ground haze */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 via-purple-900/20 to-transparent"></div>

        {/* Atmospheric overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>

        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, transparent 50%, rgba(0,0,0,0.3) 100%)',
          }}
        />
      </div>
    </div>
  );
}
