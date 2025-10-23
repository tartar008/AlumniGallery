import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search, User as UserIcon } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // ✅ ใช้ข้อมูลจำลองแทนการโหลดจาก API
  const members = [
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
  ];

  // ✅ Cohort & Department options
  const cohorts = useMemo(
    () => Array.from(new Set(members.map((m) => m.cohort))).sort((a, b) => b.localeCompare(a)),
    [members]
  );
  const departments = useMemo(
    () => Array.from(new Set(members.map((m) => m.department))).sort(),
    [members]
  );

  // ✅ Filtering
  const filteredMembers = useMemo(() => {
    const text = searchTerm.toLowerCase();
    return members.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(text) ||
        m.nameEn?.toLowerCase().includes(text) ||
        m.studentId?.toLowerCase().includes(text) ||
        m.department.toLowerCase().includes(text) ||
        m.cohort.toLowerCase().includes(text);
      const matchesCohort = selectedCohort === "all" || m.cohort === selectedCohort;
      const matchesDepartment = selectedDepartment === "all" || m.department === selectedDepartment;
      return matchesSearch && matchesCohort && matchesDepartment;
    });
  }, [members, searchTerm, selectedCohort, selectedDepartment]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">คลังสมาชิก</h1>
          <p className="text-muted-foreground text-lg">
            ค้นหา ดูข้อมูล และทำความรู้จักกับสมาชิกทั้งหมด
          </p>
        </div>

        {/* Filters */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur py-4 mb-8 border-b">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาชื่อ, รหัสนักศึกษา, รุ่น, หรือสาขา..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Cohort */}
            <Select value={selectedCohort} onValueChange={setSelectedCohort}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกรุ่น" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกรุ่น</SelectItem>
                {cohorts.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Department */}
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกสาขา" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกสาขา</SelectItem>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            แสดง {filteredMembers.length} จากทั้งหมด {members.length} คน
          </p>
        </div>

        {/* Members */}
        {filteredMembers.length === 0 ? (
          <div className="text-center py-16">
            <UserIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">ไม่พบสมาชิก</h3>
            <p className="text-muted-foreground">ลองเปลี่ยนคำค้นหาหรือตัวกรองดู</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredMembers.map((m, idx) => (
              <Card key={idx} className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer h-full overflow-hidden">
                <div className="relative w-full aspect-square bg-gray-100 flex items-center justify-center">
                  {m.profileImage ? (
                    <img
                      src={m.profileImage}
                      alt={m.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  ) : (
                    <User className="text-gray-400 w-12 h-12" />
                  )}
                </div>

                <CardHeader className="p-4 space-y-1">
                  <h3 className="font-semibold text-base leading-tight truncate">{m.name}</h3>
                  {m.nameEn && (
                    <p className="text-xs text-muted-foreground">{m.nameEn}</p>
                  )}
                  <p className="text-xs text-muted-foreground">รหัสนักศึกษา: {m.studentId}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge variant="secondary" className="text-xs">{m.cohort}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{m.department}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
