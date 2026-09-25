# Setup Guide for Portfolio 6 - 3D Interactive Portfolio

This guide will help you get your GTA 6-inspired 3D portfolio up and running.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome, Firefox, Edge, Safari)

## Step-by-Step Installation

### 1. Install Dependencies

Open your terminal/PowerShell in the project directory and run:

```bash
npm install
```

If you see PowerShell execution policy errors on Windows, run:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm install
```

### 2. Verify Installation

Check that these packages are installed:
```bash
npm list three @react-three/fiber @react-three/drei @react-three/rapier @react-three/postprocessing
```

You should see:
- `three@^0.163.0`
- `@react-three/fiber@^8.16.2`
- `@react-three/drei@^9.105.4`
- `@react-three/rapier@^1.3.0`
- `@react-three/postprocessing@^2.16.2`

### 3. Configure Your Portfolio

Edit `src/data/config.ts` with your information:

```typescript
const config: SiteConfig = {
  hero: {
    name: 'Your Name',              // Change this
    role: 'Your Role',              // Change this
    tagline: 'Your bio...',         // Change this
    profileImage: '/your-photo.jpg' // Add your photo to /public
  },
  
  projects: [
    {
      title: 'Your Project',
      description: 'Project description...',
      tech: ['React', 'Node.js'],
      repo: 'https://github.com/yourname/project',
      demo: 'https://demo-link.com',
      images: ['/project-image.png'],
      details: 'Detailed description...'
    }
    // Add more projects
  ],
  
  skills: {
    frontend: ['React', 'Vue', 'Angular'],
    backend: ['Node.js', 'Python', 'Java'],
    tools: ['Git', 'Docker', 'AWS']
  },
  
  contact: {
    email: 'your.email@example.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    resumeUrl: '/your-resume.pdf'
  }
};
```

### 4. Add Your Assets

Place your files in the `public` folder:
- **Profile photo**: `public/profile_img.jpg`
- **Resume**: `public/Your_Resume.pdf`
- **Project images**: `public/project1.png`, etc.

### 5. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### 6. First Launch

When you open the site:
1. **Loading screen** appears (10 seconds)
2. **Instructions** are shown
3. You spawn in the 3D city
4. Use **WASD** to move around
5. Approach **glowing zones** to interact

## Common Issues & Solutions

### Issue: "Cannot find module 'three'"
**Solution**: Run `npm install` again to ensure all dependencies are installed.

### Issue: Black screen or no 3D rendering
**Solution**: 
- Check browser console for errors (F12)
- Ensure WebGL is supported: visit [get.webgl.org](https://get.webgl.org/)
- Try a different browser
- Update your graphics drivers

### Issue: Performance is slow
**Solution**:
- Close other browser tabs
- Reduce graphics quality (edit `GameEngine.tsx`)
- Try disabling post-processing effects

### Issue: PowerShell execution policy error
**Solution**:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Issue: Controls not responding
**Solution**:
- Click inside the 3D canvas first
- Refresh the page
- Check browser console for JavaScript errors

### Issue: Mobile controls not showing
**Solution**:
- Access from a mobile device or tablet
- Simulate mobile in Chrome DevTools (F12 → Device toolbar)
- Force enable in `MobileControls.tsx` by setting `isMobile = true`

## Building for Production

### Build the project
```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### Preview production build locally
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
1. Drag the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repo to Netlify

### Deploy to GitHub Pages
```bash
npm install gh-pages --save-dev
npm run build
npx gh-pages -d dist
```

## Testing the Site

### Desktop Testing Checklist
- [ ] Can move with WASD
- [ ] Can jump with SPACE
- [ ] Can sprint with SHIFT
- [ ] Camera follows player smoothly
- [ ] Can interact with zones (E key)
- [ ] Zone panels display correctly
- [ ] Mini-games work (keys 1, 2, 3)
- [ ] Can enter vehicles (F key)
- [ ] HUD displays correctly
- [ ] Minimap shows position

### Mobile Testing Checklist
- [ ] Touch controls appear
- [ ] D-pad moves character
- [ ] Action buttons work
- [ ] Zone interactions work
- [ ] UI is readable on small screens
- [ ] Performance is acceptable

## Customization Guide

### Change City Layout
Edit `src/game/CityEnvironment.tsx` - modify `buildingPositions` array

### Add More Vehicles
Edit `src/game/Vehicles.tsx` - add items to `vehicles` array

### Modify Zone Locations
Edit `src/game/InteractiveZones.tsx` - change `position` values in `zones` array

### Adjust Colors/Theme
Edit `src/data/config.ts` - modify `theme.colors` values

### Add New Mini-Games
1. Create game component in `src/game/MiniGames.tsx`
2. Add trigger button in `src/App.tsx`
3. Bind to keyboard shortcut

## Performance Optimization

For better performance on lower-end devices:

1. **Reduce building count** (CityEnvironment.tsx)
2. **Lower shadow quality** (GameEngine.tsx - reduce shadow-mapSize)
3. **Disable post-processing** (Comment out EffectComposer in GameEngine.tsx)
4. **Reduce physics calculations** (Increase physics timestep in Rapier)
5. **Optimize textures** (Compress images in public folder)

## Need Help?

- 📖 Check the main [README_3D.md](README_3D.md)
- 🐛 Check browser console for errors (F12)
- 💬 Open an issue on GitHub
- 📧 Contact via the info in config.ts

## Next Steps

1. ✅ Customize your content in `config.ts`
2. ✅ Add your photos and resume to `/public`
3. ✅ Test all features locally
4. ✅ Build for production
5. ✅ Deploy to your hosting platform
6. ✅ Share your amazing 3D portfolio!

---

**Welcome to Portfolio 6. Let's build something amazing! 🚀**
