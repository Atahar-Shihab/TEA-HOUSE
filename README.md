# 🍵 The Tea House — 5D & 3D Cinematic Sensory Experience

[![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![WebGL](https://img.shields.io/badge/WebGL-2.0-990000?style=for-the-badge&logo=webgl)](https://www.khronos.org/webgl/)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio-5D%20Procedural-0055ff?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](#)

> An award-winning, state-of-the-art sensory showcase of modern frontend development. Bridging ancient high-mountain tea craftsmanship with **5D immersive sensory audio**, **real-time 3D WebGL particle physics**, and **glassmorphic spatial aesthetics**.

---

## ✨ 5D & 3D Cinematic Highlights

### 🍃 1. Real-Time 3D WebGL Botanical Scene (`Three.js`)
- **Organic 3D Tea Leaves**: Parametric curved leaf meshes with lifelike veins, double-sided materials, and realistic 3D tumbling physics.
- **Dynamic Physics Repulsion**: Leaves naturally float, sway in mountain breezes, and gently react to the user's cursor movements.
- **Volumetric Steam & Golden Aroma Dust**: Hundreds of glowing amber bokeh particles and rising steam vapor simulation.
- **Spatial Parallax Camera**: Camera depth smoothly translates and rotates in response to cursor coordinates and scroll momentum.

### 🎴 2. Ultra-Modern Cards, Hover Physics & Parallax Depths
- **Multi-Layer 3D Z-Depth**: True `preserve-3d` spatial hierarchy where the tea vessel floats forward (`translateZ(68px) scale(1.08)`), floating above glowing ambient light auras.
- **Luminous Border Beam**: Interactive rotating conic-gradient border trail that activates on card hover.
- **Dynamic Spotlight Tracking**: Realistic flashlight effect following the cursor coordinates across frosted glass surfaces.
- **Blend-Specific Glowing Auras**: Tailored ambient lighting for Hokkaido Milk Tea (amber), Yunnan Black (ruby bronze), Ceremonial Uji Jade (emerald), and Sicilia Lemon (sunburst gold).
- **Tactile Audio Feedback**: Micro-chimes triggered when gliding between cards for an auditory tactile feel.

### 🍱 3. Interactive Luxury Craftsmanship Bento Grid
- **Card 1: High-Altitude Mountain Terroir**: Interactive elevation toggle (`2,200m` to `2,600m`), animated topographic SVG contour lines, and live mist density telemetry.
- **Card 2: Sun-Withered Leaf Anatomy (`fresh-1.png`)**: High-resolution zoom on hover with floating botanical inspection badge.
- **Card 3: Charcoal Slow-Roast (`fresh-2.png`)**: Thermal heat map simulation with floating glowing embers and 115°C wok roasting gauge.
- **Card 4: Glacier Spring Mineral Equilibrium**: Animated TDS mineral purity meter (48 ppm) with neutral alkaline pH 7.2 indicator.

### 👥 4. 3D Perspective Testimonial Stack
- Interactive 3D deck of stacked review cards with realistic perspective depth (`translateZ`, `scale`, and `translateY`).
- Smooth spring-eased switching between verified connoisseurs, sommeliers, and restaurateurs.

### 📰 5. Editorial Gazette & Quick-Read Modal
- High-resolution dispatches (`news-1.png`, `news-2.png`, `news-3.png`) exploring Gongfu tea ceremonies, Alishan mountain expeditions, and the neuroscience of L-Theanine.
- Interactive **Quick-Read Drawer Modal** with drop-caps, quotes, and reading time progress.
- Interactive bookmark button with micro-animation and toast feedback.

### 🎧 6. Procedural 5D Binaural Soundscape (`Web Audio API`)
- **Pure Code Synthesis**: **Zero external audio file dependencies** — runs 100% offline with zero CORS or network latency issues.
- **Mountain Sanctuary Ambiance**: Procedural pink noise filtered with low-frequency oscillators to simulate mountain gusts rustling through bamboo canopies.
- **Harmonic Singing Bowl**: Resonant 216Hz and 432Hz sine/triangle harmonics creating deep zen tranquility.
- **Tactile Ceramic Chimes**: Crisp harmonic teacup chimes and bubbling water-pour audio triggered on card interactions, modal openings, and brewing rituals.
- **Live Visualizer Equalizer**: Interactive audio pill with animated equalizer bars and volume slider.

### 🫖 7. Interactive Virtual Tea Ceremony Chamber
- **Step-by-Step Brewing Studio**:
  1. Choose between **Green Jade**, **Hokkaido Milk Velvet**, **Yunnan Black**, or **Sicilia Lemon**.
  2. Adjust live **Water Temperature** (60°C to 100°C) with real-time kettle glow illumination.
  3. Set **Steep Duration** (5s to 30s).
  4. Click **Infuse & Steep** to watch the digital teacup fill with blend-specific liquid color transitions, wave surface animations, boiling water acoustics, steeping countdown, and aroma notes reveal!

### 📦 8. Interactive Tasting Box (Cart) Drawer & Confetti Bursts
- Slide-out glassmorphic drawer with real-time subtotal calculations, quantity modifiers, and item removal.
- Physical leaf particle confetti bursts on "Add to Box" and checkout triggers.
- Non-intrusive luxury toast notification system for instant feedback.

---

## 🗂️ Project Architecture

```
TEA-HOUSE/
├── index.html              # Main 5D/3D cinematic showcase interface
├── css/
│   └── style.css           # Glassmorphism, 3D tilt styles, border beam, custom cursor, animations
├── js/
│   ├── audio-ambience.js   # Procedural Web Audio API soundscape generator
│   ├── three-background.js # Three.js WebGL 3D leaves & volumetric steam engine
│   └── main.js             # UI state, 3D tilt physics, bento widgets, reader modal, cart drawer
├── images/                 # Optimized visual assets, icons & journal imagery
│   ├── banner.png          # Hero tea vessel
│   ├── tea-1.png           # Hokkaido Milk Tea
│   ├── tea-2.png           # Imperial Golden Yunnan
│   ├── tea-3.png           # Ceremonial Uji Jade
│   ├── tea-4.png           # Sicilia Bergamot Sunburst
│   ├── fresh-1.png         # Sun-withered tea leaves
│   ├── fresh-2.png         # Charcoal slow-roasting
│   ├── news-1.png          # Gongfu tea ceremony dispatch
│   ├── news-2.png          # Mountain harvest expedition
│   ├── news-3.png          # Neuroscience of L-Theanine
│   ├── client.png          # Connoisseur avatar
│   └── cup.png             # Tea House luxury insignia
└── README.md               # Documentation & architectural overview
```

---

## 🚀 Getting Started

No build step or bundler is required! You can open and view the project directly in any modern browser:

### Option 1: Direct File Open
Double-click `index.html` in your file explorer, or drag and drop it into Chrome, Edge, Safari, or Firefox.

### Option 2: Local HTTP Server (Recommended)
Using Python:
```bash
python -m http.server 8000
```
Then navigate to: `http://localhost:8000`

Using Node.js:
```bash
npx serve .
```

---

## 🎨 Visual Aesthetics & Palette

| Element | Hex Color | Role |
| :--- | :--- | :--- |
| **Obsidian Dark** | `#0b0f14` | Atmospheric background |
| **Tea Amber** | `#ff7a18` | Primary warm gradient accent |
| **Sunburst Red** | `#ff3e00` | High-energy gradient transition |
| **Imperial Gold** | `#e6a623` | Single-estate reserve highlight |
| **Matcha Jade** | `#3d7023` | First flush botanical greenery |
| **Frosted Glass** | `rgba(255,255,255,0.06)` | Backdrop blur glassmorphic cards |

---

## 📱 Device Compatibility & Performance
- **Fluid 60+ FPS**: Built with GPU-accelerated transforms, WebGL instancing, and throttled animation frames.
- **Responsive Layout**: Designed for mobile, tablet, laptop, and ultra-wide desktop monitors.
- **Touch-Friendly**: Automatic graceful degradation for mobile touch devices (disabling cursor followers while preserving tactile card physics).

---

## 📜 License
MIT License. Created with passion as a showcase of modern frontend engineering.
