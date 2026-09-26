import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeId = 'vice-ocean' | 'vice-neon' | 'vice-dark' | 'vice-light';
export type TextSize = 'normal' | 'large' | 'xlarge';

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
      highlight: '#ff7a59', // Coral sunset
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
      accent: '#f97316', // Neon orange
      highlight: '#00f2fe', // Cyan contrast
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
      primary: '#06b6d4',
      accent: '#10b981',
      highlight: '#38bdf8',
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
      primary: '#0284c7',
      accent: '#0891b2',
      highlight: '#ea580c',
    },
  },
};

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (t: ThemeId | 'light' | 'dark') => void;
  textSize: TextSize;
  setTextSize: (s: TextSize) => void;
  cycleTextSize: () => void;
  bgEffects: boolean;
  setBgEffects: (b: boolean) => void;
  profileOpen: boolean;
  setProfileOpen: (open: boolean) => void;
  currentThemeConfig: ThemeConfig;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('gta_theme');
    if (saved && (saved in THEMES)) return saved as ThemeId;
    // Map legacy 'dark' or 'light'
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

  const [profileOpen, setProfileOpen] = useState(false);

  // Set theme safely with backwards-compatibility for 'light' | 'dark'
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

  // Sync to DOM
  useEffect(() => {
    const root = document.documentElement;

    // Remove old classes
    root.classList.remove('theme-vice-ocean', 'theme-vice-neon', 'theme-vice-dark', 'theme-vice-light', 'light', 'dark');
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');

    // Add theme class
    root.classList.add(`theme-${theme}`);
    root.classList.add(theme === 'vice-light' ? 'light' : 'dark');

    // Add font scaling class
    root.classList.add(`text-size-${textSize}`);

    // Update CSS variables
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
  }, [theme, textSize]);

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
