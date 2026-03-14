# FUTSAL NEPAL — Landing Page PRD v2.1
## Stack: Next.js 14 App Router + Framer Motion + Tailwind CSS
## Theme: Cinematic Aggressive-Red × Deep Space Black
## Updated: IntroSplash flow — auto-transition, no scroll gate

---

> **COMPETITOR PROTECTION POLICY**
> All feature UI mockups are intentionally obscured, abstracted, or angled.
> No real data structures, field names, or implementation details are visible.
> Features are teased emotionally — not explained technically.
> Copy is written to create desire, not to educate competitors.

---

## Product Overview

**App Name:** Futsal Nepal
**Tagline:** BOOK. PLAY. EARN. DOMINATE.
**Type:** Pre-launch teaser — early access + investor acquisition
**Primary Goals:**
- Collect early access emails from players
- Signal credibility and seriousness to investors
- Build hype before launch
- NOT to fully explain the product

**Target Audience (Dual):**
1. **Players** — Competitive futsal players, casual teams, Kathmandu/Pokhara youth
2. **Investors** — Sports tech investors, Nepal startup ecosystem, angel investors

**Competitors:** Exist. Therefore features are teased, never fully exposed.

---

## Design System

### Color Palette
```css
--color-primary:    #E6192B;   /* Aggressive red — CTAs, glows, energy */
--color-accent:     #FF3344;   /* Hover states, live pulses */
--color-background: #0A0A0C;   /* Deep space black — base */
--color-surface:    #141417;   /* Charcoal — cards, nav, modals */
--color-surface-2:  #1C1C20;   /* Slightly lighter surface for depth */
--color-text:       #FFFFFF;   /* Stark white */
--color-muted:      #52525B;   /* Secondary text, borders */
--color-muted-2:    #3A3A3F;   /* Subtle dividers */
```

### Typography
```css
--font-heading: 'Bebas Neue', sans-serif;
/* Load via next/font/google */
/* Usage: H1 96px, H2 72px, H3 48px — ALL CAPS, tight tracking */

--font-body: 'Outfit', sans-serif;
/* Usage: Body 17–18px, weight 300–500 */

--font-mono: 'JetBrains Mono', monospace;
/* Usage: Labels, counters, technical UI — 11–13px, uppercase */
```

### Aesthetic Signatures
- **Zero border radius** — `border-radius: 0px` everywhere
- **Diagonal clip-path buttons** — `clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 100%, 0 100%)`
- **Grain overlay** — SVG feTurbulence, fixed, `opacity: 0.032`, `pointer-events: none`
- **Red radial glows** — `box-shadow: 0 0 80px -20px rgba(230,25,43,0.35)`
- **Glassmorphism** — `backdrop-filter: blur(12px)` for navbar and modals
- **3D perspective system** — `perspective: 1000px` on all interactive 3D elements
- **Global easing** — `cubic-bezier(0.16, 1, 0.3, 1)` on all transitions

### Design Tokens
```css
:root {
  --color-primary: #E6192B;
  --color-accent: #FF3344;
  --color-background: #0A0A0C;
  --color-surface: #141417;
  --color-surface-2: #1C1C20;
  --color-text: #FFFFFF;
  --color-muted: #52525B;
  --color-muted-2: #3A3A3F;
  --font-heading: 'Bebas Neue', sans-serif;
  --font-body: 'Outfit', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --radius: 0px;
  --glow-red: 0 0 80px -20px rgba(230, 25, 43, 0.35);
  --glow-red-intense: 0 0 120px -10px rgba(230, 25, 43, 0.5);
  --ease-snap: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
}
```

---

## Project File Structure

```
futsal-nepal/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── GrainOverlay.tsx
│   ├── IntroSplash.tsx
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── ParallaxStory.tsx
│   ├── SlotShowcase.tsx
│   ├── FeatureRewards.tsx
│   ├── FeatureTournaments.tsx
│   ├── FeatureLobby.tsx
│   ├── InvestorStrip.tsx
│   ├── WaitlistSection.tsx
│   ├── WaitlistModal.tsx
│   └── Footer.tsx
│
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useInView.ts
│   └── useMouseTilt.ts
│
├── lib/
│   └── waitlist.ts
│
├── public/
│   ├── video/
│   │   └── hero-reel.mp4        ← futsal highlight reel (you provide)
│   └── images/
│       ├── court-1.jpg
│       ├── court-2.jpg
│       └── court-3.jpg
│
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Page Section Map (Scroll Order)

```
── ON PAGE LOAD (no scroll required) ──────────────────────────
01 → IntroSplash          (fullscreen overlay — auto plays, auto exits)
     ↓ AUTO-TRANSITIONS after 2.8s
     ↓ (skipped on repeat visits via sessionStorage)

