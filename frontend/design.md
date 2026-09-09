# FRONTEND DESIGN SPECIFICATION
## Smart Space Booking — Sonder-Inspired Premium UI
**Referensi Desain**: [sonder.com](https://sonder.com/) | **Acuan Fungsional**: [prd.md](../prd.md)

---

## 1. Filosofi Desain & Prinsip Visual

### 1.1 Design Philosophy
Mengadopsi gaya visual **Sonder.com** yang mengusung konsep *"Curated Urban Stay"* — editorial, sophisticated, dan warm. Desain ini ditransformasi ke konteks **Coworking Space Booking** dengan mempertahankan:

- **Editorial Elegance**: Layout bersih dengan whitespace yang generous, tipografi elegan serif + sans-serif
- **Warm Neutrals**: Palet warna hangat (cream, warm white, deep charcoal) menggantikan palet dingin korporat
- **Photography-First**: Foto ruangan/meja menjadi hero visual utama pada setiap kartu & halaman
- **Curation-Driven UX**: Navigasi intuitif dengan tab/pill filter, mega-menu dropdown, dan search bar prominent
- **Micro-Animations**: Hover effects halus, smooth transitions, slide-in modals, skeleton loaders

### 1.2 Data Attributes & Theme Configuration
Mengadopsi sistem konfigurasi tema Sonder via HTML data attributes:
```html
<html lang="id" 
  data-palette="warm" 
  data-dark="false" 
  data-density="cozy" 
  data-badge="pill" 
  data-font="prata" 
  data-corners="soft2" 
  data-hero="split">
```

---

## 2. Design Tokens & CSS Custom Properties

### 2.1 Color Palette (Warm Sonder-Inspired)

```css
:root {
  /* ═══════════════════════════════════════════
     PRIMARY PALETTE — Warm Sonder Tones
     ═══════════════════════════════════════════ */
  --color-primary:          #1A1A2E;    /* Deep Navy Charcoal — Header, CTA utama */
  --color-primary-hover:    #16162B;    /* Darker hover state */
  --color-primary-light:    #2D2D4A;   /* Lighter variant for cards */
  
  --color-accent:           #C9A96E;    /* Warm Gold — Badge, highlight, CTA accent */
  --color-accent-hover:     #B8953D;    /* Darker gold hover */
  --color-accent-light:     #E8D5A8;   /* Light gold untuk badge background */
  
  --color-secondary:        #3D5A80;    /* Muted Teal Blue — Links, secondary actions */
  --color-secondary-hover:  #2C4460;    /* Darker teal hover */

  /* ═══════════════════════════════════════════
     BACKGROUND PALETTE — Warm Neutrals
     ═══════════════════════════════════════════ */
  --bg-primary:             #FAFAF7;    /* Warm Off-White — Main background */
  --bg-secondary:           #F5F0EB;    /* Warm Cream — Section alternate bg */
  --bg-card:                #FFFFFF;    /* Pure White — Card background */
  --bg-hero:                #1A1A2E;    /* Dark Navy — Hero section */
  --bg-hero-overlay:        rgba(26, 26, 46, 0.55); /* Hero image overlay */
  --bg-dropdown:            #FFFFFF;    /* Dropdown background */
  --bg-modal:               #FFFFFF;    /* Modal background */
  --bg-modal-overlay:       rgba(0, 0, 0, 0.5);     /* Modal backdrop */
  --bg-input:               #FFFFFF;    /* Input field background */
  --bg-input-focus:         #FEFDFB;    /* Input focus state */
  --bg-sidebar:             #1A1A2E;    /* Admin sidebar dark bg */
  --bg-announcement:        #F5F0EB;    /* Top announcement bar */
  --bg-footer:              #1A1A2E;    /* Footer dark background */
  --bg-skeleton:            #E8E4DF;    /* Skeleton loader base */
  --bg-skeleton-shine:      #F5F0EB;    /* Skeleton loader shine */

  /* ═══════════════════════════════════════════
     TEXT COLORS
     ═══════════════════════════════════════════ */
  --text-primary:           #1A1A1A;    /* Heading & body utama */
  --text-secondary:         #6B6B6B;    /* Subtitle, meta text */
  --text-tertiary:          #999999;    /* Placeholder, disabled */
  --text-inverse:           #FFFFFF;    /* Text di atas dark bg */
  --text-link:              #3D5A80;    /* Link color */
  --text-link-hover:        #2C4460;    /* Link hover color */
  --text-accent:            #C9A96E;    /* Accent text (gold) */
  --text-muted:             #8B8B8B;    /* Very muted text */

  /* ═══════════════════════════════════════════
     STATUS / BADGE COLORS — Sesuai PRD Lifecycle
     ═══════════════════════════════════════════ */
  --status-pending:         #F59E0B;    /* Kuning — belum_dikonfirm */
  --status-pending-bg:      #FEF3C7;
  --status-pending-text:    #92400E;
  
  --status-approved:        #10B981;    /* Hijau — disetujui */
  --status-approved-bg:     #D1FAE5;
  --status-approved-text:   #065F46;
  
  --status-active:          #3B82F6;    /* Biru — aktif */
  --status-active-bg:       #DBEAFE;
  --status-active-text:     #1E40AF;
  
  --status-completed:       #6B7280;    /* Abu-abu — selesai */
  --status-completed-bg:    #F3F4F6;
  --status-completed-text:  #374151;
  
  --status-cancelled:       #EF4444;    /* Merah — dibatalkan */
  --status-cancelled-bg:    #FEE2E2;
  --status-cancelled-text:  #991B1B;

  /* ═══════════════════════════════════════════
     SPACE TYPE BADGE COLORS
     ═══════════════════════════════════════════ */
  --badge-desk:             #8B5CF6;    /* Purple — Personal Desk */
  --badge-desk-bg:          #EDE9FE;
  --badge-meeting:          #0EA5E9;    /* Sky Blue — Meeting Room */
  --badge-meeting-bg:       #E0F2FE;
  --badge-office:           #F97316;    /* Orange — Private Office */
  --badge-office-bg:        #FFF7ED;

  /* ═══════════════════════════════════════════
     BORDER & DIVIDER
     ═══════════════════════════════════════════ */
  --border-light:           #E8E4DF;    /* Light warm border */
  --border-default:         #D4CFC8;    /* Default border */
  --border-dark:            #B8B3AC;    /* Darker border */
  --border-focus:           #C9A96E;    /* Focus ring (gold accent) */
  --border-error:           #EF4444;    /* Error state border */
  --border-success:         #10B981;    /* Success state border */
  --border-radius-sm:       6px;        /* Small radius (Sonder soft2) */
  --border-radius-md:       10px;       /* Medium radius */
  --border-radius-lg:       14px;       /* Large radius — cards */
  --border-radius-xl:       20px;       /* Extra large — modals */
  --border-radius-pill:     9999px;     /* Pill badges & buttons */

  /* ═══════════════════════════════════════════
     SHADOWS (Warm-toned, layered)
     ═══════════════════════════════════════════ */
  --shadow-sm:              0 1px 3px rgba(26, 26, 46, 0.06), 0 1px 2px rgba(26, 26, 46, 0.04);
  --shadow-md:              0 4px 12px rgba(26, 26, 46, 0.08), 0 2px 4px rgba(26, 26, 46, 0.04);
  --shadow-lg:              0 10px 30px rgba(26, 26, 46, 0.10), 0 4px 8px rgba(26, 26, 46, 0.04);
  --shadow-xl:              0 20px 50px rgba(26, 26, 46, 0.15), 0 8px 16px rgba(26, 26, 46, 0.06);
  --shadow-card:            0 2px 8px rgba(26, 26, 46, 0.06);
  --shadow-card-hover:      0 8px 24px rgba(26, 26, 46, 0.12), 0 4px 8px rgba(26, 26, 46, 0.06);
  --shadow-dropdown:        0 10px 40px rgba(26, 26, 46, 0.15);
  --shadow-modal:           0 25px 60px rgba(26, 26, 46, 0.20);
  --shadow-header:          0 1px 0 rgba(26, 26, 46, 0.06);

  /* ═══════════════════════════════════════════
     SPACING SYSTEM (8px base grid)
     ═══════════════════════════════════════════ */
  --space-1:                4px;
  --space-2:                8px;
  --space-3:                12px;
  --space-4:                16px;
  --space-5:                20px;
  --space-6:                24px;
  --space-8:                32px;
  --space-10:               40px;
  --space-12:               48px;
  --space-16:               64px;
  --space-20:               80px;
  --space-24:               96px;
  --space-section:          80px;       /* Jarak antar section utama */

  /* ═══════════════════════════════════════════
     LAYOUT
     ═══════════════════════════════════════════ */
  --container-max:          1280px;     /* Max width container */
  --container-narrow:       960px;      /* Narrow content width */
  --container-wide:         1440px;     /* Wide container (admin) */
  --header-height:          72px;       /* Navbar height */
  --header-height-scrolled: 64px;       /* Navbar height after scroll */
  --announcement-height:    40px;       /* Top announcement bar */
  --sidebar-width:          260px;      /* Admin sidebar width */
  --sidebar-collapsed:      72px;       /* Sidebar collapsed width */
  --footer-min-height:      320px;      /* Footer minimum height */

  /* ═══════════════════════════════════════════
     Z-INDEX SCALE
     ═══════════════════════════════════════════ */
  --z-dropdown:             100;
  --z-sticky:               200;
  --z-header:               300;
  --z-overlay:              400;
  --z-modal:                500;
  --z-toast:                600;
  --z-tooltip:              700;

  /* ═══════════════════════════════════════════
     TRANSITIONS
     ═══════════════════════════════════════════ */
  --transition-fast:        150ms ease;
  --transition-base:        250ms ease;
  --transition-slow:        400ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring:      500ms cubic-bezier(0.34, 1.56, 0.64, 1);
  --transition-slide:       350ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 2.2 Typography System

Mengikuti pendekatan Sonder yang menggunakan **dual font pairing**: serif untuk heading editorial + sans-serif untuk body (Inter + Mulish di Sonder). Disesuaikan dengan PRD yang menetapkan *Plus Jakarta Sans* dan *JetBrains Mono*.

```css
/* ═══════════════════════════════════════════
   FONT IMPORTS
   ═══════════════════════════════════════════ */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Prata&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

:root {
  /* Font Families */
  --font-heading:       'Prata', 'Georgia', serif;              /* Sonder-style serif headings */
  --font-body:          'Plus Jakarta Sans', 'Inter', sans-serif; /* PRD body font */
  --font-mono:          'JetBrains Mono', 'Fira Code', monospace; /* PRD kode booking & nominal */
  --font-ui:            'Plus Jakarta Sans', system-ui, sans-serif; /* UI elements */

  /* Font Sizes — Modular Scale (1.25 ratio) */
  --text-xs:            0.75rem;      /* 12px — Badge text, caption */
  --text-sm:            0.8125rem;    /* 13px — Meta text, timestamp */
  --text-base:          0.9375rem;    /* 15px — Body text default */
  --text-md:            1rem;         /* 16px — Card titles, form labels */
  --text-lg:            1.125rem;     /* 18px — Subheadings */
  --text-xl:            1.375rem;     /* 22px — Section titles */
  --text-2xl:           1.75rem;      /* 28px — Page titles */
  --text-3xl:           2.25rem;      /* 36px — Hero sub-heading */
  --text-4xl:           3rem;         /* 48px — Hero heading */
  --text-5xl:           3.75rem;      /* 60px — Landing hero (desktop) */

  /* Font Weights */
  --weight-regular:     400;
  --weight-medium:      500;
  --weight-semibold:    600;
  --weight-bold:        700;
  --weight-extrabold:   800;

  /* Line Heights */
  --leading-tight:      1.2;          /* Headings */
  --leading-snug:       1.35;         /* Sub-headings */
  --leading-normal:     1.55;         /* Body text */
  --leading-relaxed:    1.7;          /* Long-form text */

  /* Letter Spacing */
  --tracking-tight:     -0.02em;      /* Headings */
  --tracking-normal:    0;            /* Body */
  --tracking-wide:      0.04em;       /* Eyebrow text, badges */
  --tracking-wider:     0.08em;       /* All-caps labels */
}
```

**Penggunaan Tipografi per Elemen** (Mapping PRD):
| Elemen | Font | Size | Weight | Keterangan |
|--------|------|------|--------|------------|
| Hero Heading (H1) | `--font-heading` (Prata) | `--text-4xl` / `--text-5xl` | `--weight-regular` | Serif editorial ala Sonder |
| Hero Sub-heading | `--font-body` | `--text-3xl` | `--weight-regular` + italic | Italic accent ala Sonder |
| Eyebrow Text | `--font-ui` | `--text-xs` | `--weight-semibold` | ALL CAPS + `--tracking-wider` |
| Section Title (H2) | `--font-heading` | `--text-2xl` | `--weight-regular` | Dengan italic `<em>` accent |
| Card Title | `--font-body` | `--text-md` | `--weight-semibold` | Max 2 baris (ellipsis) |
| Kode Booking | `--font-mono` | `--text-sm` | `--weight-semibold` | Format: `BOOK-YYYYMMDD-XXXX` |
| Nominal IDR | `--font-mono` | `--text-md` | `--weight-bold` | Format: `IDR 150.000` |
| E-Ticket No. | `--font-mono` | `--text-base` | `--weight-semibold` | Format: `TICKET-MOKLET-...` |
| Nav Links | `--font-ui` | `--text-base` | `--weight-medium` | Letter-spacing normal |
| Button Text | `--font-ui` | `--text-sm` — `--text-base` | `--weight-semibold` | Tergantung ukuran |
| Body Text | `--font-body` | `--text-base` | `--weight-regular` | Line-height relaxed |
| Form Labels | `--font-ui` | `--text-sm` | `--weight-medium` | Label di atas input |
| Table Header | `--font-ui` | `--text-sm` | `--weight-semibold` | ALL CAPS, tracking wide |

---

## 3. Layout & Page Structure

### 3.1 Overall Page Architecture (Sonder Split-Hero Style)

```
+-------------------------------------------------------------+
| TOP ANNOUNCEMENT BAR (40px, dismissible)                     |
+-------------------------------------------------------------+
| HEADER / NAVIGATION (72px, sticky on scroll)                 |
|  [LOGO]     [NAV LINKS (center)]     [Search + Profil]      |
+-------------------------------------------------------------+
| HERO SECTION (Split Layout — Sonder Style)                   |
|  +------------------------+--------------------------------+ |
|  |   HERO CONTENT         |     HERO IMAGE SLIDER          | |
|  |   - Eyebrow label      |     (Autoplay, 4s interval)    | |
|  |   - Sub-heading        |     (Full-bleed photography)   | |
|  |   - H1 Heading         |                                | |
|  |   - Pill Filters       |                                | |
|  |   - Search Bar         |                                | |
|  +------------------------+--------------------------------+ |
+-------------------------------------------------------------+
| FEATURED SPACES (Tab Component — Sonder city tabs style)     |
|  - Eyebrow: "Populer Minggu Ini"                            |
|  - Section Title (Prata serif + italic em)                   |
|  - Tab Pills: Semua / Personal Desk / Meeting / Office       |
|  - Card Grid (4 kolom desktop, slider mobile)                |
|  - "Lihat Semua ->" link                                     |
+-------------------------------------------------------------+
| VALUE PROPOSITION SECTION (3-column icons)                   |
+-------------------------------------------------------------+
| TESTIMONIALS / TRUST SECTION                                 |
+-------------------------------------------------------------+
| CTA SECTION (Full-width banner)                              |
+-------------------------------------------------------------+
| FOOTER (Dark bg, multi-column)                               |
+-------------------------------------------------------------+
```

### 3.2 Admin Dashboard Layout

```
+-------------------------------------------------------------+
| ADMIN HEADER (72px, dark-accented)                           |
|  [LOGO]                              [Admin Name + Avatar]  |
+----------+--------------------------------------------------+
| SIDEBAR  |  MAIN CONTENT AREA                               |
| (260px)  |  +----------------------------------------------+|
|          |  | PAGE TITLE + BREADCRUMB                       ||
| +------+ |  +----------------------------------------------+|
| | Menu | |  | METRIC CARDS ROW                              ||
| | Items| |  |  [Card] [Card] [Card] [Card] [Card]          ||
| |      | |  +----------------------------------------------+|
| | Profil| |  | FILTER BAR                                   ||
| | Member| |  +----------------------------------------------+|
| | Space | |  | DATA TABLE / CARDS GRID                      ||
| | Diskon| |  |                                              ||
| | Reserv| |  +----------------------------------------------+|
| | Report| |                                                  |
| | QR Scn| |                                                  |
| +------+ |                                                  |
+----------+--------------------------------------------------+
```

---

## 4. Komponen UI — Spesifikasi Detail

### 4.1 Header / Navigation (Sonder-Style)

**Referensi**: Navigasi Sonder dengan mega-dropdown, logo centered-left, search icon + hamburger di kanan.

| Properti | Spesifikasi |
|----------|-------------|
| Tinggi | `72px` (default), `64px` (scrolled, sticky) |
| Background | `#FFFFFF` dengan `box-shadow: var(--shadow-header)` saat scroll |
| Position | `sticky`, `top: 0`, `z-index: var(--z-header)` |
| Logo | SVG/text mark, max-height `32px`, click -> homepage |
| Nav Links | `font: var(--font-ui)`, `size: var(--text-base)`, `weight: 500` |
| Nav Hover | Underline slide-in dari kiri `2px solid var(--color-accent)` |
| Nav Active | `color: var(--color-primary)`, underline accent |
| Mega Dropdown | `background: white`, `shadow: var(--shadow-dropdown)`, grid 2-3 kolom + featured image card (kanan) |
| Search Icon | Circle button `36px`, stroke icon `1.5px` |
| Profile Avatar | `32px` rounded circle, border `2px solid var(--border-light)` |
| Mobile Hamburger | `18x18` SVG, stroke `1.6px`, buka side panel slide-in dari kanan |
| Transition | `height 250ms ease, box-shadow 250ms ease` saat scroll |

**Member Navigation Items** (sesuai PRD 7 layar member):
1. `Katalog` -> Halaman katalog space [MEM-03]
2. `Booking Saya` -> Status pemesanan [MEM-05]
3. `Histori` -> Histori pemesanan [MEM-06]

**Admin Navigation Items** (sesuai PRD 9 layar admin):
1. `Dashboard` -> Overview / Report [ADM-09]
2. `Profil Space` -> Manajemen profil [ADM-03]
3. `Member` -> CRUD Member [ADM-04]
4. `Ruangan` -> CRUD Space [ADM-05]
5. `Diskon` -> CRUD Promo [ADM-06]
6. `Reservasi` -> Monitoring [ADM-08]
7. `QR Scanner` -> Check-in [ADM-07]

### 4.2 Hero Section (Sonder Split Layout)

**Referensi**: Sonder menggunakan layout split — konten di kiri 45%, image slider di kanan 55%.

```
+----------------------------+----------------------------------+
|  ----- bar -----           |                                  |
|  Eyebrow Label             |    +----------------------------+|
|                            |    |                            ||
|  "Temukan ruang kerja      |    |  HERO IMAGE SLIDER         ||
|   yang menginspirasi       |    |  (Auto-play 4 detik)       ||
|   produktivitas."          |    |                            ||
|                            |    |  o o * o o o               ||
|  [Semua] [Desk] [Meet]     |    +----------------------------+|
|                            |                                  |
|  [Search icon] Cari...     |                                  |
+----------------------------+----------------------------------+
```

| Properti | Spesifikasi |
|----------|-------------|
| Layout | CSS Grid: `grid-template-columns: 45% 55%` (desktop) |
| Content Side Padding | `var(--space-16) var(--space-12)` |
| Eyebrow | `font-size: var(--text-xs)`, `letter-spacing: var(--tracking-wider)`, `text-transform: uppercase`, `color: var(--text-secondary)`, dengan `bar` dekoratif `30px x 2px` di kiri |
| Sub-heading | `font: var(--font-body)`, `size: var(--text-3xl)`, `weight: 400`, italic `<em>` accent dengan `color: var(--text-secondary)` |
| H1 Heading | `font: var(--font-heading)` (Prata), `size: var(--text-4xl)`, `weight: 400`, `line-height: var(--leading-tight)`, `color: var(--text-primary)` — SEO: 1 per page |
| Pill Filters | Border-radius `var(--border-radius-pill)`, `padding: 8px 20px`, `font-size: var(--text-sm)`, `transition: var(--transition-fast)`. Active: `bg: var(--color-primary)`, `color: white` |
| Search Bar | `border-radius: var(--border-radius-pill)`, `height: 52px`, `border: 1.5px solid var(--border-default)`, `padding: 0 20px`, icon search di dalam |
| Search Submit Button | `background: var(--color-primary)`, `color: white`, `border-radius: var(--border-radius-pill)`, `padding: 12px 28px`, icon search + text "Cari Space" |
| Image Slider | `border-radius: 0 0 0 var(--border-radius-xl)` (rounded kiri-bawah), `overflow: hidden`, object-fit cover |
| Slider Dots | `6px` circles, `gap: 8px`, active dot: `background: white`, `scale(1.3)` |
| Auto-play | Interval `4000ms`, pause on hover |
| Mobile | Stack vertikal: image di atas, content di bawah. `100vh` height |

### 4.3 Space Card Component (Sonder Property Tile v3)

**Referensi**: Sonder property card dengan image slider, badge, rating, price, dan CTA button.

```
+---------------------------------+
|  +----------------------------+ |
|  |        FOTO 16:9           |L|
|  |  < (slider arrows) >      | |
|  |  o o * o o                 | |
|  |  +----------------+       | |
|  |  | Desk           |       | |
|  |  +----------------+       | |
|  +----------------------------+ |
|                                 |
|  Personal Desk Flexi 01         |
|  Pin Lantai 2 - Zona A          |
|  1 Orang  -  WiFi, AC           |
|                                 |
|  +---------+----------+--------+|
|  | IDR 35K |          | Book ->||
|  | /Jam    |          |        ||
|  +---------+----------+--------+|
+---------------------------------+
```

| Properti | Spesifikasi |
|----------|-------------|
| Container | `border-radius: var(--border-radius-lg)`, `background: var(--bg-card)`, `border: 1px solid var(--border-light)`, `overflow: hidden` |
| Shadow | Default: `var(--shadow-card)`, Hover: `var(--shadow-card-hover)` |
| Hover Effect | `transform: translateY(-4px)`, `transition: var(--transition-slow)` |
| Image Container | Aspect ratio `16:9` (`aspect-ratio: 16/9`), `overflow: hidden` |
| Image Hover | `transform: scale(1.05)`, `transition: 600ms ease` |
| Image Slider Arrows | `32px` circle, `background: rgba(255,255,255,0.9)`, opacity `0` -> `1` on card hover |
| Bookmark Icon | Heart SVG, `position: absolute`, `top: 12px`, `right: 12px`, `32px`, backdrop-blur |
| Type Badge | `position: absolute`, `bottom: 12px`, `left: 12px`, pill shape, background sesuai tipe (desk/meeting/office), `font-size: var(--text-xs)`, `font-weight: 600`, icon + text |
| Callout Badge | (Opsional) `"Populer"`, `"Baru"` — `position: absolute`, `top: 12px`, `left: 12px`, pill, accent bg |
| Card Body Padding | `var(--space-4) var(--space-5)` |
| Title | `font: var(--font-body)`, `size: var(--text-md)`, `weight: 600`, max 2 lines ellipsis, `color: var(--text-primary)` |
| Location | `font-size: var(--text-sm)`, `color: var(--text-secondary)`, icon pin `14px` |
| Attributes | `font-size: var(--text-sm)`, inline pills separated by `middot`, icon + text |
| Amenities Row | Icon list `16px` SVG icons, max 2 visible + "..." more button -> tooltip |
| Price Area | Bottom section, separated by `border-top: 1px solid var(--border-light)`, `padding-top: var(--space-3)` |
| Price Text | `font: var(--font-mono)`, `size: var(--text-md)`, `weight: 700`, `color: var(--text-primary)` |
| Per-unit Label | `/Jam` — `font-size: var(--text-sm)`, `color: var(--text-secondary)` |
| CTA Button | `"Booking"`, pill shape, `bg: var(--color-primary)`, `color: white`, `font-size: var(--text-sm)`, `weight: 600` |
| Grid Layout | Desktop: `4 kolom` (`repeat(4, 1fr)`, `gap: 24px`), Tablet: `2 kolom`, Mobile: horizontal scroll slider |
| Availability Badge | Green dot `Tersedia` atau Red `Terisi` — sesuai PRD [MEM-03] |

### 4.4 Tab / Pill Filter Component (Sonder Tab Style)

**Referensi**: Sonder menggunakan tab horizontal scrollable untuk filter kota, dengan gaya pill.

| Properti | Spesifikasi |
|----------|-------------|
| Container | `display: flex`, `gap: 8px`, `overflow-x: auto`, scrollbar hidden |
| Pill Item | `padding: 10px 24px`, `border-radius: var(--border-radius-pill)`, `font-size: var(--text-sm)`, `font-weight: 500`, `cursor: pointer`, `white-space: nowrap` |
| Default State | `background: transparent`, `border: 1.5px solid var(--border-default)`, `color: var(--text-secondary)` |
| Active State | `background: var(--color-primary)`, `border-color: var(--color-primary)`, `color: white` |
| Hover State | `border-color: var(--color-primary)`, `color: var(--color-primary)` |
| Transition | `var(--transition-fast)` untuk semua property |
| "View All" Link | `font-size: var(--text-sm)`, `color: var(--text-link)`, `font-weight: 500`, arrow `->` icon, positioned right |
| Sesuai PRD | Filter pill: `Semua`, `Personal Desk`, `Private Office`, `Meeting Room` [MEM-03] |
| Status Tabs | `Semua`, `Menunggu Konfirmasi`, `Disetujui`, `Aktif`, `Selesai`, `Dibatalkan` [MEM-05] |

### 4.5 Search Bar Component (Sonder Search Popup)

**Referensi**: Sonder memiliki search bar dengan popup overlay fullscreen, autocomplete, dan pill intent selector.

| Properti | Spesifikasi |
|----------|-------------|
| Inline (Hero) | `height: 52px`, `border-radius: var(--border-radius-pill)`, `border: 1.5px solid var(--border-default)`, icon search `20px` kiri, clear `X` kanan |
| Popup Mode | Triggered by search icon di navbar, fullscreen overlay `bg: var(--bg-modal-overlay)`, centered card `max-width: 640px`, `border-radius: var(--border-radius-xl)` |
| Popup Title | `font: var(--font-heading)`, `size: var(--text-xl)`, "Temukan ruang kerja yang sempurna." |
| Popup Subtitle | `font: var(--font-body)`, `size: var(--text-base)`, `color: var(--text-secondary)` |
| Input Field | `height: 52px`, `border-radius: var(--border-radius-md)`, `font-size: var(--text-base)`, `padding: 0 16px`, placeholder: "Cari nama ruangan, fasilitas..." |
| Submit Button | `"Cari Space"`, full-width below input, `bg: var(--color-primary)`, pill shape, `height: 48px` |
| Autocomplete | Dropdown list, max 5 items, icon + text, highlight match text |
| Animation | Popup: `fadeIn + scale(0.95->1)` `300ms`, close: reverse |
| Sesuai PRD | Search bar interaktif [MEM-03]: pencarian nama space / fasilitas |

### 4.6 Button System

| Varian | Background | Text | Border | Border-Radius | Padding | Font |
|--------|-----------|------|--------|---------------|---------|------|
| **Primary** | `var(--color-primary)` | `white` | none | `pill` | `12px 28px` | `--font-ui`, 600 |
| **Primary Hover** | `var(--color-primary-hover)` | `white` | none | `pill` | — | — |
| **Secondary** | `transparent` | `var(--color-primary)` | `1.5px solid var(--color-primary)` | `pill` | `12px 28px` | `--font-ui`, 600 |
| **Accent** | `var(--color-accent)` | `white` | none | `pill` | `12px 28px` | `--font-ui`, 600 |
| **Ghost** | `transparent` | `var(--text-secondary)` | none | `var(--border-radius-md)` | `8px 16px` | `--font-ui`, 500 |
| **Danger** | `var(--status-cancelled)` | `white` | none | `pill` | `10px 24px` | `--font-ui`, 600 |
| **Success** | `var(--status-approved)` | `white` | none | `pill` | `10px 24px` | `--font-ui`, 600 |
| **Icon Button** | `transparent` | `var(--text-secondary)` | `1px solid var(--border-light)` | `50%` (circle) | `10px` | — |

**Ukuran Button:**
| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| `sm` | `36px` | `8px 20px` | `--text-sm` |
| `md` | `44px` | `12px 28px` | `--text-base` |
| `lg` | `52px` | `14px 36px` | `--text-md` |

**Button States:**
- **Hover**: `transform: translateY(-1px)`, shadow meningkat
- **Active**: `transform: translateY(0)`, shadow berkurang
- **Disabled**: `opacity: 0.5`, `cursor: not-allowed`
- **Loading**: Spinner animation `16px` di tengah, text hidden

**Mapping Button ke PRD:**
- "Lanjutkan Pemesanan" -> Primary `lg` [MEM-04]
- "Terapkan Diskon" -> Secondary `sm` [MEM-04]
- "Lihat E-Ticket" -> Accent `sm` [MEM-05]
- "Batalkan Pesanan" -> Danger `sm` [MEM-05]
- "Setujui" / "Check-In" / "Check-Out" -> Success/Primary `sm` [ADM-07]
- "Cetak / Download PDF" -> Secondary `md` + icon printer [MEM-07]
- "Tambah Space" / "Tambah Member" -> Primary `md` + icon `+` [ADM-04/05]

### 4.7 Form Components

#### Input Field
| Properti | Spesifikasi |
|----------|-------------|
| Height | `48px` |
| Border | `1.5px solid var(--border-default)` |
| Border Radius | `var(--border-radius-md)` |
| Background | `var(--bg-input)` |
| Font | `var(--font-body)`, `size: var(--text-base)` |
| Padding | `0 16px` |
| Focus | `border-color: var(--border-focus)`, `box-shadow: 0 0 0 3px rgba(201,169,110,0.15)`, `bg: var(--bg-input-focus)` |
| Error | `border-color: var(--border-error)`, `box-shadow: 0 0 0 3px rgba(239,68,68,0.1)` |
| Label | Di atas input, `font-size: var(--text-sm)`, `weight: 500`, `color: var(--text-primary)`, `margin-bottom: 6px` |
| Helper Text | Di bawah input, `font-size: var(--text-xs)`, `color: var(--text-secondary)` |
| Error Message | Di bawah input, `font-size: var(--text-xs)`, `color: var(--status-cancelled)` |
| Disabled | `opacity: 0.6`, `bg: var(--bg-secondary)`, `cursor: not-allowed` |

#### Select / Dropdown
- Sama dengan input, tambah arrow icon di kanan
- Custom dropdown dengan smooth open animation `max-height` transition

#### Date Picker (PRD: tanggal reservasi, filter bulan/tahun)
- Custom calendar popup, Sonder-style datepicker
- Header: bulan & tahun dengan navigasi `< >`
- Grid 7 kolom (hari), past dates disabled (opacity 0.3)
- Selected date: `bg: var(--color-primary)`, `color: white`, rounded
- Today: ring `border: 2px solid var(--color-accent)`

#### Time Picker (PRD: jam mulai, format 24 jam HH:mm)
- Dropdown list dengan interval 30 menit (07:00 - 22:00)
- Atau custom scroll wheel picker mobile-style

#### File Upload (PRD: foto profil, foto ruangan — max 2MB)
- Drag & drop zone: `border: 2px dashed var(--border-default)`, `border-radius: var(--border-radius-lg)`, `padding: 40px`, center aligned
- Icon upload `48px`, text "Seret foto atau klik untuk upload"
- Preview: thumbnail `80x80` rounded, nama file, size, tombol hapus `X`
- Validasi: MIME type `image/jpeg, image/png, image/webp`, max 2MB

#### Toggle Password (PRD: tombol toggle tampilkan password)
- Eye icon di dalam input field, kanan
- `cursor: pointer`, toggle `type="password"` <-> `type="text"`

### 4.8 Modal / Dialog (Sonder Popup Style)

**Referensi**: Sonder popup search modal dengan overlay blur.

| Properti | Spesifikasi |
|----------|-------------|
| Overlay | `bg: var(--bg-modal-overlay)`, `backdrop-filter: blur(4px)`, `z-index: var(--z-modal)` |
| Container | `max-width: 560px` (small) / `720px` (medium) / `960px` (large), `border-radius: var(--border-radius-xl)`, `padding: 32px`, `bg: var(--bg-modal)` |
| Shadow | `var(--shadow-modal)` |
| Close Button | `position: absolute`, `top: 16px`, `right: 16px`, `X` SVG `18px`, hover: `bg: var(--bg-secondary)` rounded |
| Title | `font: var(--font-heading)`, `size: var(--text-xl)`, `margin-bottom: 8px` |
| Animation Open | `opacity 0->1` + `transform: scale(0.95)->scale(1)` + `translateY(10px)->translateY(0)`, `350ms cubic-bezier(0.4,0,0.2,1)` |
| Animation Close | Reverse, `250ms` |
| Konfirmasi Modal | Title + description + 2 buttons (Cancel + Confirm), destructive: merah |
| Sesuai PRD | Konfirmasi booking [MEM-04], hapus member [ADM-04], hapus space [ADM-05], dll. |

### 4.9 Toast Notification (PRD: feedback visual toast)

| Properti | Spesifikasi |
|----------|-------------|
| Position | `fixed`, `top: 24px`, `right: 24px`, `z-index: var(--z-toast)` |
| Container | `min-width: 320px`, `max-width: 440px`, `border-radius: var(--border-radius-md)`, `padding: 16px 20px`, `shadow: var(--shadow-lg)` |
| Variants | **Success**: border-left `4px solid var(--status-approved)`, icon check. **Error**: border-left merah. **Warning**: border-left kuning. **Info**: border-left biru. |
| Icon | `20px`, colored sesuai variant |
| Title | `font-weight: 600`, `font-size: var(--text-sm)` |
| Message | `font-size: var(--text-sm)`, `color: var(--text-secondary)` |
| Close | `X` button, auto-dismiss after `5000ms` |
| Animation | Slide-in dari kanan `translateX(100%)->translateX(0)`, `var(--transition-spring)` |
| Stack | Multiple toasts stack vertikal, `gap: 8px` |

### 4.10 Badge / Status Pill (PRD: badge status berwarna)

```css
/* Status badges sesuai PRD lifecycle */
.badge { 
  display: inline-flex; 
  align-items: center; 
  gap: 6px;
  padding: 4px 12px; 
  border-radius: var(--border-radius-pill);
  font-size: var(--text-xs); 
  font-weight: 600; 
  letter-spacing: var(--tracking-wide);
}

.badge--pending    { background: var(--status-pending-bg);   color: var(--status-pending-text);   }
.badge--approved   { background: var(--status-approved-bg);  color: var(--status-approved-text);  }
.badge--active     { background: var(--status-active-bg);    color: var(--status-active-text);    }
.badge--completed  { background: var(--status-completed-bg); color: var(--status-completed-text); }
.badge--cancelled  { background: var(--status-cancelled-bg); color: var(--status-cancelled-text); }

/* Space type badges */
.badge--desk       { background: var(--badge-desk-bg);    color: var(--badge-desk);    }
.badge--meeting    { background: var(--badge-meeting-bg); color: var(--badge-meeting); }
.badge--office     { background: var(--badge-office-bg);  color: var(--badge-office);  }
```

| Properti | Spesifikasi |
|----------|-------------|
| Dot Indicator | `6px` circle sebelum text, warna matching |
| Padding | `4px 12px` |
| Border Radius | `var(--border-radius-pill)` |
| Font | `var(--font-ui)`, `size: var(--text-xs)`, `weight: 600` |

### 4.11 Data Table (Admin — Sonder Clean Style)

| Properti | Spesifikasi |
|----------|-------------|
| Container | `border: 1px solid var(--border-light)`, `border-radius: var(--border-radius-lg)`, `overflow: hidden` |
| Header Row | `background: var(--bg-secondary)`, `font: var(--font-ui)`, `size: var(--text-xs)`, `weight: 600`, `text-transform: uppercase`, `letter-spacing: var(--tracking-wider)`, `color: var(--text-secondary)`, `padding: 14px 20px` |
| Body Row | `padding: 16px 20px`, `border-bottom: 1px solid var(--border-light)`, `font-size: var(--text-sm)` |
| Row Hover | `background: var(--bg-secondary)`, `transition: var(--transition-fast)` |
| Alternating Rows | Tidak (clean single bg, Sonder style) |
| Action Buttons | Icon buttons (`edit`, `delete`, `view`) inline, `gap: 8px` |
| Empty State | Ilustrasi + "Belum ada data" text, centered |
| Pagination | Pills: `< 1 2 3 ... 10 >`, active page: accent bg |
| Sesuai PRD | Tabel member [ADM-04], tabel reservasi [ADM-08], tabel diskon [ADM-06] |

### 4.12 Metric Card (Admin Dashboard)

```
+------------------------+
|  [icon]                |
|  Total Transaksi       |
|  Selesai               |
|                        |
|  127                   |
|  ^ 12% dari bulan lalu |
+------------------------+
```

| Properti | Spesifikasi |
|----------|-------------|
| Container | `background: var(--bg-card)`, `border: 1px solid var(--border-light)`, `border-radius: var(--border-radius-lg)`, `padding: 24px` |
| Icon | `40px` rounded square, bg matching accent, `border-radius: var(--border-radius-md)` |
| Label | `font-size: var(--text-sm)`, `color: var(--text-secondary)`, `weight: 500` |
| Value | `font: var(--font-mono)`, `size: var(--text-2xl)`, `weight: 700`, `color: var(--text-primary)` |
| Trend | `font-size: var(--text-xs)`, arrow up/down, green/red |
| Grid | `5 kolom` desktop (sesuai PRD [ADM-09]: 5 metric cards) |
| Sesuai PRD | Total Transaksi, Jam Terpakai, Pendapatan Kotor, Diskon, Pendapatan Bersih |

### 4.13 Chart / Grafik (PRD: Chart.js / ApexCharts)

**Line Chart (Tren Pendapatan Harian) — [ADM-09]:**
| Properti | Spesifikasi |
|----------|-------------|
| Container | `background: var(--bg-card)`, `border-radius: var(--border-radius-lg)`, `padding: 24px` |
| Line Color | `var(--color-accent)` (gold gradient) |
| Fill | `linear-gradient(to bottom, rgba(201,169,110,0.15), transparent)` |
| Grid Lines | `color: var(--border-light)`, dashed, `0.5px` |
| Tooltip | Rounded card, shadow, font-mono untuk nominal |
| Animation | Draw-in dari kiri ke kanan, `1200ms` |

**Doughnut / Bar Chart (Distribusi per Tipe Space) — [ADM-09]:**
| Properti | Spesifikasi |
|----------|-------------|
| Colors | Desk: `var(--badge-desk)`, Meeting: `var(--badge-meeting)`, Office: `var(--badge-office)` |
| Legend | Bottom, inline pills with color dots |
| Hover | Segment expand + tooltip |

### 4.14 E-Ticket Card (PRD: boarding pass / voucher slip style)

**Referensi PRD [MEM-07]**: Kartu tiket bertekstur modern dengan header branding.

```
+-----------------------------------------+
|  +-----------------------------------+  |
|  | SMART SPACE BOOKING               |  |
|  | Coworking Premium Malang          |  |
|  | Jl. Veteran No. 1 | 0812-xxx     |  |
|  +-----------------------------------+  |
| - - - - - - - - - - - - - - - - - - -  |
|                                         |
|  No. Tiket: TICKET-MOKLET-20260830-0012 |
|  Kode Booking: BOOK-20260830-0012       |
|                                         |
|  +---------+   Nama: Ahmad Rizky        |
|  |         |   Instansi: Universitas    |
|  | QR CODE |   Space: Meeting Room A    |
|  |  (big)  |   Tgl: 30 Agustus 2026    |
|  |         |   Jam: 09:00 - 12:00       |
|  +---------+   Durasi: 3 Jam            |
|                                         |
| - - - - - - - - - - - - - - - - - - -  |
|  Subtotal:  IDR 150.000                 |
|  Diskon:   -IDR  30.000 (PROMOAGUSTUS) |
|  TOTAL:     IDR 120.000                 |
|                                         |
|  Status: DISETUJUI                      |
|                                         |
|  +------------------------------+      |
|  |   Cetak / Download PDF       |      |
|  +------------------------------+      |
+-----------------------------------------+
```

| Properti | Spesifikasi |
|----------|-------------|
| Container | `max-width: 480px`, `border-radius: var(--border-radius-xl)`, `border: 1px solid var(--border-light)`, `overflow: hidden` |
| Header | `background: var(--color-primary)`, `color: white`, `padding: 24px`, logo + nama coworking + alamat + telp |
| Divider | Dashed line `border-top: 2px dashed var(--border-default)` dengan circle cutouts di sisi kiri-kanan (boarding pass style) |
| QR Code | `160x160px`, centered atau kiri, generated via library `qrcode` |
| Ticket Number | `font: var(--font-mono)`, `weight: 600`, `color: var(--color-accent)` |
| Detail Labels | `font-size: var(--text-sm)`, `color: var(--text-secondary)`, `weight: 500` |
| Detail Values | `font-size: var(--text-base)`, `color: var(--text-primary)`, `weight: 600` |
| Nominal | `font: var(--font-mono)`, `weight: 700` |
| Total Bayar | Larger `--text-lg`, `weight: 800`, `color: var(--color-primary)` |
| Status Badge | Pill badge sesuai status (section 4.10) |
| Print Button | Secondary button `md`, icon printer |
| Print CSS | `@media print` — hide navbar, footer, sidebar. Full-width ticket, `page-break-inside: avoid` |

### 4.15 Skeleton Loader (Sonder Shimmer Style)

| Properti | Spesifikasi |
|----------|-------------|
| Base Color | `var(--bg-skeleton)` |
| Shine Color | `var(--bg-skeleton-shine)` |
| Animation | `@keyframes shimmer` — gradient slide left-to-right, `1.5s infinite` |
| Card Skeleton | Replicate card shape: image placeholder + 3 text lines + button |
| Table Skeleton | Replicate table rows: 5 column blocks |
| Border Radius | Sama dengan elemen yang di-skeleton-kan |

### 4.16 Sidebar Navigation (Admin — Sonder Dark Style)

| Properti | Spesifikasi |
|----------|-------------|
| Width | `var(--sidebar-width)` (260px), collapsible ke `var(--sidebar-collapsed)` (72px) |
| Background | `var(--bg-sidebar)` (deep navy) |
| Menu Item | `padding: 12px 20px`, `border-radius: var(--border-radius-md)`, `color: rgba(255,255,255,0.7)`, `font-size: var(--text-sm)`, `weight: 500` |
| Menu Hover | `background: rgba(255,255,255,0.08)`, `color: white` |
| Menu Active | `background: rgba(201,169,110,0.15)`, `color: var(--color-accent)`, left border `3px solid var(--color-accent)` |
| Menu Icon | `20px` SVG stroke icons, `margin-right: 12px` |
| Divider | `border-top: 1px solid rgba(255,255,255,0.08)`, `margin: 12px 0` |
| Collapse Toggle | Chevron icon, bottom of sidebar |
| Mobile | Overlay slide-in dari kiri, `z-index: var(--z-overlay)` |
| Sesuai PRD | 7 menu items: Dashboard, Profil, Member, Space, Diskon, Reservasi, QR Scanner |

### 4.17 Footer (Sonder Dark Multi-Column)

```
+-------------------------------------------------------------+
|  bg: var(--bg-footer) — Deep Navy                            |
|                                                              |
|  +----------+  +----------+  +----------+  +--------------+ |
|  | BRAND    |  | NAVIGASI |  | LAYANAN  |  | KONTAK       | |
|  |          |  |          |  |          |  |              | |
|  | Logo     |  | Katalog  |  | Personal |  | Alamat       | |
|  | Tagline  |  | Booking  |  | Desk     |  | Telepon/WA   | |
|  |          |  | Histori  |  | Meeting  |  | Email        | |
|  | Sosmed   |  | FAQ      |  | Office   |  |              | |
|  +----------+  +----------+  +----------+  +--------------+ |
|                                                              |
|  ----------------------------------------------------------- |
|  (c) 2026 Smart Space Booking. All rights reserved.          |
|  Terms - Privacy                                             |
+-------------------------------------------------------------+
```

| Properti | Spesifikasi |
|----------|-------------|
| Background | `var(--bg-footer)` |
| Padding | `var(--space-16) 0 var(--space-8)` |
| Grid | `4 kolom` desktop, `2 kolom` tablet, `1 kolom` mobile |
| Heading | `font-size: var(--text-sm)`, `weight: 600`, `color: white`, `text-transform: uppercase`, `letter-spacing: var(--tracking-wider)`, `margin-bottom: 16px` |
| Links | `font-size: var(--text-sm)`, `color: rgba(255,255,255,0.6)`, hover: `color: white`, `line-height: 2.2` |
| Bottom Bar | `border-top: 1px solid rgba(255,255,255,0.1)`, `padding-top: 24px`, `margin-top: 48px` |
| Copyright | `font-size: var(--text-xs)`, `color: rgba(255,255,255,0.4)` |

---

## 5. Halaman-Halaman & Mapping ke PRD

### 5.1 Halaman Member (7 Layar — PRD Section 7.1)

| # | Halaman | Route | PRD Ref | Komponen Utama |
|---|---------|-------|---------|----------------|
| 1 | Register Member | `/register` | [MEM-01], Layar 1 | Header branding, form 7 field (nama, instansi, telp, alamat, username, password, foto), tombol "Daftar Akun", link ke login |
| 2 | Login Member | `/login` | [MEM-02], Layar 2 | Input username + password, toggle show password, tombol "Login" gradient, link ke register |
| 3 | Katalog Space (Homepage) | `/` atau `/katalog` | [MEM-03], Layar 3 | Hero section (Sonder split), search bar, pill filter tipe, card grid 4-kolom, cek ketersediaan modal |
| 4 | Form Reservasi | `/booking/:spaceId` | [MEM-04], Layar 4 | Header detail space (foto + nama + harga), date picker, time picker, durasi selector, input kode promo + tombol "Terapkan", breakdown tagihan, tombol "Lanjutkan Pemesanan" |
| 5 | Status Pemesanan | `/my-bookings` | [MEM-05], Layar 5 | Tab filter status (6 tabs), card list booking (kode, space, jadwal, total, badge status), tombol "Lihat Tiket" & "Batalkan" |
| 6 | Histori Pemesanan | `/history` | [MEM-06], Layar 6 | Filter dropdown bulan + tahun, 2 metric cards (Total Reservasi, Total Pengeluaran IDR), daftar riwayat transaksi |
| 7 | E-Ticket Digital | `/e-ticket/:reservasiId` | [MEM-07], Layar 7 | Kartu tiket boarding-pass style, QR Code besar, rincian lengkap, tombol "Cetak/Download PDF" |

### 5.2 Halaman Admin (9 Layar — PRD Section 7.2)

| # | Halaman | Route | PRD Ref | Komponen Utama |
|---|---------|-------|---------|----------------|
| 1 | Register Admin | `/admin/register` | [ADM-01], Layar 1 | Form: username, password, nama coworking, nama pemilik, telp |
| 2 | Login Admin | `/admin/login` | [ADM-02], Layar 2 | UI dark-accented login, input username + password |
| 3 | Profil Coworking | `/admin/profil` | [ADM-03], Layar 3 | Form edit: nama coworking, nama pemilik, telp, alamat, deskripsi fasilitas |
| 4 | Data Member | `/admin/members` | [ADM-04], Layar 4 | Search bar, data table member, tombol tambah/edit/hapus, modal konfirmasi hapus |
| 5 | Data Diskon | `/admin/diskon` | [ADM-06], Layar 5 | Tabel kupon (nama, %, tanggal mulai-akhir, status aktif/expired), CRUD actions |
| 6 | Data Space | `/admin/spaces` | [ADM-05], Layar 6 | Grid katalog + tabel switch view, tombol tambah space (form: nama, tipe, kapasitas, harga/jam, deskripsi, upload foto), edit, hapus |
| 7 | Detail Reservasi | `/admin/reservasi/:id` | [ADM-07], Layar 7 | Modal/halaman: data tamu, jadwal, biaya, status. Tombol: "Setujui", "Batalkan", "Check-In", "Check-Out" |
| 8 | Semua Reservasi | `/admin/reservasi` | [ADM-08], Layar 8 | Tabel master reservasi, filter kombinasi (status, bulan, tahun, space, tanggal), QR scanner button |
| 9 | Rekap Pendapatan | `/admin/reports` | [ADM-09], Layar 9 | Filter bulan+tahun, 5 metric cards, Line Chart tren harian, Doughnut/Bar chart per tipe, tabel rincian |

---

## 6. Animasi & Mikro-Interaksi

### 6.1 Scroll Animations

| Elemen | Animasi | Trigger | Duration |
|--------|---------|---------|----------|
| Section masuk viewport | `fadeInUp`: opacity 0->1 + translateY(24px->0) | IntersectionObserver (threshold 0.1) | `600ms ease-out` |
| Card masuk viewport | Staggered `fadeInUp`: delay `index * 100ms` | IntersectionObserver | `500ms ease-out` |
| Metric cards | `countUp` animation untuk angka | Section visible | `1200ms` |
| Chart | Draw-in dari kiri | Section visible | `1200ms` |

### 6.2 Hover & Interactive Animations

| Elemen | Animasi |
|--------|---------|
| Space Card | `translateY(-4px)` + shadow elevate + image scale(1.05) |
| Button | `translateY(-1px)` + shadow slight increase |
| Nav link | Underline slide-in dari kiri `width: 0->100%` |
| Table row | `background: var(--bg-secondary)` fade in |
| Badge | Subtle `pulse` animation untuk status aktif |
| Toast | Slide-in dari kanan + bounce (spring easing) |
| Modal | Scale(0.95->1) + fadeIn |
| Dropdown | `max-height: 0->auto` + `opacity: 0->1` |
| Search popup | Overlay fadeIn + card scale-in |
| Sidebar menu | Collapse: `width: 260->72px` + icon-only mode |
| Image slider | `translateX` slide + crossfade |

### 6.3 Loading States

| State | Visual |
|-------|--------|
| Page loading | Full-page skeleton (Sonder shimmer) |
| Data fetching | Skeleton placeholders matching content layout |
| Button loading | Spinner `16px` circular, text hidden |
| Image loading | Blur-up placeholder -> sharp image |
| Infinite scroll | Bottom spinner + "Memuat..." text |

### 6.4 Keyframe Definitions

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.6; }
}

