import {
  type Member,
  type InsertMember,
  type Activity,
  type InsertActivity,
  type Gallery,
  type InsertGallery,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Members
  getAllMembers(): Promise<Member[]>;
  getMember(id: string): Promise<Member | undefined>;
  createMember(member: InsertMember): Promise<Member>;
  updateMember(id: string, member: Partial<InsertMember>): Promise<Member | undefined>;
  deleteMember(id: string): Promise<boolean>;

  // Activities
  getAllActivities(): Promise<Activity[]>;
  getActivity(id: string): Promise<Activity | undefined>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  updateActivity(id: string, activity: Partial<InsertActivity>): Promise<Activity | undefined>;
  deleteActivity(id: string): Promise<boolean>;

  // Galleries
  getAllGalleries(): Promise<Gallery[]>;
  getGallery(id: string): Promise<Gallery | undefined>;
  createGallery(gallery: InsertGallery): Promise<Gallery>;
  updateGallery(id: string, gallery: Partial<InsertGallery>): Promise<Gallery | undefined>;
  deleteGallery(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private members: Map<string, Member>;
  private activities: Map<string, Activity>;
  private galleries: Map<string, Gallery>;

  constructor() {
    this.members = new Map();
    this.activities = new Map();
    this.galleries = new Map();
    
    // Add some sample data
    this.seedData();
  }

  private seedData() {
    // Sample members
    const sampleMembers: InsertMember[] = [
      {
        name: "สมชาย ใจดี",
        nameEn: "Somchai Jaidee",
        cohort: "รุ่น 65",
        department: "วิทยาศาสตร์คอมพิวเตอร์",
        year: 2022,
        bio: "นักพัฒนาซอฟต์แวร์ที่มีประสบการณ์",
        position: "นายก",
        contactInfo: "somchai@example.com",
      },
      {
        name: "สมหญิง สวยงาม",
        nameEn: "Somying Suayngam",
        cohort: "รุ่น 65",
        department: "วิศวกรรมซอฟต์แวร์",
        year: 2022,
        bio: "UX/UI Designer",
        position: "รองนายก",
        contactInfo: "somying@example.com",
      },
      {
        name: "ธนา รุ่งเรือง",
        nameEn: "Tana Rungruang",
        cohort: "รุ่น 64",
        department: "วิทยาศาสตร์ข้อมูล",
        year: 2021,
        bio: "Data Scientist",
      },
      {
        name: "มาลี ดอกไม้",
        nameEn: "Malee Dokmai",
        cohort: "รุ่น 64",
        department: "วิศวกรรมคอมพิวเตอร์",
        year: 2021,
      },
      {
        name: "วิชัย ก้าวหน้า",
        nameEn: "Wichai Kaona",
        cohort: "รุ่น 66",
        department: "วิทยาศาสตร์คอมพิวเตอร์",
        year: 2023,
        position: "หัวหน้าฝ่ายกิจกรรม",
      },
    ];

    sampleMembers.forEach((member) => {
      this.createMember(member);
    });

    // Sample activities
    const sampleActivities: InsertActivity[] = [
      {
        title: "งานปฐมนิเทศน์รุ่น 66",
        description: "ต้อนรับน้องใหม่เข้าสู่คณะ พร้อมแนะนำหลักสูตรและกิจกรรมต่างๆ",
        eventDate: "2023-08-15",
        cohort: "รุ่น 66",
        category: "พิธีการ",
        imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      },
      {
        title: "กิจกรรมทำบุญต้อนรับปีใหม่",
        description: "ร่วมกันทำบุญตักบาตรและกิจกรรมสร้างความสัมพันธ์",
        eventDate: "2024-01-01",
        category: "กิจกรรม",
        imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      },
      {
        title: "งานเลี้ยงสังสรรค์รุ่น 65",
        description: "พบปะสังสรรค์ระหว่างรุ่นพี่และรุ่นน้อง",
        eventDate: "2023-12-20",
        cohort: "รุ่น 65",
        category: "สังสรรค์",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
      },
    ];

    sampleActivities.forEach((activity) => {
      this.createActivity(activity);
    });

    // Sample galleries with imported images
    const sampleGalleries: InsertGallery[] = [
      {
        imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600",
        title: "การประชุมใหญ่ประจำปี",
        description: "การประชุมใหญ่ประจำปีของสมาชิกทุกรุ่น",
        eventDate: "2023-11-15",
        category: "พิธีการ",
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600",
        title: "กิจกรรมกีฬาสี",
        description: "แข่งขันกีฬาระหว่างรุ่น",
        eventDate: "2023-10-10",
        cohort: "รุ่น 65",
        category: "กิจกรรม",
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600",
        title: "Workshop เทคโนโลยี",
        description: "อบรมเชิงปฏิบัติการด้านเทคโนโลยีใหม่",
        eventDate: "2023-09-20",
        category: "กิจกรรม",
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
        title: "งานเลี้ยงปีใหม่",
        description: "ฉลองปีใหม่พร้อมกัน",
        eventDate: "2024-01-01",
        category: "สังสรรค์",
      },
    ];

    sampleGalleries.forEach((gallery) => {
      this.createGallery(gallery);
    });
  }

  // Members
  async getAllMembers(): Promise<Member[]> {
    return Array.from(this.members.values()).sort((a, b) => b.year - a.year);
  }

  async getMember(id: string): Promise<Member | undefined> {
    return this.members.get(id);
  }

  async createMember(insertMember: InsertMember): Promise<Member> {
    const id = randomUUID();
    const member: Member = { ...insertMember, id };
    this.members.set(id, member);
    return member;
  }

  async updateMember(id: string, updates: Partial<InsertMember>): Promise<Member | undefined> {
    const member = this.members.get(id);
    if (!member) return undefined;

    const updated: Member = { ...member, ...updates };
    this.members.set(id, updated);
    return updated;
  }

  async deleteMember(id: string): Promise<boolean> {
    return this.members.delete(id);
  }

  // Activities
  async getAllActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values()).sort(
      (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
    );
  }

  async getActivity(id: string): Promise<Activity | undefined> {
    return this.activities.get(id);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = randomUUID();
    const activity: Activity = { ...insertActivity, id };
    this.activities.set(id, activity);
    return activity;
  }

  async updateActivity(
    id: string,
    updates: Partial<InsertActivity>
  ): Promise<Activity | undefined> {
    const activity = this.activities.get(id);
    if (!activity) return undefined;

    const updated: Activity = { ...activity, ...updates };
    this.activities.set(id, updated);
    return updated;
  }

  async deleteActivity(id: string): Promise<boolean> {
    return this.activities.delete(id);
  }

  // Galleries
  async getAllGalleries(): Promise<Gallery[]> {
    return Array.from(this.galleries.values());
  }

  async getGallery(id: string): Promise<Gallery | undefined> {
    return this.galleries.get(id);
  }

  async createGallery(insertGallery: InsertGallery): Promise<Gallery> {
    const id = randomUUID();
    const gallery: Gallery = { ...insertGallery, id };
    this.galleries.set(id, gallery);
    return gallery;
  }

  async updateGallery(
    id: string,
    updates: Partial<InsertGallery>
  ): Promise<Gallery | undefined> {
    const gallery = this.galleries.get(id);
    if (!gallery) return undefined;

    const updated: Gallery = { ...gallery, ...updates };
    this.galleries.set(id, updated);
    return updated;
  }

  async deleteGallery(id: string): Promise<boolean> {
    return this.galleries.delete(id);
  }
}

export const storage = new MemStorage();
