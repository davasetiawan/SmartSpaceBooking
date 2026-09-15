---
name: Sonder-Inspired Architectural Hospitality
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#444748'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#626262'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1b1a'
  on-tertiary-container: '#868381'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e6e1df'
  tertiary-fixed-dim: '#cac6c3'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
  surface-pure: '#FFFFFF'
  border-warm: '#EBE7DF'
  status-active: '#4A6B5D'
  status-pending: '#C88A2B'
  status-cancelled: '#9E3B3B'
  status-finished: '#333333'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  code-monetary:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

This design system translates the restrained, editorial elegance of high-end boutique hospitality into a workplace reservation platform. Rejecting aggressive SaaS visual tropes, loud badges, and synthetic drop shadows, the system treats architectural spaces with calm authority.

The aesthetic philosophy centers around architectural minimalism:
- **Warm Architectural Airiness**: Canvas backgrounds rely on warm off-white tones rather than sterile clinical gray or pure hex white, establishing visual warmth and reducing eye strain during deep productivity workflows.
- **Editorial Typography**: Elegant serif titles paired with pragmatic, humanized sans-serif interface controls invoke the tactility of architectural monographs and luxury travel catalogs.
- **Subtle Tactility**: Flat surfaces punctuated by low-contrast warm outlines (`1px solid #EBE7DF`) and organic pill-shaped touchpoints create an inviting, human-centric workspace environment.

## Colors

The palette establishes an organic luxury tone through high-contrast deep ink and creamy warm neutrals, augmented by restrained, natural status accents.

- **Primary (`#121212`)**: Ink charcoal for commanding primary actions, high-contrast headings, and focused borders.
- **Secondary (`#666666`)**: Taupe grey for supporting labels, meta information, and secondary controls.
- **Neutral Canvas (`#FBF9F5`)**: A warm, ambient off-white base layer that frames workspace photography.
- **Surface Layer (`#FFFFFF`)**: Pure white cards and container layers that rest softly on top of the warm neutral canvas.
- **Border Divider (`#EBE7DF`)**: Soft warm lines providing structural definition without visual noise.
- **Semantic Accents**: Architectural status indicators derived from muted organic pigments:
  - `status-active` (`#4A6B5D`): Calming sage green for confirmed and active bookings.
  - `status-pending` (`#C88A2B`): Warm ochre/amber for unconfirmed or processing transactions.
  - `status-cancelled` (`#9E3B3B`): Muted crimson for terminations or system alerts.
  - `status-finished` (`#333333`): Deep neutral charcoal for archived transactions.

## Typography

The type scale combines editorial high-contrast serifs with ultra-readable geometric sans-serifs:

- **Headlines & Editorial Titles**: Rendered in `Playfair Display` with deliberate negative letter tracking to reinforce luxury editorial pacing.
- **Interface & Body Text**: Rendered in `Plus Jakarta Sans` for optical clarity within forms, tables, operational dashboards, and dynamic reservation summaries.
- **Numerical & Financial Data**: Booking reference codes (`kode_booking`) and Indonesian Rupiah currency values apply `code-monetary` with tabular numbers to ensure effortless alignment across complex tables, invoices, and digital boarding passes.

## Layout & Spacing

This layout adheres to a 12-column fluid grid system on desktop and tablet, collapsing to a single or dual column layout on mobile devices.

- **Desktop (≥1200px)**: 12 columns with `1.5rem` gutters and generous `3rem` section margins, providing breathability around architecture galleries and booking engines.
- **Tablet (768px - 1199px)**: 8 columns with `1.5rem` gutters and `2rem` page padding. Modals and checkout panels transition from side-by-side splits into progressive vertical stacks.
- **Mobile (≤767px)**: 4 columns with `1rem` gutters and `1.25rem` screen margins. Floating booking summaries lock to the bottom viewport with safe-area padding.

## Elevation & Depth

Rather than relying on heavy blurred drop shadows, depth is achieved through planar stacking and warm hairline structural boundaries:

- **Flat Neutral Separation**: Base background sits at `#FBF9F5`. Foreground surfaces and cards use `#FFFFFF`, delimited by a subtle border: `1px solid #EBE7DF`.
- **Atmospheric Hover**: Interactive cards elevate subtly on hover using an ambient warm diffusion: `box-shadow: 0 10px 30px rgba(18, 18, 18, 0.04)`.
- **Modals and Overlay Drawers**: Modals employ a translucent warm backdrop overlay (`rgba(18, 18, 18, 0.35)`) and a diffused shadow: `0 20px 48px rgba(18, 18, 18, 0.08)`.

## Shapes

The design system incorporates full pill radii (`roundedness: 3`) for interactive controls while maintaining structured, architectural radiuses for containers:

- **Interactive Controls (Buttons, Inputs, Search Bars, Badges)**: Full pill curvature (`rounded-full` / `9999px`) provides a soft, approachable contrast to angular room photography.
- **Card Containers & Modals**: Soft architectural rounding (`16px` / `1rem`) prevents visual hardness while maintaining modern framing.
- **Media Containers (Galleries, Space Photos)**: Rounded corners set to `12px` (`0.75rem`), with images clipped cleanly to maintain layout rigor.

## Components

### Buttons
- **Primary CTA**: Deep ink background (`#121212`), white text (`#FFFFFF`), full pill shape (`rounded-full`), padded `12px 28px`. Hover states slightly soften to `rgba(18, 18, 18, 0.88)`.
- **Secondary / Ghost**: Pure white background (`#FFFFFF`), border `1px solid #EBE7DF`, ink text (`#121212`), pill shape. Hover shifts background to `#FBF9F5`.
- **Subtle Action**: Transparent background with an underline accent on hover; used for tertiary navigation and utility links.

### Form Inputs & Floating Fields
- Input containers use pure white (`#FFFFFF`) surfaces with a border of `1px solid #EBE7DF` and pill geometry (`9999px`) or soft capsule rounding (`12px`).
- Labels sit cleanly within the field or float above in taupe grey (`#666666`). Focused states swap the border to crisp ink charcoal (`#121212`) without garish outer glows.

### Status Chips & Badges
- Ultra-compact pill tags (`rounded-full`) with uppercase typography (`label-sm`, letter-spacing `0.05em`).
- Semantic colors use low-opacity backgrounds with solid pigmented text:
  - **Active / Confirmed**: Background `rgba(74, 107, 93, 0.12)`, text `#4A6B5D`.
  - **Pending**: Background `rgba(200, 138, 43, 0.12)`, text `#C88A2B`.
  - **Cancelled**: Background `rgba(158, 59, 59, 0.12)`, text `#9E3B3B`.
  - **Archived / Finished**: Background `rgba(51, 51, 51, 0.1)`, text `#333333`.

### Cards & Space Tiles
- Surfaces sit on pure white (`#FFFFFF`) with a `1px solid #EBE7DF` perimeter outline and `16px` border radius.
- Imagery features an aspect ratio of `4:3` or `16:9` with subtle zoom transitions on parent hover. Content areas maintain clean padding (`space-lg`), separating Playfair Display titles from pricing data formatted in JetBrains Mono.

### Digital Boarding Pass (E-Ticket)
- A specialized component styled as an architectural guest pass: split top and bottom sections with a subtle dashed divider (`#EBE7DF`).
- Prominently features a high-density QR code for check-in scanning alongside verified timestamps, space allocations, and print-ready styles that automatically suppress navigation during `@media print`.