@keyframes countUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

---

## 7. Responsive Breakpoints & Adaptive Design

### 7.1 Breakpoint System

```css
/* Mobile First Approach */
--bp-sm:   640px;    /* Small phone -> large phone */
--bp-md:   768px;    /* Phone -> Tablet portrait */
--bp-lg:   1024px;   /* Tablet -> Laptop */
--bp-xl:   1280px;   /* Laptop -> Desktop */
--bp-2xl:  1536px;   /* Desktop -> Large monitor */
```

### 7.2 Responsive Behavior Matrix

| Komponen | Mobile (<768px) | Tablet (768-1024px) | Desktop (>1024px) |
|----------|----------------|--------------------|--------------------|
| **Hero** | Stack vertikal, image atas, content bawah, full-width | Split 40/60 | Split 45/55 |
| **Nav** | Hamburger -> slide-in panel | Hamburger -> slide-in panel | Full horizontal nav + mega dropdown |
| **Space Cards** | 1 kolom (horizontal scroll slider) | 2 kolom grid | 4 kolom grid |
| **Search Bar** | Full-width below hero | Inline di hero | Inline di hero |
| **Pill Filters** | Horizontal scroll | Horizontal scroll | Inline wrap |
| **Admin Sidebar** | Hidden -> overlay slide-in | Collapsed (72px) | Full (260px) |
| **Data Table** | Card view (stacked) | Horizontal scroll | Full table |
| **Metric Cards** | 2 per row, scroll | 3 per row | 5 per row |
| **E-Ticket** | Full-width | Centered 480px | Centered 480px |
| **Footer** | 1 kolom stacked | 2 kolom | 4 kolom |
| **Modal** | Full-screen bottom sheet | Centered 90% width | Centered max-width |
| **Charts** | Full-width, simplified | Full-width | Side-by-side (line + donut) |

