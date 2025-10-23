# Alumni & Activities Showcase Platform

## Project Overview
เว็บแอปพลิเคชันสำหรับแสดงภาพรวมรุ่นทั้งหมดของสาขา โดยมีระบบคลังรายชื่อสมาชิก แกลเลอรีภาพกิจกรรม และไทม์ไลน์เหตุการณ์สำคัญ

## Technology Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Storage**: In-memory storage (MemStorage)
- **Styling**: Tailwind CSS + Shadcn UI
- **State Management**: TanStack Query (React Query v5)
- **Routing**: Wouter
- **Forms**: React Hook Form + Zod validation
- **File Upload**: Multer (for future image uploads)

## Features
### MVP Features (Completed in Phase 1)
1. **หน้าแรก (Home)**: Hero section พร้อมภาพกลุ่ม, สถิติภาพรวม, รายการรุ่นทั้งหมด, กิจกรรมล่าสุด
2. **คลังสมาชิก (Members Directory)**: แสดงรายชื่อสมาชิกทุกรุ่น พร้อมระบบค้นหาและกรองข้อมูล
3. **โปรไฟล์สมาชิก (Member Profile)**: หน้ารายละเอียดของแต่ละคน พร้อมข้อมูลและสมาชิกรุ่นเดียวกัน
4. **แกลเลอรี (Gallery)**: แสดงภาพกิจกรรมทั้งหมดในรูปแบบ Masonry layout พร้อมระบบกรองและ Lightbox
5. **ไทม์ไลน์ (Timeline)**: แสดงกิจกรรมและเหตุการณ์สำคัญเรียงตามเวลา
6. **จัดการข้อมูล (Dashboard)**: หน้าสำหรับ CRUD operations ของสมาชิก, กิจกรรม, และแกลเลอรี
7. **Dark Mode**: รองรับการสลับธีมสว่าง/มืด
8. **Responsive Design**: ใช้งานได้ทั้งมือถือและคอมพิวเตอร์

## Data Models

### Members (สมาชิก)
```typescript
{
  id: string (UUID)
  name: string (required)
  nameEn?: string
  cohort: string (required) // รุ่นที่เข้า
  department: string (required) // สาขา
  bio?: string
  profileImage?: string
  position?: string // ตำแหน่ง
  contactInfo?: string
  year: number (required) // ปี (ค.ศ.)
}
```

### Activities (กิจกรรม)
```typescript
{
  id: string (UUID)
  title: string (required)
  description?: string
  eventDate: string (required)
  cohort?: string
  category: string (required) // "กิจกรรม", "พิธีการ", "สังสรรค์", "อื่นๆ"
  imageUrl?: string
}
```

### Galleries (แกลเลอรีภาพ)
```typescript
{
  id: string (UUID)
  imageUrl: string (required)
  title?: string
  description?: string
  eventDate?: string
  cohort?: string
  category?: string
  activityId?: string
}
```

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── ui/ (Shadcn components)
│   │   ├── app-sidebar.tsx
│   │   ├── theme-provider.tsx
│   │   ├── member-form.tsx
│   │   ├── activity-form.tsx
│   │   └── gallery-form.tsx
│   ├── pages/
│   │   ├── home.tsx
│   │   ├── members.tsx
│   │   ├── member-profile.tsx
│   │   ├── gallery.tsx
│   │   ├── timeline.tsx
│   │   ├── dashboard.tsx
│   │   └── not-found.tsx
│   ├── lib/
│   │   └── queryClient.ts
│   ├── App.tsx
│   └── index.css
shared/
└── schema.ts (Data models and validation schemas)
server/
├── routes.ts (API endpoints)
├── storage.ts (In-memory storage)
└── index.ts
```

## Design Guidelines
- **Color Palette**: Deep Navy (Primary), Warm Coral (Accent)
- **Typography**: Playfair Display (serif), Inter (sans), Space Mono (mono)
- **Components**: Using Shadcn UI components exclusively
- **Spacing**: Consistent spacing with Tailwind utilities
- **Interactions**: Subtle hover/active states using custom elevation utilities

## API Endpoints (To be implemented in Phase 2)
```
GET    /api/members          - Get all members
GET    /api/members/:id      - Get member by ID
POST   /api/members          - Create new member
PATCH  /api/members/:id      - Update member
DELETE /api/members/:id      - Delete member

GET    /api/activities       - Get all activities
POST   /api/activities       - Create new activity
PATCH  /api/activities/:id   - Update activity
DELETE /api/activities/:id   - Delete activity

GET    /api/galleries        - Get all gallery photos
POST   /api/galleries        - Create new gallery photo
PATCH  /api/galleries/:id    - Update gallery photo
DELETE /api/galleries/:id    - Delete gallery photo
```

## Development Status
- [x] Phase 1: Schema & Frontend Components (COMPLETED)
  - [x] Data models defined in shared/schema.ts
  - [x] Generated hero and placeholder images
  - [x] All pages and components created
  - [x] Routing configured with sidebar navigation
  - [x] Forms for CRUD operations
  - [x] Dark mode support
- [ ] Phase 2: Backend Implementation (IN PROGRESS)
- [ ] Phase 3: Integration & Testing

## Recent Changes
- 2025-10-23: Initial project setup with complete frontend implementation
  - Created all data schemas (Member, Activity, Gallery)
  - Generated 4 hero/placeholder images for the application
  - Built all 7 pages with beautiful UI following design guidelines
  - Implemented 3 forms with validation (Member, Activity, Gallery)
  - Added sidebar navigation and theme toggle
  - Configured routing for all pages

## User Preferences
- Language: Thai (ภาษาไทย)
- Focus: Rich features with beautiful UI/UX
- Technology preference: Modern React with TypeScript
