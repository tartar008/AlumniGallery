import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Search, User as UserIcon, Mail, Phone } from "lucide-react";
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
import type { Member } from "@shared/schema";

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // ✅ โหลดข้อมูลสมาชิก
  const { data: members = [], isLoading, error } = useQuery<Member[]>({
    queryKey: ["/api/members"],
  });

  // ✅ Cohorts และ Departments ไม่ซ้ำ
  const cohorts = useMemo(
    () =>
      Array.from(new Set(members.map((m) => m.cohort))).sort((a, b) =>
        b.localeCompare(a)
      ),
    [members]
  );
  const departments = useMemo(
    () => Array.from(new Set(members.map((m) => m.department))).sort(),
    [members]
  );

  // ✅ ฟิลเตอร์
  const filteredMembers = useMemo(() => {
    const text = searchTerm.toLowerCase();
    return members.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(text) ||
        m.nameEn?.toLowerCase().includes(text) ||
        m.studentId?.toLowerCase().includes(text) ||
        m.department.toLowerCase().includes(text) ||
        m.cohort.toLowerCase().includes(text);
      const matchesCohort =
        selectedCohort === "all" || m.cohort === selectedCohort;
      const matchesDepartment =
        selectedDepartment === "all" || m.department === selectedDepartment;
      return matchesSearch && matchesCohort && matchesDepartment;
    });
  }, [members, searchTerm, selectedCohort, selectedDepartment]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
            คลังสมาชิก
          </h1>
          <p className="text-muted-foreground text-lg">
            ค้นหา ดูข้อมูล และทำความรู้จักกับสมาชิกทั้งหมด
          </p>
        </div>

        {/* Filters */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur py-4 mb-8 border-b">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาชื่อ, รหัสนักศึกษา, รุ่น, หรือสาขา..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCohort} onValueChange={setSelectedCohort}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกรุ่น" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกรุ่น</SelectItem>
                {cohorts.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger>
                <SelectValue placeholder="เลือกสาขา" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกสาขา</SelectItem>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            แสดง {filteredMembers.length} จากทั้งหมด {members.length} คน
          </p>
        </div>

        {/* Loading / Error / Empty */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="space-y-4">
                  <div className="w-full aspect-square bg-muted rounded-md" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">
            โหลดข้อมูลล้มเหลว
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-16">
            <UserIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">ไม่พบสมาชิก</h3>
            <p className="text-muted-foreground">
              ลองเปลี่ยนคำค้นหาหรือตัวกรองดู
            </p>
          </div>
        ) : (
          /* ✅ แสดงสมาชิก */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredMembers.map((m) => (
              <Link key={m.id} href={`/members/${m.id}`}>
                <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer h-full overflow-hidden">
                  <div className="relative w-full aspect-square bg-gray-100 flex items-center justify-center">
                    {m.profileImage ? (
                      <img
                        src={m.profileImage}
                        alt={m.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                    ) : (
                      <User className="text-gray-400 w-12 h-12" />
                    )}
                  </div>

                  <CardHeader className="p-4 space-y-1">
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-base leading-tight truncate">
                        {m.name}
                      </h3>
                      {m.nameEn && (
                        <p className="text-xs text-muted-foreground">
                          {m.nameEn}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        รหัสนักศึกษา: {m.studentId}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {m.cohort}
                      </Badge>
                      {m.position && (
                        <Badge variant="outline" className="text-xs">
                          {m.position}
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {m.department}
                    </p>

                    {m.bio && (
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {m.bio}
                      </p>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
