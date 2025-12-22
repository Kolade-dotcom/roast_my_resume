# 🎨 Visual Guide - RoastMyResume

## 🌈 Color Palette

### Primary Colors
```
Purple Gradient: #6366F1 → #8B5CF6 → #6366F1
Indigo: #4F46E5 → #4338CA
```

### Accent Colors
```
Orange: #F97316
Red: #EF4444
Pink: #EC4899
Yellow: #FBBF24
```

### Backgrounds
```
Soft Cream: #FAFAFA
Light Purple: #F5F3FF
Light Pink: #FDF2F8
Light Orange: #FFF7ED
White: #FFFFFF
```

### Text Colors
```
Dark: #1A1A1A
Gray: #6B7280
Light Gray: #9CA3AF
```

---

## 🎭 Component Showcase

### 1. Landing Page Hero

**What You'll See:**
- Giant animated headline with gradient text
- "Roasted" word has color-shifting animation
- Floating fire emoji (🔥) that bounces
- Pulsing badge showing "5,247 resumes roasted"
- Animated blob background (purple, pink, orange)

**Animations:**
- Blobs float in 7-second loops
- Gradient text shifts colors every 3 seconds
- Badge pulses continuously
- Fire emoji bounces

---

### 2. Upload Zone

**Paste Text Tab:**
- Large textarea with purple border
- Sample resume quick-fill button
- Placeholder text with instructions
- Big purple "GET ROASTED 🔥" button
- Sparkles icon (✨) on button

**Upload PDF Tab:**
- Drag-and-drop area
- Hover effect: scales up and changes color
- Upload icon (20x20 size)
- "Demo mode" indicator at bottom

**States:**
- Default: White background, purple border
- Hover: Purple tint, scale 102%
- Dragging: Purple background, scale 105%
- Loading: Spinning animation

---

### 3. Feature Cards

**Layout:**
- 3 cards in a row (mobile: stacked)
- White background with shadows
- Hover: Lift up (-8px translate)
- Hover: Border color changes

**Icons:**
- Flame (🔥) - Orange/Red gradient
- Zap (⚡) - Purple gradient
- Trending Up (📈) - Green gradient

**Each Card Has:**
- 16x16 icon container
- Bold headline (2xl)
- Description text
- Hover scale effect (110%)

---

### 4. Pricing Cards

**Free Tier:**
- White background
- Gray border (hover: purple)
- Green checkmarks
- "FREE FOREVER" badge
- Hover: Scale 105%

**Premium Tier:**
- Purple gradient background
- Animated pattern overlay
- Yellow "COMING SOON" badge (pulsing)
- White checkmarks
- Lock icon on button
- Hover: Scale 105%

---

### 5. Roast Results Page

**Roast Card:**
- White background
- Purple shadow
- "ROASTED" badge (orange/red, pulsing)
- Large readable text
- Proper markdown formatting

**Coming Soon Section:**
- Purple gradient background
- Pattern overlay
- Yellow badge
- Disabled button with lock icon
- Explanatory text

---

### 6. Buttons

**Primary Button:**
- Purple to indigo gradient
- White text
- Shadow with purple tint
- Hover: Scale 105%
- Hover: Shine effect (sweeps across)
- Loading: Spinning circle

**Secondary Button:**
- White background
- Purple text and border
- Hover: Purple tint background
- No shine effect

---

### 7. Example Roasts Section

**Container:**
- Purple gradient background
- Pattern overlay (dots)
- White text
- Rounded corners (3xl)

**Cards:**
- White/10 opacity background
- Backdrop blur effect
- Border: white/20 opacity
- Hover: white/20 opacity
- Emoji at top (😱, 🤖, 📋)

---

## 🎬 Animations Reference

### Blob Animation (7s loop)
```
0%: translate(0, 0) scale(1)
25%: translate(20px, -50px) scale(1.1)
50%: translate(-20px, 20px) scale(0.9)
75%: translate(50px, 50px) scale(1.05)
100%: translate(0, 0) scale(1)
```

### Gradient Animation (3s loop)
```
0%: background-position 0% 50%
50%: background-position 100% 50%
100%: background-position 0% 50%
```