---

## 8. Accessibility & SEO

### 8.1 Accessibility (WCAG 2.1 AA)
- Semua teks memenuhi contrast ratio minimum 4.5:1 (teks normal) dan 3:1 (teks besar)
- Focus visible pada semua interactive elements: `outline: 2px solid var(--border-focus)`, `outline-offset: 2px`
- `aria-label` pada semua icon buttons dan interactive elements
- `role="menu"` pada dropdown menus, `role="dialog"` pada modals
- Keyboard navigable: Tab order logis, Escape untuk close modal/dropdown
- Skip-to-content link tersembunyi
- `alt` text pada semua gambar

### 8.2 SEO Requirements
- Setiap halaman: unique `<title>` tag deskriptif
- `<meta name="description">` per halaman
- Satu `<h1>` per halaman, heading hierarchy (h1 -> h2 -> h3)
- Semantic HTML5: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Semua interactive elements: unique `id` deskriptif
- Lazy loading untuk gambar di bawah fold
- Structured data (JSON-LD) untuk organisasi

---

## 9. Icon System

### 9.1 Icon Library
Menggunakan **Lucide Icons** (open-source, konsisten dengan style Sonder yang menggunakan SVG stroke icons).

| Konteks | Icon | Size | Stroke |
|---------|------|------|--------|
| Navigation | Home, Calendar, Clock, User, Settings, BarChart | `20px` | `1.8px` |
| Space Card | MapPin, Users, Wifi, Plug, Monitor, Coffee | `16px` | `1.5px` |
| Actions | Plus, Edit, Trash, Eye, Download, Printer, QrCode | `18px` | `1.8px` |
| Status | CheckCircle, Clock, AlertCircle, XCircle, Activity | `16px` | `1.5px` |
| Decorative | Sparkles, ArrowRight, ChevronDown, Search, X | varies | `2px` |

