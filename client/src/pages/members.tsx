import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Search, User as UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  const [selectedCohort, setSelectedCohort] = useState<string>("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  const { data: members = [], isLoading } = useQuery<Member[]>({
    queryKey: ["/api/members"],
  });

  // Get URL params for cohort filter
  const params = new URLSearchParams(window.location.search);
  const cohortParam = params.get("cohort");

  // Set cohort filter from URL param
  useMemo(() => {
    if (cohortParam && selectedCohort === "all") {
      setSelectedCohort(cohortParam);
    }
  }, [cohortParam, selectedCohort]);

  // Get unique cohorts and departments
  const cohorts = Array.from(new Set(members.map((m) => m.cohort))).sort((a, b) =>
    b.localeCompare(a)
  );
  const departments = Array.from(new Set(members.map((m) => m.department))).sort();

  // Filter members
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.nameEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.cohort.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCohort = selectedCohort === "all" || member.cohort === selectedCohort;
    const matchesDepartment =
      selectedDepartment === "all" || member.department === selectedDepartment;

    return matchesSearch && matchesCohort && matchesDepartment;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">คลังสมาชิก</h1>
          <p className="text-muted-foreground text-lg">
            ค้นหาและดูข้อมูลสมาชิกทุกรุ่น
          </p>
        </div>

        {/* Search and Filters */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm py-4 mb-8 border-b">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาชื่อ, รุ่น, สาขา..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-members"
              />
            </div>
            <Select value={selectedCohort} onValueChange={setSelectedCohort}>
              <SelectTrigger data-testid="select-cohort-filter">
                <SelectValue placeholder="เลือกรุ่น" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกรุ่น</SelectItem>
                {cohorts.map((cohort) => (
                  <SelectItem key={cohort} value={cohort}>
                    {cohort}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger data-testid="select-department-filter">
                <SelectValue placeholder="เลือกสาขา" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกสาขา</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            แสดง {filteredMembers.length} จาก {members.length} คน
          </p>
        </div>

        {/* Members Grid */}
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
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-16">
            <UserIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">ไม่พบสมาชิก</h3>
            <p className="text-muted-foreground">ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredMembers.map((member) => (
              <Link key={member.id} href={`/members/${member.id}`}>
                <Card className="hover-elevate active-elevate-2 cursor-pointer h-full">
                  <CardHeader className="space-y-4">
                    <Avatar className="w-full aspect-square rounded-md">
                      <AvatarImage src={member.profileImage || undefined} alt={member.name} />
                      <AvatarFallback className="rounded-md text-2xl">
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <h3
                        className="font-semibold text-base leading-tight"
                        data-testid={`text-member-name-${member.id}`}
                      >
                        {member.name}
                      </h3>
                      {member.nameEn && (
                        <p className="text-xs text-muted-foreground">{member.nameEn}</p>
                      )}
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {member.cohort}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{member.department}</p>
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