── USER NOW SEES HERO — SCROLLS DOWN TO EXPLORE ───────────────
02 → HeroSection          (100vh — video bg, 3D headline) ← FIRST thing visible after splash
03 → Navbar               (sticky — appears as soon as user scrolls down)
       ↓ 3D FLIP TRANSITION
04 → ParallaxStory        (400vh — scroll-driven futsal story)
       ↓ CURTAIN WIPE
05 → SlotShowcase         (100vh — pricing & slot selection)
       ↓ SCALE TRANSITION
06 → FeatureRewards       (100vh — earn free games teaser)
       ↓ SLIDE TRANSITION
07 → FeatureTournaments   (100vh — tournament system teaser)
       ↓ DIAGONAL WIPE
08 → FeatureLobby         (80vh — lobby system teaser)
       ↓ FADE TRANSITION
09 → InvestorStrip        (60vh — numbers for investors)
10 → WaitlistSection      (100vh — final CTA)
11 → Footer               (auto height)
```

> **Flow Logic:**
> IntroSplash is a fullscreen overlay rendered on top of HeroSection.
> HeroSection is always mounted underneath — it does not wait for splash to finish.
> When splash exits, HeroSection is already rendered and immediately visible.
> This means zero loading gap between splash and hero.

---

## Section Specifications

---

### 01 — `IntroSplash.tsx`
**Purpose:** Cinematic opening statement. Plays automatically on first visit, then gets out of the way so the user sees the Hero immediately.

**Rendering Architecture:**
```
IntroSplash is a fixed fullscreen OVERLAY — position: fixed, inset: 0, z-index: 200
HeroSection is mounted UNDERNEATH it at all times
When splash exits, Hero is already rendered — zero loading gap
Scroll is locked (overflow: hidden on body) while splash is playing
Scroll lock is released the moment splash begins its exit animation
```

**sessionStorage Logic (skip on repeat visits):**
```typescript
// On component mount:
const hasSeen = sessionStorage.getItem('splash-seen')
if (hasSeen) {
  // Skip splash entirely — set isDone: true immediately
  // Hero is visible from the first frame
  return null
}
// On splash complete:
sessionStorage.setItem('splash-seen', 'true')

// Result:
// First visit in a browser session → splash plays
// Page refresh or back navigation → splash skipped, Hero shows instantly
// New browser session (new tab, closed and reopened) → splash plays again
```

**Visual:**
```
- Fixed fullscreen overlay, background: #0A0A0C
- Deep radial red glow at center:
  radial-gradient(circle at 50% 50%, rgba(230,25,43,0.12), transparent 60%)
- Grain overlay visible at full intensity during splash
```

**Animation Sequence (total duration: ~2.8s):**
```
0ms    → Black overlay, scroll locked
200ms  → Single red horizontal line expands from center outward
         scaleX: 0 → 1, width: 40%, height: 1px, color: #E6192B
         duration: 600ms, ease: --ease-snap

800ms  → "FUTSAL" reveals letter by letter
         Each letter: y: -50px → 0, opacity: 0 → 1, rotateX: -20deg → 0deg
         Stagger: 0.06s per letter
         Font: Bebas Neue 96px desktop / 56px mobile, white

1400ms → "NEPAL" reveals same way, 100ms after "FUTSAL" completes
         Color: #E6192B
         Subtle red glow blooms behind "NEPAL" text

1900ms → Tagline fades in below:
         "NEPAL'S ELITE FUTSAL PLATFORM"
         JetBrains Mono 12px, #52525B, letter-spacing: 0.3em
         opacity: 0 → 1, duration: 400ms

2400ms → AUTO-EXIT BEGINS (no user input required)
         Scroll lock releases here
         Splash overlay: opacity 1 → 0, scale: 1 → 1.04
         Duration: 400ms, ease: --ease-snap
         HeroSection becomes fully visible and interactive

2800ms → Splash unmounted from DOM (display: none)
         Page is fully in Hero state
         User can now scroll freely
