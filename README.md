# Game Circle — Futsal Nepal (Early Access Landing Page)

> **Nepal's First Elite Futsal Booking, Rewards & Tournament Platform**

This repository contains the high-fidelity pre-launch landing page for **Game Circle**. It is designed as an aggressive, cinematic teaser to capture early-access player emails and secure early venue partnerships across Kathmandu and Pokhara.

---

## 🎨 Design System (Carbon Forest)
The application extensively uses an ultra-modern, cinematic design language:
- **Theme**: Deep space carbon blacks `#0A0A0C` contrasted against stark Emerald Green `#10B981` accents.
- **Glassmorphism**: Heavy use of `backdrop-filter: blur` combined with SVG noise overlays for physical texture.
- **Architecture**: `border-radius: 0px` globally to maintain an elite, razor-sharp edge.
- **Motion**: 100% SVG and Canvas-driven physics. **No video or generic hero images.** It uses code to visualize product concepts logically. 
- **Typography**: 
  - *Headings*: **Bebas Neue** (Bold, tight tracking)
  - *Body*: **Outfit** (Clean readability)
  - *Technical/UI*: **JetBrains Mono** (Uppercase, mono-spaced tags)

---

## 🚀 Key Technical Features

### Narrative & Experience
- **Interactive Mouse Tilt**: Most UI cards and panels utilize a custom `useMouseTilt` React hook to add subtle 3D `perspective: 1000px` rotation depending on cursor location.
- **Parallax Storytelling**: Smooth, scroll-locked chapter sequences fading dynamically based on viewport scroll progress.
- **Problem Statement Array**: A robust CSS `position: sticky` stack that presents player pain points card-by-card in a highly legible interface.

### Code-Driven Visualizations (No Assets Required)
- **Canvas Particle Hero**: An 800-particle interactive gravity simulation.
- **SVG Intro Splash Screen**: Dynamically draws a futsal pitch layout line-by-line via CSS keyframes before shattering.
- **Tournament Knockouts**: SVG pathing that procedurally draws an active tournament bracket on scroll entry.
- **Animated SVG Trophy**: A multi-layered, 6-part Stagger animation using Framer Motion that physically builds a loyalty trophy.

### Data Collection & Validation
- **Venue Registration**: Robust dual-column layout strictly validating Nepali phone formats (98/97, 10-digits) with multi-state submit feedback (Idle → Loading → Shake on Error → Success).
- **Global Waitlist Capture**: 
  - Integrated into a static layout container at the page bottom.
  - A universally available `WaitlistModal.tsx` tied to nav actions.
  - A dynamic floating banner pushing early-access retention.

---

## 💻 Tech Stack
- **Framework**: [Next.js 14 App Router](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: `next/font/google`
- **Deployment**: Configured for Vercel

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have Node.js 18+ installed on your system.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ashusza/Futsal_Nepal2nd.git
cd Futsal_Nepal2nd/futsal-nepal
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔒 Competitor Protection Policy
All actual in-app screenshots and literal platform features are purposefully withheld from this repository. Features are abstracted into SVG maps, ping radars, and code-based diagrams to build hype without giving away exact UX pipelines to competitors.

---

*Designed and Developed by Silicore Technologies Pvt. Ltd © 2026.*