### 9.2 Icon Usage Rules
- Selalu gunakan SVG inline (bukan font icons)
- `stroke="currentColor"` untuk inherit warna dari parent
- `aria-hidden="true"` jika icon dekoratif (ada text label)
- `aria-label` jika icon standalone (no text)

---

## 10. QR Code Scanner UI (PRD [ADM-07])

### 10.1 Scanner Interface

```
+-----------------------------------------+
|  Scan QR Code E-Ticket                  |
|                                         |
|  +-----------------------------------+  |
|  |  +- - - - - - - - - - - - - -+    |  |
|  |  |                            |    |  |
|  |  |    CAMERA VIEWFINDER       |    |  |
|  |  |    (html5-qrcode)          |    |  |
|  |  |                            |    |  |
|  |  |    +------------------+    |    |  |
|  |  |    |  scanning...     |    |    |  |
|  |  |    +------------------+    |    |  |
|  |  |                            |    |  |
|  |  +- - - - - - - - - - - - - -+    |  |
|  +-----------------------------------+  |
|                                         |
|  Atau masukkan kode booking manual:     |
|  +---------------------+ +----------+  |
|  | BOOK-YYYYMMDD-XXXX  | | Verifikasi|  |
|  +---------------------+ +----------+  |
|                                         |
|  -- Hasil Scan ----------------------- |
|  +-------------------------------------+|
|  | Reservasi Ditemukan                  ||
|  | Kode: BOOK-20260830-0012            ||
|  | Tamu: Ahmad Rizky                    ||
|  | Space: Meeting Room A                ||
|  | Status: Disetujui                    ||
|  |                                      ||
|  | +-------------------+               ||
|  | | Check-In          |               ||
|  | +-------------------+               ||
|  +-------------------------------------+|
+-----------------------------------------+
```

