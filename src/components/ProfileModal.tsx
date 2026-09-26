import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useTheme,
  THEMES,
  ThemeId,
  TextSize,
  WALLPAPERS,
  BgOverlayMode,
} from '../context/ThemeContext';
import config from '../data/config';

export default function ProfileModal() {
  const {
    theme,
    setTheme,
    textSize,
    setTextSize,
    bgEffects,
    setBgEffects,
    bgOverlay,
    setBgOverlay,
    wallpaper,
    setWallpaper,
    profileOpen,
    setProfileOpen,
  } = useTheme();

  const [customUrl, setCustomUrl] = useState('');
  const [customError, setCustomError] = useState('');

  if (!profileOpen) return null;

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    try {
      new URL(customUrl.trim());
      setWallpaper(customUrl.trim());
      setCustomError('');
    } catch {
      setCustomError('Please enter a valid HTTP/HTTPS image URL');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setProfileOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window (GTA VI HUD Style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#041224]/95 border-2 border-primary shadow-2xl shadow-primary/30 overflow-hidden z-10 my-8 text-white"
          style={{
            clipPath:
              'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
          }}
        >
          {/* Header Bar */}
          <div className="bg-black/85 border-b border-primary/40 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-accent rounded-full animate-ping" />
              <h2 className="font-hud text-lg sm:text-xl font-bold tracking-widest text-accent uppercase">
                PORTFOLIO CUSTOMIZER &amp; PROFILE HUD
              </h2>
            </div>
            <button
              onClick={() => setProfileOpen(false)}
              className="text-gray-400 hover:text-white font-hud font-bold text-sm px-2.5 py-1 border border-accent/30 hover:border-accent transition-colors"
            >
              ESC ✕
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Character Header Card */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-black/50 border border-primary/30">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 border-2 border-primary overflow-hidden">
                <img
                  src={config.hero.profileImage}
                  alt={config.hero.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-primary text-black font-hud text-[10px] font-bold px-1.5 py-0.5">
                  LVL 99
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left space-y-1">
                <div className="inline-block px-2 py-0.5 bg-primary/20 text-accent font-hud text-xs font-bold tracking-wider mb-1">
                  STATUS: AVAILABLE FOR HIRE
                </div>
                <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                  {config.hero.name}
                </h3>
                <p className="text-accent font-medium text-sm">
                  {config.hero.role} • Savitribai Phule Pune University
                </p>
                <p className="text-gray-400 text-xs pt-1">
                  Java, Spring Boot, React.js, Django, PostgreSQL
                </p>
              </div>
            </div>

            {/* 1. BLUE OVERLAY REMOVAL / ADJUSTMENT SECTION */}
            <div className="p-4 bg-black/60 border border-accent/40 rounded-none">
              <div className="flex items-center justify-between mb-2">
                <label className="font-hud text-sm font-bold text-accent tracking-wider flex items-center gap-2">
                  <span>🎭</span> BACKGROUND BLUE OVERLAY LAYER
                </label>
                <span className="text-xs font-mono font-bold text-primary">
                  CURRENT: {bgOverlay.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-gray-300 mb-3">
                Remove the blue overlay layer to view the background image in 100% natural, crisp, original daylight colors!
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {(
                  [
                    {
                      id: 'none',
                      label: 'OFF (Clear Image)',
                      desc: '0% Blue tint layer (Natural wallpaper)',
                    },
                    {
                      id: 'subtle',
                      label: 'Subtle Scrim',
                      desc: 'Minimal dark edge vignette',
                    },
                    {
                      id: 'tinted',
                      label: 'Themed Tint',
                      desc: 'Full atmospheric colored overlay',
                    },
                  ] as Array<{ id: BgOverlayMode; label: string; desc: string }>
                ).map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setBgOverlay(opt.id)}
                    className={`p-3 text-left border transition-all ${
                      bgOverlay === opt.id
                        ? 'border-accent bg-accent/20 text-white font-bold shadow-md shadow-accent/25'
                        : 'border-white/10 bg-black/40 text-gray-400 hover:border-accent/50 hover:text-white'
                    }`}
                  >
                    <div className="font-hud text-xs sm:text-sm font-bold">{opt.label}</div>
                    <div className="text-[10px] text-gray-400 mt-1 line-clamp-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. BACKGROUND IMAGE SELECTION (FROM INTERNET & LOCAL) */}
            <div className="p-4 bg-black/60 border border-primary/40 rounded-none">
              <div className="flex items-center justify-between mb-2">
                <label className="font-hud text-sm font-bold text-accent tracking-wider flex items-center gap-2">
                  <span>🖼️</span> BACKGROUND WALLPAPER (INTERNET &amp; LOCAL)
                </label>
                <span className="text-xs font-mono text-gray-400">
                  {WALLPAPERS.length} PRESETS
                </span>
              </div>
              <p className="text-xs text-gray-300 mb-3">
                Select from high-resolution GTA VI ocean wallpapers from the internet or enter any custom image URL.
              </p>

              {/* Wallpaper Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {WALLPAPERS.map((wp) => {
                  const isSelected = wallpaper === wp.url;
                  return (
                    <button
                      key={wp.id}
                      onClick={() => setWallpaper(wp.url)}
                      className={`group relative overflow-hidden border text-left transition-all ${
                        isSelected
                          ? 'border-accent ring-2 ring-accent/60 shadow-lg shadow-accent/30'
                          : 'border-white/15 opacity-70 hover:opacity-100 hover:border-accent/60'
                      }`}
                    >
                      <div className="h-20 sm:h-24 w-full bg-black overflow-hidden relative">
                        <img
                          src={wp.thumbnail}
                          alt={wp.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-primary/25 border-2 border-accent flex items-center justify-center">
                            <span className="font-hud text-[11px] font-bold text-white bg-black/80 px-2 py-0.5 border border-accent">
                              ACTIVE ✓
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-2 bg-black/80">
                        <div className="font-hud text-[11px] font-bold text-white line-clamp-1">
                          {wp.name}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Internet URL Input */}
              <form onSubmit={handleApplyCustomUrl} className="space-y-2">
                <label className="block text-[11px] font-hud text-gray-300">
                  ENTER CUSTOM IMAGE URL FROM THE INTERNET:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://example.com/wallpaper.jpg"
                    className="input-base text-xs py-2 flex-1"
                  />
                  <button
                    type="submit"
                    className="gta-button-primary text-xs py-2 px-4 whitespace-nowrap"
                  >
                    APPLY URL
                  </button>
                </div>
                {customError && <p className="text-red-400 text-xs">{customError}</p>}
              </form>
            </div>

            {/* 3. TOKEN-BASED THEME SELECTOR */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-hud text-sm font-bold text-accent tracking-wider flex items-center gap-2">
                  <span>🎨</span> SELECT THEME (TOKEN-BASED)
                </label>
                <span className="text-xs text-gray-400 font-mono">
                  ACTIVE: {THEMES[theme]?.name}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(THEMES) as ThemeId[]).map((themeKey) => {
                  const t = THEMES[themeKey];
                  const isSelected = theme === themeKey;
                  return (
                    <button
                      key={themeKey}
                      onClick={() => setTheme(themeKey)}
                      className={`text-left p-3.5 border transition-all duration-300 flex items-start gap-3 relative ${
                        isSelected
                          ? 'border-primary bg-primary/20 shadow-lg shadow-primary/20'
                          : 'border-white/10 bg-black/40 hover:border-primary/50 hover:bg-black/60'
                      }`}
                    >
                      <span className="text-2xl">{t.badge}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-sm text-white">
                            {t.name}
                          </span>
                          {isSelected && (
                            <span className="font-hud text-[10px] text-accent bg-accent/20 px-1.5 py-0.5 border border-accent/50">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                          {t.description}
                        </p>
                        <div className="flex gap-1.5 mt-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: t.colors.primary }}
                            title="Primary Token"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: t.colors.accent }}
                            title="Accent Token"
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: t.colors.highlight }}
                            title="Highlight Token"
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. ADJUSTABLE TEXT SIZING */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-hud text-sm font-bold text-accent tracking-wider flex items-center gap-2">
                  <span>🔤</span> ADJUSTABLE TEXT SIZING
                </label>
                <span className="text-xs text-gray-400 font-mono">
                  CURRENT: {textSize.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {(
                  [
                    { id: 'normal', label: 'Regular', scale: '100%' },
                    { id: 'large', label: 'Large (Badi)', scale: '112%' },
                    { id: 'xlarge', label: 'Extra Large', scale: '125%' },
                  ] as Array<{ id: TextSize; label: string; scale: string }>
                ).map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setTextSize(size.id)}
                    className={`py-3 px-2 border text-center transition-all duration-200 ${
                      textSize === size.id
                        ? 'border-accent bg-accent/20 text-white font-bold'
                        : 'border-white/10 bg-black/40 text-gray-400 hover:border-accent/50 hover:text-white'
                    }`}
                  >
                    <div className="font-display font-semibold text-sm">{size.label}</div>
                    <div className="font-hud text-xs text-accent">{size.scale}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ambient Effects Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-black/40 border border-white/10">
              <div>
                <div className="font-display font-bold text-sm text-white">
                  Parallax &amp; Motion Drift
                </div>
                <div className="text-xs text-gray-400">
                  Subtle mouse-tracking background movement
                </div>
              </div>
              <button
                onClick={() => setBgEffects(!bgEffects)}
                className={`px-3 py-1 font-hud text-xs font-bold border transition-colors ${
                  bgEffects
                    ? 'border-accent bg-accent text-black'
                    : 'border-gray-600 bg-transparent text-gray-400'
                }`}
              >
                {bgEffects ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>

            {/* Actions Footer */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={config.contact.resumeUrl}
                download
                className="flex-1 min-w-[140px] gta-button-primary text-center text-xs py-2.5"
              >
                DOWNLOAD RESUME / CV
              </a>
              <button
                onClick={() => setProfileOpen(false)}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-hud text-xs font-bold border border-white/20 transition-colors ml-auto"
              >
                SAVE &amp; CLOSE
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
