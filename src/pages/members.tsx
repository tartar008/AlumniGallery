import { useEffect, useState, useMemo } from "react";
import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [selectedCohort, setSelectedCohort] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [search, setSearch] = useState("");

  // ✅ โหลดข้อมูลจาก JSON (ใช้ BASE_URL)
  useEffect(() => {
    const base = import.meta.env.BASE_URL;
    fetch(`${base}data/members.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setMembers(data)) // ✅ ใช้ setMembers แทน setImages
      .catch((err) => console.error("โหลด members.json ไม่ได้:", err));
  }, []);

  // ✅ unique filter options
  const cohorts = useMemo(
    () => ["all", ...Array.from(new Set(members.map((m) => m.cohort)))],
    [members]
  );
  const departments = useMemo(
    () => ["all", ...Array.from(new Set(members.map((m) => m.department)))],
    [members]
  );

  // ✅ filter members
  const filtered = members.filter((m) => {
    const matchCohort = selectedCohort === "all" || m.cohort === selectedCohort;
    const matchDept = selectedDepartment === "all" || m.department === selectedDepartment;
    const matchSearch =
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      m.studentId.includes(search);
    return matchCohort && matchDept && matchSearch;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-4">คลังสมาชิก</h1>
        <p className="text-muted-foreground mb-6">
          ค้นหา ดูข้อมูล และทำความรู้จักกับศิษย์เก่าทั้งหมด
        </p>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Input
            placeholder="ค้นหาชื่อ, รหัสนักศึกษา, รุ่น หรือสาขา..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Select value={selectedCohort} onValueChange={setSelectedCohort}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="เลือกรุ่น" />
            </SelectTrigger>
            <SelectContent>
              {cohorts.map((cohort) => (
                <SelectItem key={cohort} value={cohort}>
                  {cohort === "all" ? "ทุกรุ่น" : cohort}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="เลือกสาขา" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept === "all" ? "ทุกสาขา" : dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Member list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">ไม่พบสมาชิก</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((m) => (
              <div
                key={m.studentId}
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative w-full aspect-square bg-gray-100 flex items-center justify-center">
                  {m.profileImage ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${m.profileImage.replace(/^\//, "")}`}
                      alt={m.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  ) : (
                    <User className="text-gray-400 w-12 h-12" />
                  )}

                </div>
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.nameEn}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <Badge variant="secondary">{m.cohort}</Badge>
                  <Badge variant="outline">{m.department}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