| Properti | Spesifikasi |
|----------|-------------|
| Viewfinder | `aspect-ratio: 1`, `max-width: 400px`, `border-radius: var(--border-radius-lg)`, corner markers (Sonder style scan frame) |
| Scanning Indicator | Animated line scan horizontal, `2px solid var(--color-accent)`, `translateY` loop |
| Result Card | Slide-in dari bawah, `border-radius: var(--border-radius-xl)`, success: `border-left: 4px solid var(--status-approved)` |
| Manual Input | `font: var(--font-mono)`, placeholder: "BOOK-YYYYMMDD-XXXX" |
| Check-In Button | Full-width, Primary `lg`, icon check, hanya muncul setelah scan sukses |

---

## 11. Print Stylesheet (PRD Section 8.4)

```css
@media print {
  /* Hide non-printable elements */
  header, nav, footer, .sidebar, 
  .toast, .modal-overlay, .btn-print,
  .search-bar, .filter-pills { 
    display: none !important; 
  }
  
  /* E-Ticket print optimization */
  .e-ticket {
    width: 100% !important;
    max-width: 480px !important;
    margin: 0 auto !important;
    box-shadow: none !important;
    border: 1px solid #ddd !important;
    page-break-inside: avoid !important;
  }
  
  /* Reset backgrounds for print */
  body {
    background: white !important;
    color: black !important;
  }
  
  /* Ensure QR Code prints clearly */
  .qr-code {
    filter: none !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  /* Table print formatting */
  table {
    page-break-inside: auto !important;
  }
  tr {
    page-break-inside: avoid !important;
  }
}
```

