# BriefKit Brand Identity & Design System Guide

**Version 1.0**

Welcome to the BriefKit Brand Identity Guide. This document defines the visual style, design principles, typography standards, color psychology, and brand voice for BriefKit.

---

## 1. Brand Concept & Positioning

**BriefKit** transforms briefs into breakthroughs. The name captures our dual nature:

- **Brief** — We distill complex ideas into their essential form. Clarity over clutter. Signal over noise.
- **Kit** — We provide the complete toolkit to act on that clarity. Ready-to-use, assembled, purposeful.

### Brand Promise
Turn your brief into a breakthrough — the smart toolkit that bridges strategy and execution.

### Visual Metaphor
A document (the brief) that unfolds into an organized set of precision tools (the kit). The spark of insight — the amber accent — represents the transformative moment when brief meets kit.

---

## 2. Logo Design (`logo-icon.svg`, `logo-full.svg`, `logo-white.svg`)

### Concept
The BriefKit logo features a **document-with-tools** motif inside a rounded square:

- **The Document Shape**: A clean, folded-corner page representing the "brief" — structured information, distilled to its essence. Three horizontal lines within suggest content, organized and concise.
- **The Kit Elements**: Three rounded squares below the text lines represent the toolkit components. Each has a distinct internal mark:
  - A **square cutout** — structure and precision
  - An **arrow pointing up** — progress and transformation
  - A **circle** — completion and wholeness
- **The Spark**: An amber dot with a white core at the fold corner — the moment of insight, the spark that activates the brief into a kit.
- **Gradient Fill**: The background transitions from sky blue → indigo → purple, representing the journey from clarity to transformation.

### Logo Formats
| Format | File | Use Case |
|--------|------|----------|
| **Icon** | `logo-icon.svg` | App icons, favicons, avatars, social media profiles |
| **Full (Light)** | `logo-full.svg` | Light backgrounds, headers, email signatures |
| **Full (Dark)** | `logo-white.svg` | Dark backgrounds, SaaS dashboards, overlays |

### Logo Usage Rules
- **Minimum size**: 32px for icon, 200px wide for full logo
- **Clear space**: Equal to the height of the icon mark on all sides
- **Never** stretch, skew, or rotate the logo
- **Never** place the light logo on light backgrounds without a container
- **Never** change logo colors outside the approved palette
- The spark (amber dot) should always remain visible and not be cropped

---

## 3. Color Palette

### Brand Architecture

BriefKit's color system is built on a **clarity → intelligence → transformation** progression:

```
Sky Blue (Clarity)  →  Indigo (Intelligence)  →  Purple (Transformation)
     #0EA5E9                #6366F1                  #A855F7
```

### Primary: Sky Blue `#0EA5E9`
- **Psychology**: Openness, clarity, communication, trustworthiness
- **Usage**: Primary CTAs, brand presence, navigation highlights, progress indicators
- **Voice**: "Let's make this clear"

### Secondary: Indigo `#6366F1`
- **Psychology**: Intelligence, depth, precision, capability
- **Usage**: Hover states, secondary CTAs, data visualizations, feature highlights
- **Voice**: "Smart and capable"

### Accent: Purple `#A855F7`
- **Psychology**: Creativity, premium quality, transformation, magic
- **Usage**: Premium features, AI-generated content markers, upgrade prompts, badges
- **Voice**: "Something special happens here"

### Spark: Amber `#F59E0B`
- **Psychology**: Insight, energy, warmth, the "aha" moment
- **Usage**: Notifications, attention indicators, limited-time offers, success states
- **Voice**: "Pay attention — insight incoming"
- **Usage rule**: Use sparingly. Maximum 5% of any view. Too much amber dilutes its impact.

### Neutral Palette

**Dark Theme** (Primary — for SaaS dashboards and app interfaces):
| Token | Hex | Usage |
|-------|-----|-------|
| `--dark-bg` | `#0F172A` | Page background |
| `--dark-bg-elevated` | `#1E293B` | Cards, panels, modals |
| `--dark-bg-input` | `#334155` | Input fields, wells |
| `--dark-text-main` | `#F8FAFC` | Primary text |
| `--dark-text-muted` | `#94A3B8` | Secondary text |
| `--dark-text-dim` | `#64748B` | Tertiary text, placeholders |

**Light Theme** (for landing pages, marketing, and brand guidelines):
| Token | Hex | Usage |
|-------|-----|-------|
| `--light-bg` | `#F8FAFC` | Page background |
| `--light-bg-card` | `#FFFFFF` | Cards, panels |
| `--light-bg-input` | `#F1F5F9` | Input fields, wells |
| `--light-text-main` | `#0F172A` | Primary text |
| `--light-text-muted` | `#64748B` | Secondary text |
| `--light-text-dim` | `#94A3B8` | Tertiary text |

### Color Pairing Rules
- ✅ Sky Blue + Indigo (primary gradient)
- ✅ Indigo + Purple (accent gradient)
- ✅ Sky Blue + Purple (spectrum gradient — use for special moments)
- ✅ Amber on dark backgrounds (spark)
- ✅ Amber paired with indigo (high-contrast alert)
- ❌ Never use Sky Blue + Amber as a primary combination (reads as "beach/warning")
- ❌ Never use Purple + Amber as adjacent fills (vibrates visually)

---

## 4. Typography Scale

### Font Families