```

**❌ REMOVED: "SCROLL TO ENTER" prompt**
```
There is no scroll-to-enter gate.
No chevron. No instruction text.
The splash exits automatically — the user does nothing.
This respects the user's time, especially investors.
```

**3D Details:**
```
- perspective: 800px on splash container
- Each letter: rotateX from -20deg → 0deg on entry (letters rise toward viewer)
- "NEPAL" word: slight z-translation on entry (z: -20px → 0px)
- Exit: scale(1.04) creates subtle push-away depth as it fades
```

**State shape:**
```typescript
type SplashState = 'playing' | 'exiting' | 'done'
// playing → animation sequence runs
// exiting → fade out begins, scroll unlocked
// done    → component returns null, Hero is sole content
```

---

### 02 — `Navbar.tsx`
**Purpose:** Command center. Appears after splash. Stays sticky.

**Layout:**
```
[FUTSAL NEPAL logo]    [Features] [Pricing] [Tournaments] [Contact]    [Early Access →]
     left                           center                                    right
```

**Visual:**
```
- Position: fixed, top 0, full width, z-index: 100
- Background: rgba(20, 20, 23, 0.85), backdrop-filter: blur(12px)
- Border-bottom: 1px solid #2A2A2D
- Height: 64px
- Initially: translateY(-100%), opacity: 0
- Appears when: scrollY > window.innerHeight
- Entry: translateY(0), opacity: 1, duration 400ms, ease: --ease-snap
```

**Logo:**
```
- "FUTSAL" white, "NEPAL" #E6192B
- Font: Bebas Neue 28px, letter-spacing: 0.1em
- Small pulsing red dot after "NEPAL" — signals live/active product
```

**Nav Links:**
```
- "FEATURES" "PRICING" "TOURNAMENTS" "CONTACT"
- Font: JetBrains Mono 11px, uppercase, letter-spacing: 0.15em
- Color: #52525B default → #FFFFFF hover
- Hover: color transitions + subtle red underline slides in from left
- Smooth scroll to section anchor on click
```

**Early Access CTA:**
```
- Text: "EARLY ACCESS"
- Background: #E6192B
- clip-path diagonal cut: top-right corner
- Hover: glow intensifies, slight scale(1.02)
- Opens WaitlistModal on click
- Font: Bebas Neue 14px, letter-spacing: 0.1em
```

**Mobile (< 768px):**
```
- Hamburger menu icon (three lines → X morphs on open)
- Full screen overlay menu, dark bg, centered links stacked vertically
- Each link slides in staggered from right
```

---

### 03 — `HeroSection.tsx`
**Purpose:** First content hit after splash. Must be jaw-dropping.

**Background:**
```
- Full 100vh
- <video> tag: autoplay, muted, loop, playsInline
- Source: /public/video/hero-reel.mp4
  (Futsal highlight reel — fast cuts, goals, team moments)
  (Fallback: dark futsal court image if video unavailable)
- Dark overlay: linear-gradient(rgba(10,10,12,0.7), rgba(10,10,12,0.85))
- KEN BURNS on fallback image: scale 1.0 → 1.08 over 10s, ease-in-out, alternate
```

**Video Notes:**
```
- If you don't have a video yet, use a placeholder dark futsal court image
- Video should be compressed: max 8MB, 1920×1080, H.264
- Add poster attribute with first frame image for fast paint
```

**Typography:**
```
- Stacked, oversized, left-aligned
- "BOOK."  — Bebas Neue 96px, #FFFFFF, opacity: 100%
- "PLAY."  — Bebas Neue 96px, #FFFFFF, opacity: 55%
- "WIN."   — Bebas Neue 96px, #E6192B
- Each line entry: y: 80px → 0, opacity: 0 → 1
  Stagger: 0.15s between lines
  Easing: --ease-snap
- 3D MOUSE TILT: on mouse move over hero
  Container perspective: 1000px
  Headline rotateX: ±6deg, rotateY: ±8deg based on cursor position
  Smooth interpolation: lerp factor 0.08
  Gives headline a "holographic floating" feel
```

**Supporting Elements:**
```
- Subtitle (below headline):
  "Nepal's first elite futsal booking, rewards & tournament platform."
  Outfit 18px, color: rgba(255,255,255,0.55)
  Fades in at 0.5s delay

- Live Counter Pill (bottom left):
  [● 1,432 WAITING]
  Dot: #E6192B, pulsing animation
  Text: JetBrains Mono 12px
  Background: rgba(20,20,23,0.8), blur(8px)
  Border: 1px solid rgba(230,25,43,0.3)

- CTA Button (bottom right area, near headline):
  "SECURE EARLY ACCESS"
  Diagonal clip-path, #E6192B background
  Hover: white inner glow, instant
  Opens WaitlistModal

- Scroll indicator (bottom center):
  "SCROLL" in JetBrains Mono 11px, muted
  Animated line extending downward
