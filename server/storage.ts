import {
  type Member,
  type InsertMember,
  type Activity,
  type InsertActivity,
  type Gallery,
  type InsertGallery,
} from "@shared/schema";
import { randomUUID } from "crypto";
import heroImage from "@assets/generated_images/Image_bus.jpg";


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

  private async seedData() {
    const sampleMembers: InsertMember[] = [
      { profileImage: "/images/members/Image_bus.jpg", studentId: "6510210014", name: "นายกฤษดา สายสะอิด", nameEn: "Kritsada Saisa-it", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210037", name: "นางสาวขนิษฐาเพ็ญ ปิยะปานันท์", nameEn: "Khanittaphen Piyapanan", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210038", name: "นางสาวขวัญกมล ดำแก้ว", nameEn: "Khwan Kamon Damkaew", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210040", name: "นางสาวคารีมา มูเก็ม", nameEn: "Karima Mukem", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210078", name: "นายไชยวัฒน์ ชูทอง", nameEn: "Chaiwat Chuthong", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210096", name: "นายณัฐพงศ์ สุขอ้น", nameEn: "Nattapong Sukon", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210126", name: "นายธวัชชัย ทองไฝ", nameEn: "Thawatchai Thongfai", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210134", name: "นายธีรวัชร วัชนะ", nameEn: "Teerawat Watchana", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210143", name: "นางสาวนลินทิพย์ สุวรรณลอยล่อง", nameEn: "Nalinthip Suwanloylong", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210144", name: "นายนวพล กะม่าสา", nameEn: "Nawaphon Kamasa", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210151", name: "นางสาวนัจมีย์ หลังเกตุ", nameEn: "Najmee Langket", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210155", name: "นายนัทธพงศ์ เตละกุล", nameEn: "Nattapong Telakul", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210176", name: "นางสาวบัณทิตา วงศ์พุทธรักษา", nameEn: "Bantita Wongputtaraksa", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210200", name: "นายปิยะชัย ณรงค์ทรัพย์", nameEn: "Piyachai Narongsab", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210233", name: "นายพีรพัฒน์ บัวขาว", nameEn: "Peerapat Buakhao", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210234", name: "นายพุฒิลักษณ์ เด่นประเสริฐ", nameEn: "Phutilak Denprasert", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210239", name: "นายฟารุค หมัดอาดั้ม", nameEn: "Faruk Madadam", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210242", name: "นางสาวฟิรดาวห์ ล๊ะอาหลี", nameEn: "Firdawh La-alee", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210262", name: "นางสาวมารียะห์ สุวาหลำ", nameEn: "Mariya Suwalam", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210264", name: "นางสาวมุนา หลานเก", nameEn: "Muna Lan-Ke", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210267", name: "นายมูฮำหมัด ยะลาพานี", nameEn: "Muhammad Yalapanee", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210289", name: "นางสาววรรณรยา ทองแดง", nameEn: "Wannaraya Thongdaeng", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210317", name: "นางสาวศิริราตรี อุตมะมุณีย์", nameEn: "Siriratree Uttamamoonee", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210323", name: "นายสพลดนัย คู", nameEn: "Sappaladnai Koo", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210337", name: "นางสาวสุชานันท์ ศรีเทพ", nameEn: "Suchanan Srithep", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210342", name: "นางสาวสุนิสา สีอ่อน", nameEn: "Sunisa Sion", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210350", name: "นายสุวิจักขณ์ บัวสุวรรณ", nameEn: "Suwichak Buasuwan", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210367", name: "นายอรรถพล บัวทอง", nameEn: "Atthaphon Buathong", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210371", name: "นางสาวอริสรา พรมอินทร์", nameEn: "Arisara Promin", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210395", name: "นายอาลาอูลดิน ดาเด๊ะ", nameEn: "Alauldin Dadeh", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210414", name: "นายกฤษฎา หนักแก้ว", nameEn: "Kritsada Nakkaew", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210417", name: "นายกองกิจ ยี่ซ้าย", nameEn: "Kongkit Yeesai", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210424", name: "นางสาวกัลยาณี อาทรสิริรัตน์", nameEn: "Kanyanee Athornsirirat", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210437", name: "นางสาวจีรนันท์ จันทร์แก้ว", nameEn: "Jeeranan Chankaeo", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210463", name: "นางสาวณัชชา สะหยัง", nameEn: "Natcha Sayang", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210480", name: "นายธนชาติ ธรรมรงค์", nameEn: "Thanachat Thamrong", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210495", name: "นายธีรภัทร ปิ่นพรม", nameEn: "Teerapat Pinprom", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210511", name: "นางสาวบยาน สิเดะ", nameEn: "Bayan Sideh", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210527", name: "นางสาวพควดี สุวรรณชาตรี", nameEn: "Phakawadee Suwanchatree", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210528", name: "นายพชรพล ด่านวรพงศ์", nameEn: "Phacharapol Danworapong", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210544", name: "นางสาวฟิตรีนา แม", nameEn: "Fitreena Mae", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210551", name: "นายภาณุวิชญ์ รักใหม่", nameEn: "Phanuwitch Rakmai", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210560", name: "นายเมธาสิทธิ์ รัตนคช", nameEn: "Methasit Rattanakot", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210561", name: "นางสาวเมษิยา ไพรพฤกษ์", nameEn: "Mesiya Praipruek", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210574", name: "นายวสวัตติ์ นำเอกลาภ", nameEn: "Wasawat Namekarlap", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210588", name: "นางสาวสวิชญา ฮวดพรหม", nameEn: "Savitjaya Huatprom", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210617", name: "นายอับดุลการีม มามะ", nameEn: "Abdulkarim Mama", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210624", name: "นางสาวอารีดา เจะมามะ", nameEn: "Areeda Jehmama", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
      { studentId: "6510210634", name: "นางสาวจิรัญญา ดินเตบ", nameEn: "Jiranya Dintep", cohort: "ICT 18", department: "เทคโนโลยีสารสนเทศและการสื่อสาร (ICT)", year: 2025, bio: "", position: "", contactInfo: "" },
    ]

    // ✅ สร้าง Gallery อัตโนมัติจากชื่อไฟล์
    const galleryImages = [
      "Photo_001.jpeg", "Photo_001.jpg", "Photo_002.jpeg", "Photo_002.jpg", "Photo_003.jpeg", "Photo_003.jpg", "Photo_004.jpeg", "Photo_004.jpg", "Photo_005.jpeg", "Photo_005.jpg",
      "Photo_006.jpeg", "Photo_006.jpg", "Photo_007.jpeg", "Photo_007.jpg", "Photo_008.jpeg", "Photo_008.jpg", "Photo_009.jpeg", "Photo_009.jpg", "Photo_010.jpeg", "Photo_010.jpg",
      "Photo_011.jpeg", "Photo_011.jpg", "Photo_012.jpeg", "Photo_012.jpg", "Photo_013.jpeg", "Photo_013.jpg", "Photo_014.jpeg", "Photo_014.jpg", "Photo_015.jpeg", "Photo_015.jpg",
      "Photo_016.jpeg", "Photo_016.jpg", "Photo_017.jpeg", "Photo_017.jpg", "Photo_018.jpeg", "Photo_018.jpg", "Photo_019.jpeg", "Photo_019.jpg", "Photo_020.jpeg", "Photo_020.jpg",
      "Photo_021.jpeg", "Photo_021.jpg", "Photo_022.jpeg", "Photo_022.jpg", "Photo_023.jpeg", "Photo_023.jpg", "Photo_024.jpeg", "Photo_024.jpg", "Photo_025.jpeg", "Photo_025.jpg",
      "Photo_026.jpeg", "Photo_026.jpg", "Photo_027.jpeg", "Photo_027.jpg", "Photo_028.jpg", "Photo_028.PNG", "Photo_029.jpg", "Photo_029.PNG", "Photo_030.jpg", "Photo_030.PNG",
      "Photo_031.jpg", "Photo_031.PNG", "Photo_032.jpg", "Photo_032.PNG", "Photo_033.jpg", "Photo_033.PNG", "Photo_034.jpg", "Photo_034.PNG", "Photo_035.jpg", "Photo_035.PNG",
      "Photo_036.jpg", "Photo_036.PNG", "Photo_037.jpg", "Photo_037.PNG", "Photo_038.jpg", "Photo_038.PNG", "Photo_039.jpg", "Photo_039.PNG", "Photo_040.jpg", "Photo_040.PNG",
      "Photo_041.jpg", "Photo_041.PNG", "Photo_042.jpg", "Photo_042.PNG", "Photo_043.jpg", "Photo_043.PNG", "Photo_044.jpg", "Photo_044.PNG", "Photo_045.jpg", "Photo_045.PNG",
      "Photo_046.jpg", "Photo_046.PNG", "Photo_047.jpg", "Photo_047.PNG", "Photo_048.jpg", "Photo_048.PNG", "Photo_049.jpg", "Photo_049.PNG", "Photo_050.GIF", "Photo_050.jpg",
      "Photo_051.GIF", "Photo_051.jpg", "Photo_052.GIF", "Photo_052.jpg", "Photo_053.jpg", "Photo_053.PNG", "Photo_054.jpg", "Photo_054.PNG", "Photo_055.jpg", "Photo_055.PNG",
      "Photo_056.jpg", "Photo_056.PNG", "Photo_057.jpg", "Photo_057.PNG", "Photo_058.jpg", "Photo_058.PNG", "Photo_059.jpg", "Photo_059.PNG", "Photo_060.jpg", "Photo_060.PNG",
      "Photo_061.jpg", "Photo_061.PNG", "Photo_062.jpg", "Photo_062.PNG", "Photo_063.jpg", "Photo_063.PNG", "Photo_064.jpg", "Photo_064.PNG", "Photo_065.jpg", "Photo_065.PNG",
      "Photo_066.jpg", "Photo_066.PNG", "Photo_067.jpg", "Photo_067.PNG", "Photo_068.jpg", "Photo_068.PNG", "Photo_069.jpg", "Photo_069.PNG", "Photo_070.jpg", "Photo_070.PNG",
      "Photo_071.jpg", "Photo_071.PNG", "Photo_072.jpg", "Photo_072.PNG", "Photo_073.jpg", "Photo_073.PNG", "Photo_074.jpg", "Photo_074.PNG", "Photo_075.jpg", "Photo_075.PNG",
      "Photo_076.jpg", "Photo_076.PNG", "Photo_077.jpg", "Photo_077.PNG", "Photo_078.jpg", "Photo_078.PNG", "Photo_079.jpg", "Photo_079.PNG", "Photo_080.jpg", "Photo_080.PNG",
      "Photo_081.jpg", "Photo_081.PNG", "Photo_082.jpg", "Photo_082.PNG", "Photo_083.jpg", "Photo_083.PNG", "Photo_084.jpg", "Photo_084.PNG", "Photo_085.jpg", "Photo_085.PNG",
      "Photo_086.jpg", "Photo_086.PNG", "Photo_087.jpg", "Photo_087.PNG", "Photo_088.jpg", "Photo_088.PNG", "Photo_089.jpg", "Photo_089.PNG", "Photo_090.jpg", "Photo_090.PNG",
      "Photo_091.jpg", "Photo_091.PNG", "Photo_092.jpg", "Photo_092.PNG", "Photo_093.jpg", "Photo_093.PNG", "Photo_094.jpg", "Photo_094.PNG", "Photo_095.jpg", "Photo_095.PNG",
      "Photo_096.jpg", "Photo_096.PNG", "Photo_097.jpg", "Photo_097.PNG", "Photo_098.jpg", "Photo_098.PNG", "Photo_099.jpg", "Photo_099.PNG", "Photo_100.jpg", "Photo_100.PNG",
      "Photo_101.jpg", "Photo_101.PNG", "Photo_102.jpg", "Photo_102.PNG", "Photo_103.jpg", "Photo_103.PNG", "Photo_104.jpg", "Photo_104.PNG", "Photo_105.jpg", "Photo_105.PNG",
      "Photo_106.jpg", "Photo_106.png", "Photo_107.jpg", "Photo_108.jpg", "Photo_109.jpg", "Photo_110.jpg", "Photo_111.JPG", "Photo_112.JPG", "Photo_113.JPG", "Photo_114.JPG",
      "Photo_115.JPG", "Photo_116.JPG", "Photo_117.JPG", "Photo_118.JPG", "Photo_119.JPG", "Photo_120.JPG", "Photo_121.jpg", "Photo_122.JPG", "Photo_123.JPG", "Photo_124.JPG",
      "Photo_125.JPG", "Photo_126.jpg", "Photo_127.JPG", "Photo_128.jpg", "Photo_129.JPG", "Photo_130.JPG", "Photo_131.JPG", "Photo_132.JPG", "Photo_133.JPG", "Photo_134.JPG",
      "Photo_135.JPG", "Photo_136.JPG", "Photo_137.JPG", "Photo_138.JPG", "Photo_139.JPG", "Photo_140.JPG", "Photo_141.JPG", "Photo_142.JPG", "Photo_143.JPG", "Photo_156.JPG",
      "Photo_157.JPG", "Photo_158.JPG", "Photo_159.JPG", "Photo_160.JPG", "Photo_161.jpg", "Photo_162.JPG", "Photo_163.JPG", "Photo_164.JPG", "Photo_165.JPG", "Photo_166.JPG",
      "Photo_167.JPG", "Photo_168.JPG", "Photo_169.JPG", "Photo_170.JPG", "Photo_171.JPG", "Photo_172.JPG", "Photo_173.JPG", "Photo_174.JPG", "Photo_175.JPG", "Photo_176.JPG",
      "Photo_177.JPG", "Photo_178.JPG", "Photo_179.JPG", "Photo_180.JPG", "Photo_181.JPG", "Photo_182.JPG", "Photo_183.JPG", "Photo_184.JPG", "Photo_185.JPG", "Photo_186.JPG",
      "Photo_187.JPG", "Photo_188.JPG", "Photo_189.JPG", "Photo_190.JPG", "Photo_191.jpg"
    ];


    for (const filename of galleryImages) {
      await this.createGallery({
        imageUrl: `/images/gallery/${filename}`,
        title: filename.replace(/\.[^/.]+$/, ""), // ชื่อไฟล์ไม่รวม .jpg
        description: "ภาพกิจกรรม ICT 18",
        eventDate: new Date().toISOString(),
        cohort: "ICT 18",
        category: "กิจกรรมสาขา",
        activityId: null,
      });
    }
  };

  // Members
  async getAllMembers(): Promise<Member[]> {
    return Array.from(this.members.values()).sort((a, b) => b.year - a.year);
  }

  async getMember(id: string): Promise<Member | undefined> {
    return this.members.get(id);
  }

  async createMember(insertMember: InsertMember): Promise<Member> {
    const id = randomUUID();
    const member: Member = {
      id,
      studentId: insertMember.studentId,
      name: insertMember.name,
      nameEn: insertMember.nameEn ?? null,
      cohort: insertMember.cohort,
      department: insertMember.department,
      bio: insertMember.bio ?? null,
      profileImage: insertMember.profileImage ?? null,
      position: insertMember.position ?? null,
      contactInfo: insertMember.contactInfo ?? null,
      year: insertMember.year,
    };
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
    const activity: Activity = {
      id,
      title: insertActivity.title,
      description: insertActivity.description ?? null,
      eventDate: insertActivity.eventDate,
      cohort: insertActivity.cohort ?? null,
      category: insertActivity.category,
      imageUrl: insertActivity.imageUrl ?? null,
    };
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
    const gallery: Gallery = {
      id,
      title: insertGallery.title ?? null,
      description: insertGallery.description ?? null,
      eventDate: insertGallery.eventDate ?? null,
      cohort: insertGallery.cohort ?? null,
      category: insertGallery.category ?? null,
      imageUrl: insertGallery.imageUrl,
      activityId: insertGallery.activityId ?? null,
    };
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