### Pulse Animation (continuous)
```
0%, 100%: opacity 1
50%: opacity 0.5
```

### Bounce Animation (continuous)
```
0%, 100%: translateY(0)
50%: translateY(-25%)
```

### Spin Animation (continuous)
```
0%: rotate(0deg)
100%: rotate(360deg)
```

---

## 📐 Spacing System

### Padding
```
Small: 4px (p-1)
Medium: 16px (p-4)
Large: 32px (p-8)
XLarge: 48px (p-12)
XXLarge: 64px (p-16)
```

### Margins
```
Small: 8px (mb-2)
Medium: 24px (mb-6)
Large: 48px (mb-12)
XLarge: 80px (mb-20)
```

### Gaps
```
Tight: 8px (gap-2)
Normal: 16px (gap-4)
Loose: 24px (gap-6)
XLoose: 32px (gap-8)
```

---

## 🔤 Typography Scale

### Headlines
```
Hero: 5xl-8xl (48px-96px)
Section: 4xl-5xl (36px-48px)
Card: 2xl-3xl (24px-30px)
```

### Body Text
```
Large: xl (20px)
Normal: lg (18px)
Small: base (16px)
Tiny: sm (14px)
```

### Font Weights
```
Black: 900
Bold: 700
Semibold: 600
Medium: 500
Regular: 400
```

---

## 🎯 Interactive States

### Hover Effects
```
Cards: scale(1.05) + shadow increase
Buttons: scale(1.05) + color shift
Links: color change + underline
Icons: scale(1.1) + rotate
```

### Focus States
```
Inputs: purple ring (4px)
Buttons: purple ring (2px)
Links: purple outline
```

### Active States
```
Buttons: scale(0.95)
Cards: scale(1.02)
```

### Disabled States
```
Opacity: 50%
Cursor: not-allowed
No hover effects
```

---

## 📱 Responsive Breakpoints

```
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
```

### Mobile Changes
- Stack cards vertically
- Reduce font sizes
- Smaller padding
- Single column layout
- Hamburger menu (if added)

### Tablet Changes
- 2-column grid
- Medium font sizes
- Balanced padding
- Flexible layouts

### Desktop Changes
- 3-column grid
- Large font sizes
- Generous padding
- Wide layouts

---

## 🎨 Shadow System

### Elevation Levels
```
Low: shadow-md (4px blur)
Medium: shadow-lg (8px blur)
High: shadow-xl (16px blur)
Highest: shadow-2xl (24px blur)
```

### Colored Shadows
```
Purple: shadow-purple-500/30
Pink: shadow-pink-500/20
Orange: shadow-orange-500/20
```

---

## 🌟 Special Effects

### Glassmorphism
```
Background: white/10
Backdrop blur: blur-md
Border: white/20
```

### Gradient Backgrounds
```
Purple: from-purple-600 to-indigo-600
Orange: from-orange-500 to-red-500
Pink: from-pink-500 to-purple-500
```

### Pattern Overlays
```
Dots pattern (SVG)
Opacity: 30%
Size: 60x60px
```

---

## 🎭 Loading States

### Spinner
- Size: 20x20px
- Color: Current text color
- Animation: Spin (1s linear infinite)
- Circle: 25% opacity
- Arc: 75% opacity

### Skeleton Screens
- Background: gray-200
- Animation: Pulse
- Rounded corners match content

---

## 🎉 Easter Eggs

### Hidden Features
1. **Konami Code**: Try it! (↑↑↓↓←→←→BA)
2. **Triple Click Logo**: Something fun happens
3. **Hover Fire Emoji**: It gets bigger!
4. **Click Blob**: They scatter!

### Fun Details
- Emojis everywhere
- Playful copy
- Unexpected animations
- Personality in every corner

---

## 🚀 Performance Tips

### Optimizations
- Use `will-change` for animations
- Debounce scroll events
- Lazy load images
- Minimize repaints
- Use CSS transforms

### Best Practices
- 60fps animations
- Smooth transitions (300ms)
- Hardware acceleration
- Efficient selectors
- Minimal JavaScript

---

**This guide covers every visual aspect of the app!** 🎨

Use it as a reference when customizing or extending the design.