```

**Parallax on scroll:**
```
- useScroll + useTransform (Framer Motion)
- Video/image bg: y moves at 0.3x scroll speed (slower = depth)
- Headline text: y moves at 0.6x scroll speed (faster = foreground)
- Creates natural depth separation
```

**3D SECTION TRANSITION — Hero → ParallaxStory:**
```
This is the most important transition on the page.

As user scrolls to bottom of hero:
1. Hero content: rotateX(0deg) → rotateX(-15deg), scale(1) → scale(0.92)
   Feels like the hero section tilts away / recedes into distance
2. ParallaxStory section rises from below with rotateX(15deg) → rotateX(0deg)
   Like a new panel flipping into view
3. Perspective container wraps both sections: perspective: 1200px
4. Duration: tied to scroll position, not time-based
   Use Framer Motion useScroll + useTransform for scroll-linked values

Effect: feels like turning a 3D page / cube face rotating
```

---

### 04 — `ParallaxStory.tsx`
**Purpose:** Scroll-driven cinematic narrative. Tells the emotional story of futsal in Nepal. Builds desire before features are shown.

**Concept:**
```
This section is 400vh tall (4x viewport height).
As the user scrolls through it, a story unfolds in chapters.
The section is sticky — content changes while the section stays fixed.
Background imagery shifts with parallax depth.
Text appears and disappears chapter by chapter.
```

**Sticky Implementation:**
```
- Outer container: height: 400vh, position: relative
- Inner content: position: sticky, top: 0, height: 100vh
- Content changes driven by scrollYProgress: [0, 0.25, 0.5, 0.75, 1.0]
```

**Story Chapters (4 chapters across 400vh scroll):**

```
CHAPTER 1 — "THE FIELD" (scroll 0% → 25%)
Background: Dark overhead view of empty futsal court
Text center: 
  "EVERY GREAT TEAM"          ← Bebas Neue 72px
  "STARTS ON A PITCH."        ← Bebas Neue 72px, red on "PITCH"
Parallax: background moves up at 0.2x speed
3D: Text rises from y: 60 → 0 as chapter enters, sinks to y: -60 as it exits
Grain intensifies slightly

CHAPTER 2 — "THE STRUGGLE" (scroll 25% → 50%)
Background: blurred, moody — represents chaos/frustration
Text:
  "CALLING TO BOOK."          ← Bebas Neue 64px, muted
  "WAITING. REJECTED."        ← Bebas Neue 64px, slightly red
  "THERE IS A BETTER WAY."    ← Bebas Neue 64px, white, strong
Transition from Ch1: horizontal red line wipes across screen (curtain)
3D: Text panels slide in from rotateY(-20deg) → rotateY(0deg)

CHAPTER 3 — "THE TEAM" (scroll 50% → 75%)
Background: dark silhouettes of players, dramatic lighting
Text:
  "YOUR TEAM."                ← Bebas Neue 80px
  "YOUR LOYALTY."             ← Bebas Neue 80px, #E6192B
  "YOUR REWARDS."             ← Bebas Neue 80px, fades in last
Parallax layers: 
  - Background image: 0.1x speed
  - Silhouette layer: 0.3x speed  
  - Text: 0.5x speed
  Creates 3-layer depth parallax

CHAPTER 4 — "THE PLATFORM" (scroll 75% → 100%)
Background: abstract red grid lines, data visualization feel
Text:
  "ONE APP."                  ← Bebas Neue 72px
  "EVERY GAME."               ← Bebas Neue 72px
  "ALL OF NEPAL."             ← Bebas Neue 72px, massive, red glow
Red radial glow erupts from center on this chapter
Transition out: 3D cube rotation into SlotShowcase section
```

**3D Chapter Transitions:**
```
Between each chapter:
- Outgoing text: rotateX(0) → rotateX(-25deg), opacity 1 → 0
- Incoming text: rotateX(25deg) → rotateX(0), opacity 0 → 1
- All tied to scroll position via useTransform
- perspective: 1000px on sticky container