---

## 12. File Structure Frontend

```
frontend/
|-- public/
|   |-- favicon.ico
|   |-- logo.svg
|   +-- images/
|       +-- hero/                    # Hero slider images
|
|-- src/
|   |-- assets/
|   |   |-- fonts/                   # Self-hosted fonts (fallback)
|   |   |-- icons/                   # SVG icon sprites
|   |   +-- images/                  # Static images
|   |
|   |-- styles/
|   |   |-- index.css                # Root: imports + CSS reset
|   |   |-- variables.css            # Design tokens (Section 2.1, 2.2)
|   |   |-- typography.css           # Font imports + type scale
|   |   |-- components/
|   |   |   |-- header.css           # Header/Navbar (Section 4.1)
|   |   |   |-- hero.css             # Hero section (Section 4.2)
|   |   |   |-- card.css             # Space card (Section 4.3)
|   |   |   |-- tabs.css             # Tab/pill filters (Section 4.4)
|   |   |   |-- search.css           # Search bar (Section 4.5)
|   |   |   |-- buttons.css          # Button system (Section 4.6)
|   |   |   |-- forms.css            # Form components (Section 4.7)
|   |   |   |-- modal.css            # Modal/dialog (Section 4.8)
|   |   |   |-- toast.css            # Toast notifications (Section 4.9)
|   |   |   |-- badge.css            # Status badges (Section 4.10)
|   |   |   |-- table.css            # Data tables (Section 4.11)
|   |   |   |-- metric-card.css      # Metric cards (Section 4.12)
|   |   |   |-- chart.css            # Chart containers (Section 4.13)
|   |   |   |-- e-ticket.css         # E-Ticket card (Section 4.14)
|   |   |   |-- skeleton.css         # Skeleton loaders (Section 4.15)
|   |   |   |-- sidebar.css          # Admin sidebar (Section 4.16)
|   |   |   |-- footer.css           # Footer (Section 4.17)
|   |   |   +-- qr-scanner.css       # QR scanner UI (Section 10)
|   |   |-- layouts/
|   |   |   |-- member-layout.css    # Member page layout
|   |   |   +-- admin-layout.css     # Admin dashboard layout
|   |   |-- pages/
|   |   |   |-- auth.css             # Login & register pages
|   |   |   |-- katalog.css          # Katalog/homepage
|   |   |   |-- booking.css          # Booking form page
|   |   |   |-- my-bookings.css      # Status pemesanan
|   |   |   |-- history.css          # Histori pemesanan
|   |   |   |-- e-ticket-page.css    # E-ticket page
|   |   |   +-- admin/
|   |   |       |-- dashboard.css    # Admin dashboard/reports
|   |   |       |-- members.css      # CRUD member page
|   |   |       |-- spaces.css       # CRUD space page
|   |   |       |-- diskon.css       # CRUD diskon page
|   |   |       +-- reservasi.css    # Reservasi monitoring
|   |   |-- utilities.css            # Utility classes
|   |   |-- animations.css           # Keyframes & animation classes
|   |   +-- print.css                # Print stylesheet (Section 11)
|   |
|   |-- components/                  # Reusable JS components
|   |   |-- Header.js
|   |   |-- Hero.js
|   |   |-- SpaceCard.js
|   |   |-- TabFilter.js
|   |   |-- SearchBar.js
|   |   |-- Modal.js
|   |   |-- Toast.js
|   |   |-- Badge.js
|   |   |-- DataTable.js
|   |   |-- MetricCard.js
|   |   |-- ETicket.js
|   |   |-- QRScanner.js
|   |   |-- DatePicker.js
|   |   |-- TimePicker.js
|   |   |-- FileUpload.js
|   |   |-- Skeleton.js
|   |   |-- Sidebar.js
|   |   +-- Footer.js
|   |
|   |-- pages/
|   |   |-- member/
|   |   |   |-- RegisterPage.js      # [MEM-01] Layar 1
|   |   |   |-- LoginPage.js         # [MEM-02] Layar 2
|   |   |   |-- KatalogPage.js       # [MEM-03] Layar 3
|   |   |   |-- BookingPage.js       # [MEM-04] Layar 4
|   |   |   |-- MyBookingsPage.js    # [MEM-05] Layar 5
|   |   |   |-- HistoryPage.js       # [MEM-06] Layar 6
|   |   |   +-- ETicketPage.js       # [MEM-07] Layar 7
|   |   |
|   |   +-- admin/
|   |       |-- RegisterPage.js      # [ADM-01] Layar 1
|   |       |-- LoginPage.js         # [ADM-02] Layar 2
|   |       |-- ProfilePage.js       # [ADM-03] Layar 3
|   |       |-- MembersPage.js       # [ADM-04] Layar 4
|   |       |-- DiskonPage.js        # [ADM-06] Layar 5
|   |       |-- SpacesPage.js        # [ADM-05] Layar 6
|   |       |-- ReservasiDetailPage.js # [ADM-07] Layar 7
|   |       |-- ReservasiPage.js     # [ADM-08] Layar 8
|   |       +-- ReportsPage.js       # [ADM-09] Layar 9
|   |
|   |-- services/                    # API service layer
|   |   |-- api.js                   # Base API config (Axios/Fetch)
|   |   |-- auth.service.js          # Auth endpoints
|   |   |-- space.service.js         # Space CRUD endpoints
|   |   |-- reservasi.service.js     # Reservasi endpoints
|   |   |-- member.service.js        # Member endpoints
|   |   |-- diskon.service.js        # Diskon endpoints
|   |   |-- upload.service.js        # File upload endpoints
|   |   +-- report.service.js        # Report endpoints
|   |
|   |-- utils/
|   |   |-- formatCurrency.js        # Format IDR currency
|   |   |-- formatDate.js            # Format tanggal Indonesia
|   |   |-- validators.js            # Form validation rules
|   |   +-- qrPayload.js            # QR code payload generator
|   |
|   |-- router/
|   |   +-- index.js                 # Route definitions
|   |
|   +-- App.js                       # Root component
|
|-- design.md                        # <- File ini
+-- package.json
```

