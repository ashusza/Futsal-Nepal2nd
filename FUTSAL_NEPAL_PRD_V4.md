# FUTSAL NEPAL — Landing Page PRD v4.0
## Stack: Next.js 14 App Router + Framer Motion + Tailwind CSS
## Theme: Cinematic Neon Green × Deep Space Black

---

> **COMPETITOR PROTECTION POLICY**
> All feature UI mockups are intentionally obscured, abstracted, or angled.
> No real data structures, field names, or implementation details are visible.
> Features are teased emotionally — not explained technically.
> Copy is written to create desire, not to educate competitors.

---

## Product Overview

**App Name:** Game Circle 
**Tagline:** Nepal's First Futsal Booking, Rewards & Tournament Platform
**Type:** Pre-launch teaser — early access + venue acquisition
**Primary Goals:**
- Collect early access waitlist emails from players
- Secure venue partners through early registration
- Signal credibility and technical excellence
- Build hype before launch without fully exposing product functionality

**Target Audience (Dual):**
1. **Players** — Competitive futsal players, casual teams, Kathmandu/Pokhara youth
2. **Venues** — Futsal pitch owners looking for automated booking and analytics

---

## Design System V4 (Carbon Forest)

### Color Palette
```css
--color-primary:    #10B981;   /* Emerald Green — CTAs, glows, energy */
--color-accent:     #059669;   /* Hover states, deep pulses */
--color-background: #0A0A0C;   /* Deep space / carbon black — base */
--color-surface:    #141417;   /* Charcoal — cards, form backgrounds */
--color-surface-2:  #1C1C20;   /* Slightly lighter surface for depth */
--color-text:       #FFFFFF;   /* Stark white */
--color-muted:      #52525B;   /* Secondary text, borders */
--color-muted-2:    #3A3A3F;   /* Subtle dividers */
```

### Typography
- **Heading:** 'Bebas Neue' (H1 96px, H2 72px, H3 48px — ALL CAPS, tight tracking)
- **Body:** 'Outfit' (Body 17–18px, weight 300–500)
- **Mono:** 'JetBrains Mono' (Labels, counters, technical UI — 11–13px, uppercase)
- **Extra:** 'Metal Mania' (IntroSplash logo typography)

### Aesthetic Signatures
- **Zero border radius** — `border-radius: 0px` globally across all components.
- **Glassmorphism & Texture** — Heavy reliance on `backdrop-blur`. Atmospheric depth is achieved via code-driven radial glows and SVG `<feTurbulence>` noise filters applied section-by-section organically.
- **3D Interactive Perspective** — `perspective: 1000px` paired with a custom `useMouseTilt` React hook. Used across marquee cards, trophy displays, and hero elements to give UI depth mapped to user cursor interactions.
- **No Extraneous Labels** — As of V4, all minor section markers (e.g., `01 // THE LOBBY`) have been stripped out. The design lets the typography headers breathe organically without structural padding labels.

---

## Section-by-Section Specifications

### 1. Intro Splash & Hero Integration
- **Intro Splash Screen**: Draws an animated SVG futsal pitch line-by-line using CSS keyframes, dissolving directly to unveil:
  - Text: `GAME CIRCLE` shattering in letter-by-letter.
  - Subtitle: `- Nepal First Futsal PLATFORM`
- **Hero Section**: 
  - Drops all video/image assets for pure data visual.
  - Implements an 800-particle Canvas system reacting physically to mouse input.
  - Headline: `NEVER JUST PLAY. WIN.` (3D Tilted).
  - Subtitle: `Nepal's first futsal booking, rewards & tournament platform.`

### 2. Storytelling Context
- **Parallax Story**: 4-chapter narrative scrolling locked into an intersection observer.
  - `Here we are for GREAT PLAYERS. / SCATTERED ACROSS NEPAL. / NO WAY TO CONNECT.`
  - `LOOKING FOR TEAMMATES. / LOOKING FOR A PITCH. / LOOKING FOR A WAY.`
  - `THEY FOUND EACH OTHER. / ON GAME CIRCLE.`
  - `WELCOME TO / THE CIRCLE. / WAITLIST is NOW OPEN.`
- **Problem Statement**: Presents a dynamic stack of three primary pain points on the left while users scroll horizontally.
- **Market Stats**: A clean 3-item grid display scaling dynamically on scroll entry.
  - `60+ / KATHMANDU PITCHES`
  - `12K+ / ACTIVE PLAYERS`
  - `4K+ / MONTHLY MATCHES`

### 3. Core Product Teasers
- **Slot Showcase (Booking)**: `YOUR SLOT. / YOUR RULES.`
  - A continuously sliding horizontal marquee (`x: "-50%"`) of time-slots.
- **Feature Tournaments (Competitive)**: `YOUR CITY. / YOUR TOURNAMENT.`
  - Dynamic "knockout bracket" using SVG paths mapped out over 4 rounds, drawing tournament paths sequentially.
- **Feature Rewards (Loyalty)**: `THE MORE / YOU PLAY, / THE MORE / YOU EARN.`
  - Descriptive: `Every game counts toward something bigger, Which you deserved.`
  - Visual: An animated 6-part Stagger SVG trophy (Base, Stem, Handles, Cup, Star).
- **Feature Lobby (Matchmaking)**: `NO TEAM? / NO PROBLEM.`
  - Includes a `SQUADS / JOIN ANYTIME` pulse block.
  - Features radar UI masking actual user profile components.
- **Benefits Breakdown**: `WHO IS THIS FOR?`
  - 2 primary tabs: `FOR PLAYERS` vs `FOR VENUE OWNERS`. Switches underlying text blocks on click.

### 4. Advanced Registration Forms
- **Venue Owner Registration**:
  - Full client-side validation logic.
  - Required fields: Venue Name, Location, Email.
  - Strict Regex validation for Nepali Phone numbers (`98XXXXXXXX` / `97XXXXXXXX`).
  - Added flexibility: `Whatsapp / Secondary` set as explicitly optional without breaking baseline alignment.
  - Real-time inline SVG validation feedback (✓/×).
- **Player Waitlist System**:
  - Embedded universally (`WaitlistSection`, `WaitlistModal`, `DynamicWaitlistBanner`).
  - Identical `shake` rejection animations and `AnimatePresence` UX reveals logic mapped globally.

### 5. Utilities & Footer
- **Footer**: `© 2026 GAME CIRCLE. ALL RIGHTS RESERVED.`
  - Credit: `Designed & Developed by Silicore Technologies Pvt. Ltd.`
- **Deployment**: Vercel ready via GitHub pipeline with proper `.gitignore` allocations.
```