Between Ch3 and Ch4:
- Red horizontal line sweeps across full width (curtain wipe)
- Duration: 0.3 scroll units
```

---

### 05 — `SlotShowcase.tsx`
**Purpose:** Show the booking experience. Real prices, real times, real choices.
**Protection:** UI is shown at angle and partial blur — enough to understand, not enough to copy.

**Visual Layout:**
```
- Dark section, #0A0A0C base
- Section label: "01 // BOOK YOUR PITCH" — JetBrains Mono, muted
- Headline: "YOUR SLOT.\nYOUR RULES." — Bebas Neue 72px
- Subtext: "Real-time availability. Instant booking. No calls." — Outfit 17px muted
```

**Slot UI Mockup (PROTECTED — shown at angle):**
```
- Card container: transform: perspective(800px) rotateY(-8deg) rotateX(3deg)
- Background: #141417, border: 1px solid #2A2A2D
- Hover: rotateY(0deg) rotateX(0deg) — flattens toward user, smooth transition
- Box shadow: var(--glow-red) on hover

SLOT SELECTION TABS (abstract, not full UI):
  [5-A-SIDE]  [6-A-SIDE]  [7-A-SIDE]
  Font: JetBrains Mono 12px
  Active tab: #E6192B background
  Inactive: surface bg, muted text

TIME SLOTS DISPLAYED:
  Peak Hours:
  ┌─────────────────────────────────────────────┐
  │  06:00 – 10:00 AM    PEAK      Rs 1,200    │
  │  06:00 – 09:00 PM    PEAK      Rs 1,200    │
  ├─────────────────────────────────────────────┤
  │  10:00 AM – 06:00 PM  OFF-PEAK  Rs 1,000   │
  │  09:00 PM – close     OFF-PEAK  Rs 1,000   │
  └─────────────────────────────────────────────┘

  Each row:
  - Background: #141417
  - Hover: border 1px solid #E6192B, subtle red left border accent
  - "AVAILABLE" badge: green dot + JetBrains Mono text
  - "BOOKED" badge: red dot + muted text
  - Price: Bebas Neue 20px, white

  NOTE: Show 2 slots as BOOKED, 3 as AVAILABLE
  This creates social proof — platform feels active

BOTTOM OF CARD:
  "BOOK THIS SLOT" — diagonal clip-path button, full width
  Protected: actual booking flow is NOT shown
  Button click → opens WaitlistModal (since app not live yet)

BLUR PROTECTION:
  Card edges fade to dark via mask-image gradient
  Bottom 30% of card: mask opacity 0
  This obscures the full UI while showing enough to impress
```

**3D Scroll Entry:**
```
- Card enters from right: x: 120px → 0, rotateY: 20deg → -8deg
- Easing: --ease-snap
- Triggered by useInView at 20% threshold
```

**Left side — copy:**
```
- Enters from left: x: -80px → 0
- Stagger: section label first, then headline, then body
```

---

### 06 — `FeatureRewards.tsx`
**Purpose:** Tease the loyalty/rewards system. Don't explain it fully — make players WANT it.

**COMPETITOR PROTECTION:**
```
Do not show:
  - How tracking works technically
  - The exact algorithm for team matching
  - Database or API structure
Do show:
  - That loyalty is tracked
  - That free games are earned
  - That it's automatic
  - The emotional payoff
```

**Visual:**
```
- Dark section with subtle red grid background
- Section label: "02 // LOYALTY SYSTEM" — JetBrains Mono, muted
- Headline: "THE MORE\nYOU PLAY,\nTHE MORE\nYOU EARN." — Bebas Neue 72px
  "EARN." in #E6192B with red glow
```

**Abstract Progress Visual (PROTECTED):**
```
- Circular progress ring, centered right side
- SVG, radius 120px, stroke-width 4px
- Track: rgba(255,255,255,0.06)
- Progress fill: #E6192B, stroke-dashoffset animated on scroll enter
- Fill percentage: 70% (representing progress, not explaining it)
- Center: trophy icon or "FREE" in Bebas Neue 32px, red
- Outer ring: subtle rotation animation, 20s linear infinite
- Multiple ring layers at different sizes — depth effect

3D INTERACTION:
- Mouse move: ring tilts rotateX ±8deg, rotateY ±10deg
- perspective: 600px on container
- Each ring layer has slightly different tilt response
- Creates holographic layered depth
- Smooth: lerp factor 0.06

PARALLAX:
- Outer ring: moves at 0.8x scroll speed
- Middle ring: 0.6x scroll speed
- Inner content: 0.4x scroll speed
- Creates 3-layer parallax depth as section scrolls
```

**Copy (intentionally vague):**
```
"Play. Accumulate. Unlock."
"Every game counts toward something bigger."
"Your next free session is closer than you think."
NO mention of "10 games" or specific mechanics — that's the product's secret sauce
```

**Animated stat (social proof):**
```
"FREE SESSIONS EARNED" counter
Counts up from 0 to 847 on scroll enter
JetBrains Mono, large, red
```

---

### 07 — `FeatureTournaments.tsx`
**Purpose:** Tease tournament system. Aggressive, competitive energy.

**COMPETITOR PROTECTION:**
```
Show: That tournaments exist, players get notified, registration is easy
Hide: How bracket generation works, notification system, organizer tools
```

**Visual:**
```
- Full width, dark section
- 1px grid background: rgba(255,255,255,0.03), fades at all edges
- Oversized ghost marquee: "DOMINATE THE LEAGUE — " repeating
  Position: absolute, full width, opacity: 0.04, Bebas Neue 96px
  Animation: translateX(0) → translateX(-50%), 20s linear infinite