---

## 13. PRD Compliance Checklist

### 13.1 Feature Completeness Matrix

| PRD Feature | Ref | Design Coverage | Section |
|-------------|-----|-----------------|---------|
| Register Member (7 field + foto) | [MEM-01] | COVERED - Form components, file upload, halaman mapping | 4.7, 5.1 |
| Login Member (username + password + toggle) | [MEM-02] | COVERED - Form + toggle password, halaman mapping | 4.7, 5.1 |
| Katalog Space (filter, search, card, cek ketersediaan) | [MEM-03] | COVERED - Hero, card, tabs, search, modal | 4.2-4.5, 4.8 |
| Reservasi (datepicker, timepicker, promo, breakdown) | [MEM-04] | COVERED - Form (date/time/promo), buttons, modal | 4.6-4.8 |
| Status Pemesanan (tabs, card, badge, aksi) | [MEM-05] | COVERED - Tabs, badges, buttons, card layout | 4.4, 4.6, 4.10 |
| Histori (filter bulan/tahun, metric cards) | [MEM-06] | COVERED - Form dropdown, metric card | 4.7, 4.12 |
| E-Ticket (QR, detail, print) | [MEM-07] | COVERED - E-ticket, print stylesheet | 4.14, 11 |
| Register Admin | [ADM-01] | COVERED - Form, halaman mapping | 4.7, 5.2 |
| Login Admin | [ADM-02] | COVERED - Dark-accented UI, halaman mapping | 5.2 |
| Profil Coworking | [ADM-03] | COVERED - Form edit, halaman mapping | 4.7, 5.2 |
| CRUD Member | [ADM-04] | COVERED - Table, modal, form, search | 4.5, 4.7, 4.8, 4.11 |
| CRUD Space | [ADM-05] | COVERED - Card + table, form, upload | 4.3, 4.7, 4.11 |
| CRUD Diskon | [ADM-06] | COVERED - Table, form, badges | 4.7, 4.10, 4.11 |
| Check-In/Out & QR Scanner | [ADM-07] | COVERED - QR scanner, buttons, modal | 4.6, 4.8, 10 |
| Monitoring Reservasi (filter lengkap) | [ADM-08] | COVERED - Table, form (4 filter), badges | 4.7, 4.10, 4.11 |
| Rekap Pendapatan (5 metric + 2 chart + tabel) | [ADM-09] | COVERED - Metric, chart, table | 4.11-4.13 |

