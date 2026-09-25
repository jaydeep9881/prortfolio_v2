# 🚀 Quick Start - Get Running in 5 Minutes

## Step 1: Install Dependencies (2 min)

Open PowerShell/Terminal in this folder and run:

```bash
npm install
```

**Note for Windows users**: If you get execution policy errors, run this first:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

## Step 2: Start the Development Server (1 min)

```bash
npm run dev
```

Wait for: `Local: http://localhost:5173/`

## Step 3: Open in Browser (30 sec)

Open your browser and go to: **http://localhost:5173**

## Step 4: Experience Your 3D Portfolio! (1.5 min)

### Loading Screen
- Wait ~10 seconds for loading
- Read the controls and objectives
- Loading bar fills to 100%

### Start Playing
1. **Move**: Use `W` `A` `S` `D` keys
2. **Look around**: Move your mouse
3. **Sprint**: Hold `SHIFT` while moving
4. **Jump**: Press `SPACE`

### Explore the City
You'll see **4 glowing zones** with different colors:
- 🎮 **CYAN** = Projects
- ⚡ **RED** = Skills  
- 👤 **PURPLE** = About
- 📧 **GREEN** = Contact

### Interact with Zones
1. Walk close to any glowing zone
2. Press `E` to open the mission briefing
3. View your portfolio content in GTA-style UI

### Try Mini-Games
- Press `1` = ⭐ Collect stars
- Press `2` = 🎯 Target practice
- Press `3` = 🏎️ Race challenge

### Drive Vehicles
- Walk up to a car or bike
- Press `F` to enter
- Use same controls to drive!

## That's It! 🎉

You're now exploring your portfolio in 3D like GTA 6!

---

## Next Steps (Optional)

### Customize Your Content
Edit `src/data/config.ts` with your info:
- Name, role, bio
- Projects (title, description, links)
- Skills (frontend, backend, tools)
- Contact info (email, GitHub, LinkedIn)

### Add Your Photos
Place files in the `public` folder:
- `profile_img.jpg` - Your profile photo
- `Your_Resume.pdf` - Your resume
- Project screenshots

### Deploy Online
```bash
# Build for production
npm run build

# Deploy to Vercel (recommended)
npm i -g vercel
vercel
```

---

## Controls Cheat Sheet

| Action | Key |
|--------|-----|
| Move | `W` `A` `S` `D` |
| Jump | `SPACE` |
| Sprint | `SHIFT` |
| Interact | `E` |
| Enter Vehicle | `F` |
| Mini-Game 1 | `1` |
| Mini-Game 2 | `2` |
| Mini-Game 3 | `3` |
| Close Panel | `ESC` |

---

## Troubleshooting

### Black Screen?
- Refresh the page (F5)
- Check browser console (F12)
- Try Chrome or Firefox

### No 3D Graphics?
- Visit [get.webgl.org](https://get.webgl.org/) to check WebGL support
- Update your graphics drivers

### Slow Performance?
- Close other browser tabs
- Use Chrome for best performance
- Lower graphics quality (see SETUP.md)

### Need Help?
See detailed guides:
- 📖 [SETUP.md](SETUP.md) - Full installation guide
- 📖 [README_3D.md](README_3D.md) - Complete documentation

---

**Welcome to Los Portfolio! Time to explore. 🌆**