- Section label: "03 // THE ARENA" — JetBrains Mono
- Headline centered: "YOUR CITY.\nYOUR TOURNAMENT." — Bebas Neue 80px
```

**Abstract Bracket SVG (PROTECTED):**
```
- Minimalist wireframe — NOT a real bracket UI
- Lines: 1px, rgba(255,255,255,0.2)
- 8 entry nodes → 4 → 2 → 1 winner node
- Winner path: #E6192B lines, 2px
- Winner node: red fill, glow
- No team names, no scores, no real data

ANIMATION:
- Scroll enter: SVG stroke-dashoffset draw effect
  Each line draws itself sequentially, left to right
  Duration: 1.2s total, staggered per line
- Hover bracket: 
  rotateY: -10deg → 10deg based on mouse X
  rotateX: -5deg → 5deg based on mouse Y
  perspective: 800px
  Red glow intensifies on hover
  Line stroke-width increases to 2px on hover
```

**Feature hints (3 abstract cards):**
```
Card 1: "INSTANT NOTIFICATIONS" — bell icon, vague copy
Card 2: "ONE-TAP REGISTRATION" — lightning icon, vague copy  
Card 3: "LIVE BRACKETS" — bracket icon, vague copy

Cards: 
  #141417 background
  hover: border 1px solid #E6192B, translateY(-6px), red glow
  Entry: stagger from bottom, y: 40 → 0
  DO NOT show notification format, registration form, or bracket logic
```

---

### 08 — `FeatureLobby.tsx`
**Purpose:** Tease the lobby/team-fill system. This is a unique differentiator — hint at it strongly but protect the mechanic.

**COMPETITOR PROTECTION:**
```
Show: That solo players can find teams / fill spots
Hide: How matching works, lobby algorithm, any technical detail
```

**Visual:**
```
- Slightly lighter dark section: #0D0D10
- Section label: "04 // THE LOBBY" — JetBrains Mono
- Headline: "NO TEAM?\nNO PROBLEM." — Bebas Neue 72px
  "NO PROBLEM." in #E6192B
- Subtext: "Find your squad. Fill your team. Play tonight."
  Outfit 17px, muted — intentionally vague
```

**Abstract Lobby Visual (PROTECTED):**
```
- Abstract player avatar grid — 7 circles
- 5 filled (white/red gradient), 2 empty (dashed border, pulsing)
- The 2 empty slots pulse with red glow — "spots available" feel
- Above grid: abstract venue/time info (blurred, not readable)
- No real matching interface, no filters, no search shown

3D ENTRY:
- Grid animates in from y: 60 → 0, scale: 0.9 → 1
- Each avatar: staggered entry, rotateZ: -10deg → 0deg
  Gives a "cards being dealt" feel
- Hover entire grid: subtle tilt rotateX ±4deg, rotateY ±6deg
```

**Hook stat:**
```
"423 OPEN SPOTS THIS WEEK"
JetBrains Mono, counter animates up on scroll enter
Creates FOMO — makes players want to sign up immediately
```

---

### 09 — `InvestorStrip.tsx`
**Purpose:** Dedicated section for investor confidence. Numbers, market, vision.

**Visual:**
```
- Dark section with subtle red top border line
- Section label: "FOR INVESTORS" — JetBrains Mono, #E6192B
- Headline: "THE MARKET\nIS WAITING." — Bebas Neue 72px
```

**Numbers Grid:**
```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│  NPR 2Cr+    │   500,000+   │    50+        │    3          │
│  Market Size │  Active      │  Venue        │  Revenue      │
│  Year 1 TAM  │  Futsal      │  Partners     │  Streams      │
│              │  Players     │  Target Y1    │               │
└──────────────┴──────────────┴──────────────┴──────────────┘