### 13.2 Non-Functional Requirements Coverage

| NFR | PRD Ref | Design Coverage |
|-----|---------|-----------------|
| Glassmorphism + Modern Clean | Section 7.3 | COVERED - Warm Sonder aesthetic, glassmorphism hero overlay, soft shadows |
| Plus Jakarta Sans + JetBrains Mono | Section 7.3 | COVERED - Font system (+ Prata serif untuk Sonder-style headings) |
| Mikro-animasi (hover, skeleton, modal, toast) | Section 7.3 | COVERED - Animation system |
| Responsivitas adaptive-first | Section 7.3 | COVERED - Responsive breakpoints |
| Badge status berwarna (5 status) | Section 4.3, 7.1 | COVERED - Badge system |
| Print CSS E-Ticket | Section 8.4 | COVERED - Print stylesheet |
| File upload validasi (MIME, 2MB) | Section 8.3 | COVERED - File upload component |
| Format 24 jam (HH:mm) | Section 8.3 | COVERED - Time picker |
| Toast notification | Section 5.1 [MEM-01] | COVERED - Toast system |
| Konfirmasi modal | Section 5.1 [MEM-04] | COVERED - Modal system |
| QR Code (qrcode lib) | Section 2.2 | COVERED - E-Ticket QR, Scanner |
| Chart (Chart.js/ApexCharts) | Section 2.2 | COVERED - Chart specs |

### 13.3 API Endpoint Integration Map

| Service File | PRD Endpoints Covered |
|-------------|----------------------|
| `auth.service.js` | POST register member/admin, POST login, GET profile |
| `space.service.js` | GET spaces, GET space/:id, GET types, GET availability, POST/PUT/DELETE admin spaces |
| `reservasi.service.js` | POST reservasi, GET my, GET history, GET /:id, GET e-ticket, PATCH cancel, Admin: GET all, PATCH status, POST check-in/out |
| `member.service.js` | Admin: GET/POST/PUT/DELETE members |
| `diskon.service.js` | GET active, POST check, Admin: GET/POST/PUT/DELETE diskon |
| `upload.service.js` | POST upload members/spaces |
| `report.service.js` | GET monthly, GET income |

---

## 14. Sonder Design Elements Adaptation Summary

| Elemen Sonder.com | Adaptasi Smart Space Booking |
|-------------------|------------------------------|
| Split hero (content kiri + slider kanan) | Hero section dengan pill filter tipe space + search bar kiri, image slider ruangan kanan |
| Top announcement bar (dismissible) | Announcement bar untuk promo aktif / diskon event |
| Mega dropdown navigation | Mega dropdown untuk kategori space (desk/meeting/office) dengan featured image |
| Partner logos marquee | Fasilitas icons marquee (WiFi, AC, Coffee, Parking, dll) |
| Tab component (city tabs) | Tab filter tipe space (Semua / Desk / Meeting / Office) |
| Property card v3 (image slider + details) | Space card dengan image, badge tipe, kapasitas, harga/jam, availability |
| Prata serif headings | Prata font untuk H1, H2 — editorial elegance |
| Inter/Mulish body text | Plus Jakarta Sans (PRD requirement, same category) |
| Warm color palette (cream, charcoal) | Warm neutrals + deep navy + gold accent |
| Pill-shaped buttons & badges | Pill border-radius throughout |
| Soft rounded corners (soft2 data attr) | `border-radius: 10-14px` cards, `20px` modals |
| Search popup overlay | Fullscreen search popup dengan autocomplete |
| SVG stroke icons (Lucide-like) | Lucide Icons library |
| Smooth micro-animations | fadeInUp, shimmer, spring transitions |
| Dark footer | Deep navy footer multi-column |
| Mobile slide-in panel | Hamburger -> slide-in navigation panel |
| Image hover scale effect | `scale(1.05)` on card image hover |
| Cozy density spacing | 8px base grid, generous whitespace |

---

*Dokumen ini merupakan panduan desain teknis lengkap untuk pengembangan frontend Smart Space Booking, terinspirasi oleh desain premium sonder.com dan sepenuhnya selaras dengan seluruh requirement di [prd.md](../prd.md).*
