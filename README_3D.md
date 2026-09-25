# Portfolio 6 - GTA 6 Inspired 3D Interactive Portfolio 🎮

An immersive 3D portfolio website inspired by GTA 6, featuring a playable open-world environment where visitors can explore your projects, skills, and experience as interactive missions in a Vice City-styled setting.

## ✨ Features

### 🌆 3D Open World
- **Vice City Inspired Environment**: Neon-lit buildings, palm trees, street lights, and retro grid streets
- **Full Physics Simulation**: Realistic movement and collisions using Rapier physics engine
- **Dynamic Lighting**: Neon signs, building windows, and street lights with real-time illumination
- **Post-Processing Effects**: Bloom, chromatic aberration, vignette for that cinematic GTA look

### 🎮 Gameplay Mechanics
- **Third-Person Character Control**: WASD movement, SHIFT to sprint, SPACE to jump
- **Interactive Zones**: 4 distinct areas (Projects, Skills, About, Contact) with holographic markers
- **Drivable Vehicles**: Cars and bikes scattered around the map with physics-based handling
- **Mini-Games**: 
  - ⭐ **Collect Mission**: Gather portfolio stars before time runs out
  - 🎯 **Target Practice**: Test your accuracy in the shooting range
  - 🏎️ **Speed Challenge**: Race against the clock

### 📱 Cross-Platform
- **Desktop**: Full keyboard and mouse controls
- **Mobile**: Touch-optimized on-screen controls (D-pad + action buttons)
- **Responsive**: Adapts to all screen sizes

### 🎨 GTA-Themed UI
- **HUD Overlay**: Health bar, minimap radar, location display, time
- **Mission Briefings**: Portfolio content displayed as GTA-style mission panels
- **Loading Screen**: Authentic GTA 6 loading experience with tips and instructions
- **Neon Aesthetic**: Cyan, purple, and pink color scheme with glitch effects

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### First Run

1. **Install dependencies** using the command above
2. **Start the dev server**: `npm run dev`
3. **Open your browser** to `http://localhost:5173`
4. **Wait for loading screen** (shows controls and objectives)
5. **Start exploring!** Use WASD to move around the city

## 🎮 Controls

### Keyboard (Desktop)
| Key | Action |
|-----|--------|
| `W` `A` `S` `D` | Move character |
| `SPACE` | Jump |
| `SHIFT` | Sprint/Run faster |
| `E` | Interact with zones |
| `F` | Enter/Exit vehicle |
| `MOUSE` | Look around (camera control) |
| `1` | Start Collect Mission |
| `2` | Start Target Practice |
| `3` | Start Race Challenge |
| `ESC` | Close panels |

### Mobile/Touch
- **Left Side**: Virtual D-pad for movement
- **Right Side**: 
  - 🚀 Jump button
  - ⚡ Interact button
- **On-Screen Buttons**: Mini-game triggers

## 🗺️ Interactive Zones

### 1. 🎮 PROJECTS Zone (Cyan)
- **Location**: Downtown area with neon signs
- **Content**: Showcases your development projects
- **Features**: Project cards with tech stack, live demos, and GitHub links

### 2. ⚡ SKILLS Zone (Red)
- **Location**: Near residential buildings
- **Content**: Displays your technical skills by category
- **Features**: Animated skill badges organized by frontend, backend, and tools

### 3. 👤 ABOUT ME Zone (Purple)
- **Location**: City center with tall buildings
- **Content**: Your background and professional profile
- **Features**: Character profile with bio and education

### 4. 📧 CONTACT Zone (Green)
- **Location**: Near palm trees
- **Content**: Ways to connect with you
- **Features**: Email, GitHub, LinkedIn, and resume download links

## 🎯 Mini-Games

### ⭐ Collect Mission (Press 1)
Race against time to collect all portfolio stars
- **Objective**: Click 10 stars in 30 seconds
- **Score**: 100 points per star

### 🎯 Target Practice (Press 2)
Test your accuracy in the shooting range
- **Objective**: Hit moving targets with limited shots
- **Score**: 200 points per target

### 🏎️ Race Challenge (Press 3)
Speed challenge to test your reflexes
- **Objective**: Reach 100% progress in 15 seconds
- **Controls**: Press SPACEBAR to accelerate

## ⚙️ Configuration

Edit your portfolio content in `src/data/config.ts`:

```typescript
const config: SiteConfig = {
  hero: {
    name: 'Your Name',
    role: 'Your Role',
    tagline: 'Your tagline...',
    // ...
  },
  projects: [
    {
      title: 'Project Name',
      description: 'Description...',
      tech: ['Tech1', 'Tech2'],
      repo: 'https://github.com/...',
      // ...
    }
  ],
  // ... more configuration
};
```

## 🛠️ Tech Stack

### Core
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server

### 3D Graphics
- **Three.js** - 3D rendering engine
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Helper components
- **@react-three/rapier** - Physics engine
- **@react-three/postprocessing** - Visual effects

### Styling & Animation
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library

## 📦 Project Structure

```
src/
├── game/                    # 3D game components
│   ├── GameEngine.tsx       # Main 3D canvas & physics
│   ├── Player.tsx          # Player character controller
│   ├── CityEnvironment.tsx # Buildings, streets, decorations
│   ├── InteractiveZones.tsx # Portfolio zone markers
│   ├── Vehicles.tsx        # Cars and bikes
│   └── MiniGames.tsx       # Game missions
├── components/              # UI components
│   ├── GameHUD.tsx         # Health, minimap, stats
│   ├── ZonePanel.tsx       # Mission briefing UI
│   ├── LoadingScreen.tsx   # GTA-style loader
│   └── MobileControls.tsx  # Touch controls
├── data/
│   └── config.ts           # Portfolio content
├── types/
│   └── game.ts             # TypeScript interfaces
└── App.tsx                 # Main application
```

## 🎨 Customization

### Change Theme Colors
Edit `src/data/config.ts`:
```typescript
theme: {
  colors: {
    primary: '#8b5cf6',    // Purple
    accent: '#06b6d4',     // Cyan
    // ...
  }
}
```

### Add New Buildings
Edit `src/game/CityEnvironment.tsx`:
```typescript
const buildingPositions = [
  { pos: [x, 0, z], size: [w, h, d], color: '#1a1a2e' },
  // Add more buildings
];
```

### Add New Mini-Games
Create new game component in `src/game/MiniGames.tsx` and add trigger in `App.tsx`

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build command
npm run build

# Publish directory
dist
```

### GitHub Pages
```bash
# Add to vite.config.ts
base: '/your-repo-name/'

# Build and deploy
npm run build
gh-pages -d dist
```

## 🐛 Troubleshooting

### Performance Issues
- Reduce building count in `CityEnvironment.tsx`
- Lower post-processing quality in `GameEngine.tsx`
- Disable shadows on lower-end devices

### Controls Not Working
- Ensure you're clicking inside the 3D canvas
- Check browser console for errors
- Try refreshing the page

### Mobile Controls Not Showing
- Touch screen detection should be automatic
- Force mobile mode by setting `isMobile = true` in `MobileControls.tsx`

## 📄 License

MIT License - Feel free to use this for your own portfolio!

## 🙏 Credits

- Inspired by **GTA 6** and **Rockstar Games** aesthetics
- Built with **React Three Fiber** ecosystem
- Not affiliated with Rockstar Games

## 📞 Support

If you encounter issues or have questions:
- Open an issue on GitHub
- Check the browser console for error messages
- Ensure all dependencies are installed correctly

---

**Created with ❤️ using React Three Fiber**

*Welcome to Los Portfolio. Time to explore.*