Each number:
- Bebas Neue 64px, white
- Counts up from 0 on scroll enter (CountUp animation)
- Label: JetBrains Mono 11px, muted
- Separator: 1px vertical red line between items
```

**Revenue streams (vague, strategic):**
```
Three abstract pills:
[BOOKING COMMISSIONS]  [VENUE SUBSCRIPTIONS]  [TOURNAMENT FEES]
JetBrains Mono 12px, surface bg, red border
Intentionally not priced — creates investor curiosity
```

**Investor CTA:**
```
"PARTNER WITH US"
Secondary button style: transparent bg, white border, diagonal cut
"investor@futsalnepal.com" — JetBrains Mono below button
```

---

### 10 — `WaitlistSection.tsx`
**Purpose:** Final high-urgency conversion push before footer.

**Visual:**
```
- Full 100vh
- Red radial glow erupting from center behind text — most intense glow on page
- Headline: "GET IN\nBEFORE\nKICKOFF." — Bebas Neue 96px centered
  "KICKOFF." in #E6192B with maximum glow
- Subtext: Outfit 18px muted
  "Early access members get priority slots, founding perks, and first picks."
```

**Email CTA:**
```
- Email input + submit button side by side
- Input: bottom border only, 20px Outfit, no bg, placeholder "YOUR EMAIL"
- Button: "SECURE MY SPOT" diagonal clip-path, #E6192B
- Both wrapped in subtle surface card with red border glow
```

**Live Counter:**
```
"1,432 PLAYERS ALREADY WAITING"
JetBrains Mono, pulsing red dot prefix
Updates in real time (or simulated increment)
```

**Urgency element:**
```
"EARLY ACCESS CLOSES WHEN WE LAUNCH."
JetBrains Mono 11px, muted, uppercase
Subtle — not aggressive, but present
```

---

### `WaitlistModal.tsx`
**Purpose:** Full-screen high-conversion modal. Triggered by any CTA button on page.

**States:**

```
IDLE (closed):
  opacity: 0, pointerEvents: none

OPEN:
  Backdrop: fixed fullscreen, #0A0A0C 90% opacity, blur(20px)
  Entry: backdrop fades in, modal scales 0.94 → 1.0
  
  Modal Box:
    Width: 580px, centered
    Background: #141417
    Border: 1px solid #E6192B
    Box-shadow: var(--glow-red-intense)
    Padding: 48px
    
  Content:
    Tag: "LIMITED EARLY ACCESS" — JetBrains Mono 11px, #E6192B
    Headline: "SECURE YOUR SPOT" — Bebas Neue 56px
    Sub: "Join Nepal's first elite futsal platform." — Outfit 16px muted
    
    Counter: "1,432 ALREADY WAITING" — JetBrains Mono, pulsing dot
    
    Input: full width, bottom border 1px #52525B
      Font: Outfit 22px
      Placeholder: "your@email.com"
      Focus: border → #FFFFFF, transition instant
      
    Submit: full width, #E6192B, diagonal clip-path top-right
      Text: "SECURE SPOT" — Bebas Neue 18px
      
    Close: top-right "✕" JetBrains Mono, #52525B → #FFFFFF hover

LOADING (on submit):
  Button text → "VERIFYING..."
  Button background: opacity oscillates 0.6 → 1, 300ms
  Input: disabled, opacity 0.4

SUCCESS:
  Phase 1: Modal box height animates to 4px (single red line)
    Duration: 400ms, ease: --ease-snap
  Phase 2: Line holds 500ms
  Phase 3: Box expands back, shows:
    "YOU ARE"     — JetBrains Mono 14px, muted, uppercase
    "#1433"       — Bebas Neue 96px, #E6192B, red glow erupts
    "WELCOME TO THE WAITLIST." — JetBrains Mono 12px, muted
  Phase 4: Auto-close after 4s
    OR: click anywhere to close

ERROR (invalid email):
  Input border flashes red
  Error text: "ENTER A VALID EMAIL" — JetBrains Mono 11px, #E6192B
  Shake animation on input: x: 0 → -8 → 8 → -4 → 4 → 0
```

---

### `Footer.tsx`
**Visual:**
```
- Dark, minimal, #0A0A0C
- Top border: 1px solid #2A2A2D
- Left: "FUTSAL NEPAL" logo — Bebas Neue, "NEPAL" in red
- Center: nav links — JetBrains Mono 11px, muted
  "FEATURES" "PRICING" "CONTACT" "INSTAGRAM" "LINKEDIN"
