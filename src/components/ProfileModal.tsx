import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, THEMES, ThemeId, TextSize } from '../context/ThemeContext';
import config from '../data/config';

export default function ProfileModal() {
  const {
    theme,
    setTheme,
    textSize,
    setTextSize,
    bgEffects,
    setBgEffects,
    profileOpen,
    setProfileOpen,
  } = useTheme();

  if (!profileOpen) return null;

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
          className="relative w-full max-w-2xl bg-surface/95 border-2 border-cyan-400 shadow-2xl shadow-cyan-500/30 overflow-hidden z-10 my-8 text-white"
          style={{
            clipPath:
              'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
          }}
        >
          {/* Header Bar */}
          <div className="bg-black/80 border-b border-cyan-400/40 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
              <h2 className="font-hud text-lg sm:text-xl font-bold tracking-widest text-cyan-400 uppercase">
                AGENT PROFILE &amp; CUSTOMIZER HUD
              </h2>
            </div>
            <button
              onClick={() => setProfileOpen(false)}
              className="text-gray-400 hover:text-white font-hud font-bold text-sm px-2.5 py-1 border border-cyan-400/30 hover:border-cyan-400 transition-colors"
            >
              ESC ✕
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Character Header Card */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-black/50 border border-cyan-400/30">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 border-2 border-cyan-400 overflow-hidden">
                <img
                  src={config.hero.profileImage}
                  alt={config.hero.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-cyan-400 text-black font-hud text-[10px] font-bold px-1.5 py-0.5">
                  LVL 99
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left space-y-1">
                <div className="inline-block px-2 py-0.5 bg-cyan-400/20 text-cyan-400 font-hud text-xs font-bold tracking-wider mb-1">
                  STATUS: AVAILABLE FOR HIRE
                </div>
                <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                  {config.hero.name}
                </h3>
                <p className="text-cyan-300 font-medium text-sm">
                  {config.hero.role} • Savitribai Phule Pune University
                </p>
                <p className="text-gray-400 text-xs pt-1">
                  Pune, Maharashtra, India • Java, Spring Boot, React.js, Django
                </p>
              </div>
            </div>

            {/* Theme Selector Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-hud text-sm font-bold text-cyan-400 tracking-wider flex items-center gap-2">
                  <span>🎨</span> SELECT PORTFOLIO THEME
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
                          ? 'border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/20'
                          : 'border-white/10 bg-black/40 hover:border-cyan-400/50 hover:bg-black/60'
                      }`}
                    >
                      <span className="text-2xl">{t.badge}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-sm text-white">
                            {t.name}
                          </span>
                          {isSelected && (
                            <span className="font-hud text-[10px] text-cyan-400 bg-cyan-400/20 px-1.5 py-0.5 border border-cyan-400/50">
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
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: t.colors.accent }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: t.colors.background }}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Font & Text Sizing Control */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-hud text-sm font-bold text-cyan-400 tracking-wider flex items-center gap-2">
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
                        ? 'border-cyan-400 bg-cyan-500/20 text-white font-bold'
                        : 'border-white/10 bg-black/40 text-gray-400 hover:border-cyan-400/50 hover:text-white'
                    }`}
                  >
                    <div className="font-display font-semibold text-sm">{size.label}</div>
                    <div className="font-hud text-xs text-cyan-400">{size.scale}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ambient Effects Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-black/40 border border-white/10">
              <div>
                <div className="font-display font-bold text-sm text-white">
                  Ocean Ambient Parallax &amp; Water Shimmer
                </div>
                <div className="text-xs text-gray-400">
                  Dynamic GTA VI background animations and water caustics
                </div>
              </div>
              <button
                onClick={() => setBgEffects(!bgEffects)}
                className={`px-3 py-1 font-hud text-xs font-bold border transition-colors ${
                  bgEffects
                    ? 'border-cyan-400 bg-cyan-400 text-black'
                    : 'border-gray-600 bg-transparent text-gray-400'
                }`}
              >
                {bgEffects ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={config.contact.resumeUrl}
                download
                className="flex-1 min-w-[140px] gta-button-primary text-center text-xs py-2.5"
              >
                DOWNLOAD RESUME / CV
              </a>
              <a
                href={`mailto:${config.contact.email}`}
                className="flex-1 min-w-[140px] gta-button-secondary text-center text-xs py-2.5"
              >
                CONTACT AGENT
              </a>
              <button
                onClick={() => setProfileOpen(false)}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-hud text-xs font-bold border border-white/20 transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
