import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Search, User as UserIcon } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Member } from "@shared/schema";

export default function MembersPage() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // ✅ โหลดข้อมูลสมาชิก
  const { data: members = [], isLoading, error } = useQuery<Member[]>({
    queryKey: ["/api/members"],
  });

  // ✅ สร้างรายการ cohort และ department ที่ไม่ซ้ำ
  const cohorts = useMemo(
    () => Array.from(new Set(members.map((m) => m.cohort))).sort((a, b) => b.localeCompare(a)),
    [members]
  );

  const departments = useMemo(
    () => Array.from(new Set(members.map((m) => m.department))).sort(),
    [members]
  );

  // ✅ ฟังก์ชันกรองข้อมูล
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const text = searchTerm.toLowerCase();
      const matchesSearch =
        m.name.toLowerCase().includes(text) ||
        m.nameEn?.toLowerCase().includes(text) ||
        m.cohort.toLowerCase().includes(text) ||
        m.department.toLowerCase().includes(text);

      const matchesCohort = selectedCohort === "all" || m.cohort === selectedCohort;
      const matchesDepartment = selectedDepartment === "all" || m.department === selectedDepartment;

      return matchesSearch && matchesCohort && matchesDepartment;
    });
  }, [members, searchTerm, selectedCohort, selectedDepartment]);

  // ✅ ส่วนแสดงผล
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">คลังสมาชิก</h1>
          <p className="text-muted-foreground text-lg">
            ค้นหาและดูข้อมูลสมาชิกทั้งหมดในระบบ
          </p>
        </div>

        {/* Search & Filters */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur py-4 mb-8 border-b">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาชื่อ, รุ่น, สาขา..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Cohort filter */}
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

            {/* Department filter */}
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
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

        {/* Loading */}
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
          <div className="text-center py-16 text-red-500">โหลดข้อมูลล้มเหลว</div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-16">
            <UserIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">ไม่พบสมาชิก</h3>
            <p className="text-muted-foreground">ลองเปลี่ยนคำค้นหาหรือตัวกรองดู</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredMembers.map((m) => (
              <Link key={m.id} href={`/members/${m.id}`}>
                <Card className="hover-elevate active-elevate-2 cursor-pointer h-full">
                  <CardHeader className="space-y-4">
                    <Avatar className="w-full aspect-square rounded-md">
                      <AvatarImage
                        src={m.profileImage || "/images/members/default.png"}
                        alt={m.name}
                      />
                      <AvatarFallback className="rounded-md text-2xl">
                        {m.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-base leading-tight">{m.name}</h3>
                      {m.nameEn && (
                        <p className="text-xs text-muted-foreground">{m.nameEn}</p>
                      )}
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {m.cohort}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{m.department}</p>
                    </div>
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
