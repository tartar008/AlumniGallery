import { z } from "zod";

// 📸 Schema สำหรับ Gallery
export const insertGallerySchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().url(),
  category: z.string().optional(),
  cohort: z.string().optional(),
  eventDate: z.string().optional(),
});

// 👤 Schema สำหรับ Member
export const insertMemberSchema = z.object({
  name: z.string().min(1),
  nameEn: z.string().optional(),
  cohort: z.string().optional(),
  department: z.string().optional(),
  year: z.number().optional(),
  bio: z.string().optional(),
  position: z.string().optional(),
  contactInfo: z.string().optional(),
  profileImage: z.string().optional(),
});

// 🏃‍♂️ Schema สำหรับ Activity
export const insertActivitySchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.string().optional(),
  imageUrl: z.string().optional(),
});
