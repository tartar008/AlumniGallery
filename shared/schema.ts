import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Members table - สมาชิกแต่ละรุ่น
export const members = pgTable("members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),

  // ✅ เพิ่ม studentId
  studentId: varchar("student_id", { length: 20 }).notNull(), // เช่น "6510210014"

  name: text("name").notNull(),
  nameEn: text("name_en"),
  cohort: text("cohort").notNull(), // เช่น "ICT 18"
  department: text("department").notNull(),
  bio: text("bio"),
  profileImage: text("profile_image"),
  position: text("position"),
  contactInfo: text("contact_info"),
  year: integer("year").notNull(),
});


// Activities/Events - กิจกรรมและเหตุการณ์
export const activities = pgTable("activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  eventDate: text("event_date").notNull(), // วันที่จัดกิจกรรม
  cohort: text("cohort"), // รุ่นที่เกี่ยวข้อง (optional)
  category: text("category").notNull(), // "กิจกรรม", "พิธีการ", "สังสรรค์", "อื่นๆ"
  imageUrl: text("image_url"),
});

// Gallery Photos - รูปภาพในแกลเลอรี
export const galleries = pgTable("galleries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  imageUrl: text("image_url").notNull(),
  title: text("title"),
  description: text("description"),
  eventDate: text("event_date"),
  cohort: text("cohort"), // รุ่นที่เกี่ยวข้อง
  category: text("category"), // "กิจกรรม", "พิธีการ", "สังสรรค์", "อื่นๆ"
  activityId: varchar("activity_id"), // เชื่อมกับกิจกรรม (optional)
});

// Insert schemas
export const insertMemberSchema = createInsertSchema(members).omit({
  id: true,
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
});

export const insertGallerySchema = createInsertSchema(galleries).omit({
  id: true,
});

// Types
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type Member = typeof members.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;

export type InsertGallery = z.infer<typeof insertGallerySchema>;
export type Gallery = typeof galleries.$inferSelect;