- Right: "© 2025 FUTSAL NEPAL" — JetBrains Mono 11px, muted
- Bottom: "BUILT IN NEPAL 🇳🇵" — tiny, centered, JetBrains Mono muted
```

---

## Hooks

### `useScrollProgress.ts`
```typescript
import { useState, useEffect } from 'react'
export function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scrollY
}
```

### `useInView.ts`
```typescript
import { useEffect, useRef, useState } from 'react'
export function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}
```

### `useMouseTilt.ts`
```typescript
import { useEffect, useRef } from 'react'
// Returns real-time mouse position relative to element center
// Used for 3D tilt effects on hero, bracket, rewards ring
export function useMouseTilt(maxTilt = 10) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let tiltX = 0, tiltY = 0
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      const targetX = -dy * maxTilt
      const targetY = dx * maxTilt
      // Lerp for smoothness
      tiltX += (targetX - tiltX) * 0.08
      tiltY += (targetY - tiltY) * 0.08
      el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
    }
    const onLeave = () => {
      tiltX = 0; tiltY = 0
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [maxTilt])
  return ref
}
```

---

## `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E6192B',
        accent: '#FF3344',
        background: '#0A0A0C',
        surface: '#141417',
        'surface-2': '#1C1C20',
        muted: '#52525B',
        'muted-2': '#3A3A3F',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      animation: {
        'ken-burns': 'kenBurns 10s ease-in-out infinite alternate',
        'pulse-dot': 'pulseDot 1.5s ease-in-out infinite',
        'marquee': 'marquee 20s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'count-line': 'expandLine 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        kenBurns: {
          '0%': { transform: 'scale(1.0)' },
          '100%': { transform: 'scale(1.08)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.5)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        expandLine: {
          '0%': { scaleX: '0' },
          '100%': { scaleX: '1' },
        },
      },
      boxShadow: {
        'glow-red': '0 0 80px -20px rgba(230, 25, 43, 0.35)',
        'glow-red-intense': '0 0 120px -10px rgba(230, 25, 43, 0.5)',
        'glow-red-sm': '0 0 30px -10px rgba(230, 25, 43, 0.3)',
      },
    },
  },
  plugins: [],
}
export default config
```

---

## Dependencies — `package.json`

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

---

## Build Order

```
Step 1: npx create-next-app@latest futsal-nepal --typescript --tailwind --app
Step 2: npm install framer-motion lucide-react
Step 3: Replace tailwind.config.ts
Step 4: Replace globals.css with design tokens + grain overlay CSS
Step 5: app/layout.tsx — fonts + GrainOverlay
Step 6: Build in this exact order:
        GrainOverlay.tsx
        IntroSplash.tsx
        Navbar.tsx
        HeroSection.tsx
        ParallaxStory.tsx
        SlotShowcase.tsx
        FeatureRewards.tsx
        FeatureTournaments.tsx
        FeatureLobby.tsx
        InvestorStrip.tsx
        WaitlistSection.tsx
        WaitlistModal.tsx
        Footer.tsx
Step 7: Assemble in app/page.tsx
Step 8: npm run dev → localhost:3000
```

---

## Changes in v2.1 (This Update)

| What Changed | What It Was | What It Is Now |
|---|---|---|
| IntroSplash exit trigger | User had to scroll to dismiss | Auto-exits after 2.8s — no user input |
| "Scroll to Enter" prompt | Present, pulsing at bottom | Removed completely |
| Splash rendering | Full 100vh section pushing Hero down | Fixed overlay on top of Hero |
| Repeat visit behavior | Splash played every time | sessionStorage skip — plays once per session |
| Scroll lock | Not specified | Body scroll locked during splash, released on exit |
| Hero visibility | Hero only visible after splash dismissed | Hero mounted underneath, visible instantly on exit |

---

## My Improvements Added to v2.0

| Addition | Why |
|---|---|
| `ParallaxStory` section (400vh) | Emotional storytelling before features — investors and players feel the brand before reading features |
| `FeatureLobby` section | Your lobby system is a strong differentiator — deserves its own teaser |
| `InvestorStrip` section | Dual audience (players + investors) — investors need their own section with numbers |
| `useMouseTilt` hook | 3D mouse tracking for hero, bracket, rewards ring — makes it feel alive |
| Hero video background | Video is more impactful than static image for a sports platform |
| Competitor protection policy | All mockups angled, blurred at edges, no real UI logic exposed |
| Slot pricing in NPR | Real prices (Rs 1200 peak / Rs 1000 off-peak) with side selection hint |
| CountUp animations | Numbers counting up feel more alive for investor stats and social proof |
| Error state on modal | Better UX, professional feel |
| "BUILT IN NEPAL 🇳🇵" footer note | Local pride, resonates with both audiences |
