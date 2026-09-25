# 🔧 Troubleshooting Guide

## Common Errors & Solutions

### 1. PowerShell Execution Policy Error

**Error Message:**
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled
```

**Solution:**
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then run your npm commands again.

---

### 2. Module Not Found Errors

**Error Message:**
```
Cannot find module 'three'
Cannot find module '@react-three/fiber'
```

**Solution:**
```bash
# Delete node_modules and lockfile
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Fresh install
npm install
```

---

### 3. TypeScript Errors in Terminal

**Error Message:**
```
Property 'X' does not exist on type 'Y'
Cannot find name 'config'
```

**Solution:**
```bash
# Run type check
npm run type-check

# If errors persist, check:
# 1. All imports are using .ts extension (config.ts not config.js)
# 2. No duplicate files (config.js AND config.ts)
```

---

### 4. Black Screen / Nothing Renders

**Possible Causes & Solutions:**

#### A. WebGL Not Supported
Visit: https://get.webgl.org/
- If you see a spinning cube → WebGL works
- If not → Update graphics drivers or use different browser

#### B. JavaScript Errors
- Open browser console (F12)
- Look for red error messages
- Share the error for specific help

#### C. Canvas Not Loading
```typescript
// Add error boundary in App.tsx
<Suspense fallback={<div>Loading 3D World...</div>}>
  <GameEngine onZoneEnter={handleZoneEnter} />
</Suspense>
```

---

### 5. Port Already in Use

**Error Message:**
```
Port 5173 is already in use
```

**Solution A - Kill existing process:**
```powershell
# Find process using port 5173
netstat -ano | findstr :5173

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F
```

**Solution B - Use different port:**
```bash
npm run dev -- --port 3000
```

---

### 6. Slow Performance / Lag

**Solutions:**

1. **Close other browser tabs**
2. **Disable shadows** in `GameEngine.tsx`:
   ```typescript
   <Canvas shadows={false}>
   ```

3. **Reduce building count** in `CityEnvironment.tsx`:
   ```typescript
   // Remove some items from buildingPositions array
   ```

4. **Increase physics timestep** (less accurate but faster)

5. **Use Chrome** (best WebGL performance)

---

### 7. Controls Not Working

**Problem**: Pressing WASD does nothing

**Solutions:**
1. **Click inside the 3D canvas first**
2. **Check console for errors** (F12)
3. **Refresh page** (Ctrl + R)
4. **Ensure page is focused** (not on another tab)

---

### 8. Mobile Controls Not Showing

**Problem**: Touch controls don't appear on mobile

**Solutions:**
1. **Access from actual mobile device** (not desktop)
2. **Use Chrome DevTools mobile simulation** (F12 → Toggle device toolbar)
3. **Force enable** in `MobileControls.tsx`:
   ```typescript
   const [isMobile, setIsMobile] = useState(true); // Force true
   ```

---

### 9. Zone Panels Not Opening

**Problem**: Walking to zones doesn't show content

**Solutions:**
1. **Get closer** (within 8 meters)
2. **Press E key** manually
3. **Check console** for JavaScript errors
4. **Verify config.ts** has project/skill data

---

### 10. Build Fails

**Error Message:**
```
Build failed
```

**Solution:**
```bash
# Clean build
npm run type-check  # Check for TS errors first

# If type-check passes
npm run build

# If build still fails
rm -rf dist
npm run build
```

---

### 11. Images Not Loading

**Problem**: Profile photo or project images missing

**Solutions:**
1. **Check file paths** in `config.ts`:
   ```typescript
   profileImage: '/profile_img.jpg'  // Must start with /
   ```

2. **Verify files exist** in `/public/` folder

3. **Check file names** (case-sensitive on some servers)

4. **Clear browser cache** (Ctrl + Shift + R)

---

### 12. Deployment Issues

#### Vercel
**Problem**: Build fails on Vercel

**Solution:**
```json
// In package.json, ensure:
"type": "module"

// In vercel.json (create if needed):
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

#### Netlify
**Problem**: 404 on routes

**Solution:**
Create `public/_redirects`:
```
/*    /index.html   200
```

---

## Still Having Issues?

### Debug Checklist
- [ ] Node.js version 18+ installed?
- [ ] `npm install` completed without errors?
- [ ] No red errors in browser console?
- [ ] WebGL working (visit get.webgl.org)?
- [ ] Latest Chrome/Firefox browser?
- [ ] File paths correct (case-sensitive)?
- [ ] Config data properly formatted?

### Get Help
1. **Check browser console** (F12 → Console tab)
2. **Copy exact error message**
3. **Note what you were doing when error occurred**
4. **Check `FIXES_APPLIED.md` for recent changes**

### Useful Commands
```bash
# Check versions
node --version    # Should be 18+
npm --version     # Should be 8+

# Clean restart
rm -rf node_modules package-lock.json
npm install
npm run dev

# Type check only
npm run type-check

# Lint check
npm run lint
```

---

## Performance Tips

### For Low-End Devices
1. Reduce shadow quality
2. Remove post-processing
3. Decrease building count
4. Simplify physics calculations
5. Lower canvas resolution

### For Best Experience
1. Use Chrome browser
2. Close other tabs
3. Ensure good GPU
4. Use wired internet
5. Enable hardware acceleration in browser

---

**Remember**: The 3D portfolio is resource-intensive. A modern device with decent GPU is recommended for best experience.
