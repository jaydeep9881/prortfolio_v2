import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeId = 'vice-ocean' | 'vice-neon' | 'vice-dark' | 'vice-light';
export type TextSize = 'normal' | 'large' | 'xlarge';
export type BgOverlayMode = 'none' | 'subtle' | 'tinted';

export interface BgWallpaper {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
  description: string;
}

export const WALLPAPERS: BgWallpaper[] = [
  {
    id: 'gta6-ocean',
    name: 'GTA VI Ocean & Skyline (Provided Image)',
    thumbnail: '/Grand Theft Auto 6.jpg',
    url: '/Grand Theft Auto 6.jpg',
    description: 'Vice City tropical ocean bay & modern high-rises',
  },
  {
    id: 'vice-beach-sunset',
    name: 'Vice Beach & Palm Sunset (Web)',
    thumbnail: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=400&auto=format&fit=crop',
    url: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1920&auto=format&fit=crop',
    description: 'Iconic coastal sunset with silhouette palms',
  },
  {
    id: 'miami-south-beach',
    name: 'Miami Ocean Drive & Bay (Web)',
    thumbnail: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=400&auto=format&fit=crop',
    url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1920&auto=format&fit=crop',
    description: 'Crystal azure waters & coastal skyline',
  },
  {
    id: 'vice-downtown-marina',
    name: 'Vice Marina & Yachts (Web)',
    thumbnail: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?q=80&w=400&auto=format&fit=crop',
    url: 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?q=80&w=1920&auto=format&fit=crop',
    description: 'Luxury yachts, bridges and glass towers',
  },
  {
    id: 'tropical-keys-reefs',
    name: 'Vice Keys & Turquoise Reefs (Web)',
    thumbnail: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=400&auto=format&fit=crop',
    url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1920&auto=format&fit=crop',
    description: 'Tropical paradise azure coral waters',
  },
];

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  badge: string;
  description: string;
  colors: {
    background: string;
    surface: string;
    surfaceCard: string;
    muted: string;
    primary: string;
    accent: string;
    highlight: string;
  };
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  'vice-ocean': {
    id: 'vice-ocean',
    name: 'Vice Ocean',
    badge: '🌊',
    description: 'GTA VI Vice City tropical ocean & sky blue vibe',
    colors: {
      background: '#041224',
      surface: '#071f3a',
      surfaceCard: '#0c2e54',
      muted: '#94a3b8',
      primary: '#0ea5e9', // Sky blue
      accent: '#22d3ee', // Aqua cyan
      highlight: '#38bdf8', // Bright cerulean
    },
  },
  'vice-neon': {
    id: 'vice-neon',
    name: 'Vice Neon Sunset',
    badge: '🌆',
    description: 'Iconic magenta sunset & neon purple glow',
    colors: {
      background: '#0e0618',
      surface: '#1d0b30',
      surfaceCard: '#2d1448',
      muted: '#a8a29e',
      primary: '#f43f5e', // Hot pink
      accent: '#a855f7', // Electric purple
      highlight: '#f97316', // Sunset orange
    },
  },
  'vice-dark': {
    id: 'vice-dark',
    name: 'Midnight Vice',
    badge: '🌃',
    description: 'Deep stealth dark navy & electric laser cyan',
    colors: {
      background: '#030712',
      surface: '#0f172a',
      surfaceCard: '#1e293b',
      muted: '#64748b',
      primary: '#06b6d4', // Laser cyan
      accent: '#10b981', // Emerald
      highlight: '#38bdf8', // Ice blue
    },
  },
  'vice-light': {
    id: 'vice-light',
    name: 'Daylight Coast',
    badge: '☀️',
    description: 'Bright tropical daylight & crystal turquoise water',
    colors: {
      background: '#f0f9ff',
      surface: '#ffffff',
      surfaceCard: '#e0f2fe',
      muted: '#475569',
      primary: '#0284c7', // Ocean deep blue
      accent: '#0891b2', // Teal
      highlight: '#ea580c', // Tangerine
    },
  },
};

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (_t: ThemeId | 'light' | 'dark') => void;
  textSize: TextSize;
  setTextSize: (_s: TextSize) => void;
  cycleTextSize: () => void;
  bgEffects: boolean;
  setBgEffects: (_b: boolean) => void;
  bgOverlay: BgOverlayMode;
  setBgOverlay: (_m: BgOverlayMode) => void;
  toggleBgOverlay: () => void;
  wallpaper: string;
  setWallpaper: (_url: string) => void;
  profileOpen: boolean;
  setProfileOpen: (_open: boolean) => void;
  currentThemeConfig: ThemeConfig;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('gta_theme');
    if (saved && saved in THEMES) return saved as ThemeId;
    const legacy = localStorage.getItem('theme');
    if (legacy === 'light') return 'vice-light';
    return 'vice-ocean';
  });

  const [textSize, setTextSizeState] = useState<TextSize>(() => {
    const saved = localStorage.getItem('gta_text_size');
    if (saved === 'large' || saved === 'xlarge' || saved === 'normal') return saved;
    return 'normal';
  });

  const [bgEffects, setBgEffects] = useState<boolean>(() => {
    const saved = localStorage.getItem('gta_bg_effects');
    return saved !== 'false';
  });

  const [bgOverlay, setBgOverlayState] = useState<BgOverlayMode>(() => {
    const saved = localStorage.getItem('gta_bg_overlay');
    if (saved === 'none' || saved === 'subtle' || saved === 'tinted') return saved;
    // Default to 'none' or 'subtle' so user doesn't get forced heavy blue tint!
    return 'none';
  });

  const [wallpaper, setWallpaperState] = useState<string>(() => {
    const saved = localStorage.getItem('gta_wallpaper');
    return saved || '/Grand Theft Auto 6.jpg';
  });

  const [profileOpen, setProfileOpen] = useState(false);

  const setTheme = (t: ThemeId | 'light' | 'dark') => {
    let resolved: ThemeId = 'vice-ocean';
    if (t === 'light') resolved = 'vice-light';
    else if (t === 'dark') resolved = 'vice-ocean';
    else if (t in THEMES) resolved = t as ThemeId;

    setThemeState(resolved);
    localStorage.setItem('gta_theme', resolved);
    localStorage.setItem('theme', resolved === 'vice-light' ? 'light' : 'dark');
  };

  const setTextSize = (s: TextSize) => {
    setTextSizeState(s);
    localStorage.setItem('gta_text_size', s);
  };

  const setBgOverlay = (m: BgOverlayMode) => {
    setBgOverlayState(m);
    localStorage.setItem('gta_bg_overlay', m);
  };

  const toggleBgOverlay = () => {
    const order: BgOverlayMode[] = ['none', 'subtle', 'tinted'];
    const next = order[(order.indexOf(bgOverlay) + 1) % order.length];
    setBgOverlay(next);
  };

  const setWallpaper = (url: string) => {
    setWallpaperState(url);
    localStorage.setItem('gta_wallpaper', url);
  };

  const cycleTextSize = () => {
    const order: TextSize[] = ['normal', 'large', 'xlarge'];
    const next = order[(order.indexOf(textSize) + 1) % order.length];
    setTextSize(next);
  };

  const cycleTheme = () => {
    const order: ThemeId[] = ['vice-ocean', 'vice-neon', 'vice-dark', 'vice-light'];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
  };

  // Sync design tokens to DOM CSS variables
  useEffect(() => {
    const root = document.documentElement;

    // Reset classes
    root.classList.remove(
      'theme-vice-ocean',
      'theme-vice-neon',
      'theme-vice-dark',
      'theme-vice-light',
      'light',
      'dark',
      'overlay-none',
      'overlay-subtle',
      'overlay-tinted'
    );
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');

    // Add theme & mode classes
    root.classList.add(`theme-${theme}`);
    root.classList.add(theme === 'vice-light' ? 'light' : 'dark');
    root.classList.add(`text-size-${textSize}`);
    root.classList.add(`overlay-${bgOverlay}`);

    // Update CSS variables for full token-based styling
    const conf = THEMES[theme];
    const setVar = (name: string, hex: string) => {
      const v = hexToRgb(hex);
      root.style.setProperty(`--${name}`, `${v.r} ${v.g} ${v.b}`);
    };

    setVar('background', conf.colors.background);
    setVar('surface', conf.colors.surface);
    setVar('surface-card', conf.colors.surfaceCard);
    setVar('muted', conf.colors.muted);
    setVar('primary', conf.colors.primary);
    setVar('accent', conf.colors.accent);
    setVar('highlight', conf.colors.highlight);

    // Font size scaling factors
    if (textSize === 'large') {
      root.style.setProperty('--font-scale', '1.125');
    } else if (textSize === 'xlarge') {
      root.style.setProperty('--font-scale', '1.25');
    } else {
      root.style.setProperty('--font-scale', '1');
    }
  }, [theme, textSize, bgOverlay]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        textSize,
        setTextSize,
        cycleTextSize,
        bgEffects,
        setBgEffects: (b) => {
          setBgEffects(b);
          localStorage.setItem('gta_bg_effects', String(b));
        },
        bgOverlay,
        setBgOverlay,
        toggleBgOverlay,
        wallpaper,
        setWallpaper,
        profileOpen,
        setProfileOpen,
        currentThemeConfig: THEMES[theme],
        cycleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleaned = hex.replace('#', '');
  const full =
    cleaned.length === 3
      ? cleaned
          .split('')
          .map((c) => c + c)
          .join('')
      : cleaned;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}