**Display: Plus Jakarta Sans** (Titles, Hero Headers, Panel Names)
- A modern geometric sans-serif with clean open counters and smooth curve terminals
- Friendly, precise, and futuristic at large sizes
- Weights used: 600 (semibold), 700 (bold), 800 (extrabold)

**Body: Inter** (Paragraphs, Labels, UI Elements, Navigation)
- A world-class neo-grotesque designed specifically for screen readability
- Excellent legibility at small sizes and high density
- Weights used: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

**Mono: JetBrains Mono** (Code, Data, Technical Content)
- A monospaced font designed for developers with increased letter height
- Clear distinction between similar characters (0/O, 1/l/I)
- Weights used: 400 (regular), 500 (medium)

### Type Scale (1.25 Major Third)

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| 7xl | 72px | 800 | 1 | -0.05em | Hero headlines |
| 6xl | 60px | 800 | 1.05 | -0.05em | Section headlines |
| 5xl | 48px | 700 | 1.1 | -0.025em | Page titles |
| 4xl | 36px | 700 | 1.15 | -0.025em | Sub-section titles |
| 3xl | 30px | 600 | 1.25 | 0 | Card titles |
| 2xl | 24px | 600 | 1.3 | 0 | Component headers |
| xl | 20px | 600 | 1.375 | 0 | Emphasized body |
| lg | 18px | 500 | 1.5 | 0 | Large body text |
| base | 16px | 400 | 1.5 | 0 | Default body text |
| sm | 14px | 500 | 1.5 | 0.025em | UI labels, captions |
| xs | 12px | 500 | 1.5 | 0.05em | Badges, overlines |

---

## 5. Spacing & Layout

### Spacing Scale (4px base)
The spacing system uses a 4px grid for consistent, harmonious layouts:

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-1` | 4px | Inline gaps, icon padding |
| `--spacing-2` | 8px | Compact element gaps |
| `--spacing-3` | 12px | Tight internal padding |
| `--spacing-4` | 16px | Standard padding |
| `--spacing-6` | 24px | Comfortable card padding |
| `--spacing-8` | 32px | Section internal gaps |
| `--spacing-12` | 48px | Section separators |
| `--spacing-16` | 64px | Page-level spacing |
| `--spacing-24` | 96px | Major section breaks |

### Grid System
- **Max content width**: 1280px
- **Page margins**: 24px (mobile), 32px (tablet), 48px (desktop)
- **Card grid**: 1 col (mobile), 2 col (tablet), 3 col (desktop)
- **Dashboard grid**: 12-column with 24px gutters

---

## 6. Component Design Tokens

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 6px | Small elements, tags |
| `--radius-md` | 8px | Inputs, small cards |
| `--radius-lg` | 12px | Buttons, cards |
| `--radius-xl` | 16px | Large cards, modals |
| `--radius-2xl` | 24px | Feature sections |
| `--radius-full` | 9999px | Pills, avatars |

### Shadows
| Level | Usage |
|-------|-------|
| `xs` | Subtle separation (inline elements) |
| `sm` | Cards at rest |
| `md` | Hovered cards |
| `lg` | Elevated elements |
| `xl` | Modals, dropdowns |
| `2xl` | Hero elements, splash |

---

## 7. Brand Voice & Tone

BriefKit speaks with **confident clarity**. We don't add complexity — we remove it.

| Principle | Explanation | Example |
|:----------|:-----------|:--------|
| **Clear & Direct** | Say what you mean. No filler, no hedging. | *"Your brief is ready. Ship it."* |
| **Warmly Competent** | Professional but never cold. We're experts who enjoy our work. | *"Nice brief. Here's what we built from it."* |
| **Economy of Words** | Every word earns its place. If it doesn't add meaning, cut it. | *"3 steps. 1 breakthrough."* |
| **Quietly Confident** | We show capability through results, not claims. | *"Used by teams who ship."* |

### Voice Examples

| Context | ❌ Avoid | ✅ Use |
|---------|---------|--------|
| Feature description | "Our revolutionary AI-powered platform leverages cutting-edge..." | "Drop in a brief. Get a complete toolkit." |
| Error message | "An error has occurred in the processing of your request" | "Couldn't save. Try again?" |
| CTA button | "Initiate the Content Generation Process" | "Build My Kit" |
| Success state | "Operation completed successfully!" | "Done. Your kit is ready." |

---

## 8. Motion & Animation

### Principles
1. **Purposeful** — Every animation communicates a state change or guides attention
2. **Snappy** — BriefKit is fast. Animations should feel instant but smooth
3. **Consistent** — Same timing curves across the entire experience

### Timing
| Transition | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| Fast | 150ms | ease-out | Hover states, focus rings |
| Normal | 250ms | ease-out | Button presses, reveals |
| Slow | 350ms | ease-out | Page transitions |
| Spring | 500ms | spring(1, 0.34, 1.56, 0.64) | Delightful moments, completions |

### Key Animations
- **Kit assembly**: Elements slide into place with staggered delays (0ms, 50ms, 100ms)
- **Spark pulse**: Amber dot pulses 2x on hover, drawing attention to the insight moment
- **Brief unfold**: Document expands to reveal kit elements beneath
- **Gradient shift**: Background gradient subtly shifts on scroll (±15° angle)

---

*Designed with precision and purpose,*
**BriefKit Design Team**
