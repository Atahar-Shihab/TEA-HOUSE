# 🍵 The Tea House — Single-Origin Artisanal Sanctuary

[![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![WebGL](https://img.shields.io/badge/WebGL-2.0-990000?style=for-the-badge&logo=webgl)](https://www.khronos.org/webgl/)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio-5D%20Procedural-0055ff?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](#)

> An award-winning, state-of-the-art sensory showcase of modern frontend development. Bridging ancient high-mountain tea craftsmanship with **5D immersive sensory audio**, **real-time 3D WebGL particle physics**, and **refined, professional glassmorphism**.

---

## ✨ Professional & Responsive Highlights

### 🎴 1. Professional, Non-Breaking Cards & Refined Hover Physics
- **Rock-Solid Responsive Grid**: Formatted as 1 column on mobile, 2 columns on tablet, and 4 columns on desktop.
- **Natural, Reliable Layout**: Buttons and prices remain perfectly aligned using flex alignment (`mt-auto`) with zero text overlapping or card clipping.
- **Silky Elevation Transitions**: Cards lift smoothly (`transform: translateY(-6px)`) on hover with refined cubic-bezier transitions (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Subtle Cursor Spotlight**: Gentle specular light tracks the user's cursor across frosted glass surfaces without any disruptive 3D distortion or font blurring.
- **Subtle Ambient Auras**: Tailored amber, ruby, emerald, and gold ambient glows matching each signature blend.

### 🍱 2. Responsive Craftsmanship Bento Grid
- **Adaptive Layout**: Stacks into comfortable cards on mobile screens and dynamically arranges into a 2-column bento layout on desktop.
- **Interactive Mountain Terroir**: Interactive peak altitude toggle (`2,200m` to `2,600m`), animated contour lines, and harvest telemetry.
- **High-Resolution Photography**: Inspect sun-withered leaves (`fresh-1.png`) and charcoal slow-roast curing (`fresh-2.png`).
- **Water Purity Gauge**: Mineral equilibrium indicators displaying 48 ppm TDS and pH 7.2 alkaline harmony.

### 📱 3. Complete Mobile & Tablet Responsiveness
- **Mobile Navigation Drawer**: Accessible hamburger menu toggle with smooth glassmorphic dropdown and instant section scrolling.
- **Fluid Typography**: Dynamic clamp-based headlines that scale gracefully from small smartphones (320px) to ultra-wide desktop monitors.
- **Touch-Friendly Controls**: Minimum 40px touch targets for buttons, tabs, sliders, and audio controls.

### 👥 4. Responsive Connoisseur Review Carousel
- **Dynamic Content Height**: Automatically adapts to review lengths with zero card overflow or text truncation.
- **Interactive Controls**: Touch-friendly previous and next buttons with animated pagination dots.

### 🫖 5. Virtual Tea Brewing Simulator
- **Step-by-Step Ceremony**:
  1. Select harvest blend (Green Jade, Hokkaido Milk Velvet, Yunnan Black, Sicilia Lemon).
  2. Adjust water temperature (60°C to 100°C) with interactive heating glow.
  3. Adjust steep duration (5s to 30s) with live countdown timer.
  4. Watch the virtual teacup infuse with animated surface waves, color transitions, boiling water soundscapes, and aroma profile reveal.

### 🎧 6. Procedural 5D Binaural Soundscape (`Web Audio API`)
- **100% Code-Synthesized**: Zero external audio asset dependencies — runs completely offline.
- **Mountain Sanctuary Ambiance**: Procedural pink noise with low-frequency oscillator modulation simulating gentle wind gusts.
- **Resonant Singing Bowl**: 216Hz and 432Hz harmonic relaxation frequencies.
- **Tactile Sound Effects**: Ceramic teacup pings and bubbling water pour acoustics.
- **Interactive Equalizer**: Audio pill with live spectrum visualizer bars.

### 📦 7. Tasting Box (Cart) Drawer & Quick-Read Modals
- Slide-out glassmorphic cart drawer with item quantity modifiers, removal, and live subtotal calculations.
- Quick product tasting modal with caffeine spectrum and brewing parameters.
- Gazette quick-read modal with article bookmarks and reading list toasts.

---

## 🗂️ Project Architecture

```
TEA-HOUSE/
├── index.html              # Main responsive showcase interface
├── css/
│   └── style.css           # Professional design system, cards, hover transitions
├── js/
│   ├── audio-ambience.js   # Procedural Web Audio API soundscape generator
│   ├── three-background.js # Three.js WebGL ambient background engine
│   └── main.js             # UI state, carousel, mobile menu, brewing simulator, cart drawer
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
| **Matcha Jade** | `#3d7023` | Botanical greenery |
| **Frosted Glass** | `rgba(18, 24, 32, 0.72)` | Deep backdrop blur cards |

---

## 📜 License
MIT License. Created with passion as a showcase of modern frontend engineering.
