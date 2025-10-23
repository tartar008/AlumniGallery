import { useEffect, useState, useMemo } from "react";
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
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // ✅ โหลดข้อมูลจาก public/members.json
  useEffect(() => {
    fetch("/data/members.json")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error("โหลด members.json ไม่ได้:", err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ options
  const cohorts = useMemo(
    () => Array.from(new Set(members.map((m) => m.cohort))).sort((a, b) => b.localeCompare(a)),
    [members]
  );
  const departments = useMemo(
    () => Array.from(new Set(members.map((m) => m.department))).sort(),
    [members]
  );

  // ✅ filtering
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

  if (loading) {
    return <p className="text-center text-gray-500 mt-20">กำลังโหลดข้อมูล...</p>;
  }

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
              <Card
                key={idx}
                className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer h-full overflow-hidden"
              >
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
                  {m.nameEn && <p className="text-xs text-muted-foreground">{m.nameEn}</p>}
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
