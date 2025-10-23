# Design Guidelines: Alumni & Activities Showcase Platform

## Design Approach: Reference-Based (Social + Portfolio Hybrid)

**Primary Inspiration:** Instagram (photo galleries) + LinkedIn (professional directory) + Modern portfolio sites (cohort showcases)

**Design Philosophy:** Create a warm, nostalgic digital yearbook that celebrates community while maintaining modern web aesthetics. The design should evoke pride, connection, and memories through thoughtful use of imagery and typography.

---

## Color Palette

**Primary Colors:**
- Deep Navy: 220 45% 20% (trust, professionalism, academic heritage)
- Warm Coral: 12 85% 65% (energy, community, warmth)

**Supporting Colors:**
- Soft Cream: 45 30% 96% (backgrounds, cards)
- Cool Gray: 220 10% 50% (secondary text, borders)
- Success Green: 150 60% 45% (status indicators)

**Dark Mode:**
- Background: 220 20% 10%
- Cards: 220 15% 15%
- Text: 0 0% 95%

---

## Typography

**Font Stack:**
- **Primary (Headings):** 'Playfair Display' - serif, elegant, academic
- **Secondary (Body):** 'Inter' - clean, highly readable
- **Accent (Stats/Numbers):** 'Space Grono' - modern monospace

**Type Scale:**
- Hero Titles: text-5xl md:text-7xl font-bold
- Section Headers: text-3xl md:text-4xl font-semibold
- Card Titles: text-xl font-medium
- Body: text-base leading-relaxed
- Captions: text-sm text-gray-500

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Consistent section padding: py-16 md:py-24
- Card spacing: p-6 md:p-8
- Grid gaps: gap-4 md:gap-6 lg:gap-8

**Container Strategy:**
- Full-width sections with inner max-w-7xl
- Content grids: max-w-6xl
- Reading content: max-w-4xl

---

## Component Library

### Navigation
- Sticky header with glassmorphism effect (backdrop-blur-lg)
- Logo + main nav links + search icon + profile dropdown
- Mobile: Hamburger menu with slide-in drawer

### Hero Section
- Full-screen hero (min-h-screen) with large group photo background
- Overlay gradient (from-navy/80 to-navy/40)
- Centered title: "สาขา [Branch Name]: ภาพรวมทุกรุ่น"
- Subtitle with stats: "XX รุ่น • XXX+ สมาชิก • XXX+ ความทรงจำ"
- Dual CTA buttons: "สำรวจสมาชิก" + "ดูแกลเลอรี"

### Cohort Grid (Homepage)
- Masonry-style grid of cohort cards
- Each card: 
  - Representative group photo
  - Cohort year badge (top-right overlay)
  - Member count
  - Hover: Lift effect + overlay with "ดูรายละเอียด" button

### Member Directory Cards
- Grid layout: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Card design:
  - Square aspect-ratio profile photo
  - Name (Thai + English)
  - Cohort badge
  - Department/Major tag
  - Quick contact icon
- Hover: Smooth scale + shadow increase

### Photo Gallery
- Pinterest-style masonry layout using columns-2 md:columns-3 lg:columns-4
- Lightbox modal on click
- Filter tabs: ทั้งหมด | กิจกรรม | พิธีการ | สังสรรค์ | อื่นๆ
- Each photo: Metadata overlay on hover (date, event, cohort)

### Timeline Component
- Vertical timeline with alternating left/right cards
- Year markers as large milestone circles
- Cards contain: event photo, description, date, cohort involved
- Connecting line with gradient

### Search & Filter Bar
- Sticky top section (below nav)
- Search input with icon
- Filter dropdowns: รุ่น | สาขา | ตำแหน่ง
- Sort options: ชื่อ | รุ่น | ล่าสุด

### Dashboard (Admin)
- Sidebar navigation: สมาชิก | ภาพกิจกรรม | รุ่น | Timeline
- Stats cards: Total members, photos, cohorts, recent activity
- Data tables with inline edit/delete
- Upload zone: Drag-drop area with preview thumbnails

### Member Profile Page
- Hero header with cover photo
- Large profile photo (rounded-full, border-4)
- Bio section in 2-column layout (Info | About)
- Photo grid of contributed images
- Related members from same cohort

### Forms
- Upload form with drag-drop zone
- Preview grid showing selected images before upload
- Form fields: Name, Cohort, Department, Bio, Contact
- Image: Multer progress indicator during upload

---

## Images Strategy

**Hero Section:** 
Large, inspiring group photo of all cohorts together or campus landmark (full-width, ~70vh height)

**Cohort Cards:**
Representative group photos for each cohort/year

**Member Directory:**
Individual portrait photos (square crop, 1:1 ratio)

**Gallery:**
Activity photos in various aspect ratios (natural dimensions)

**Timeline:**
Event photos embedded in timeline cards

**Backgrounds:**
Subtle texture or pattern on section backgrounds (opacity-5)

---

## Interaction & Animation

**Minimal, Purposeful Animations:**
- Card hover: translate-y-1 + shadow-lg (duration-200)
- Image loading: Skeleton shimmer effect
- Modal/Lightbox: Fade + scale entrance
- Page transitions: Smooth scroll behavior
- Filter changes: Fade content swap

**NO:** Distracting parallax, excessive motion, autoplay carousels

---

## Accessibility

- All interactive elements: min 44x44px touch targets
- Form labels always visible (no placeholder-only)
- Focus states: ring-2 ring-coral
- Alt text for all images
- Keyboard navigation throughout
- Dark mode with proper contrast ratios

---

## Responsive Strategy

**Mobile (base):**
- Single column layouts
- Stack navigation items
- Simplified filters (collapsible)
- Larger touch targets

**Tablet (md:):**
- 2-column grids
- Horizontal navigation
- Side-by-side content

**Desktop (lg:):**
- 3-4 column grids
- Full feature set visible
- Sidebar layouts for dashboard

---

**Final Note:** This design celebrates community through rich imagery while maintaining excellent usability. The warm color palette and elegant typography create an inviting atmosphere that honors the organization's heritage while feeling thoroughly modern.