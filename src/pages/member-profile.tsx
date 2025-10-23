import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Mail, User as UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Member, Gallery } from "@/lib/schema";

export default function MemberProfilePage() {
  const [, params] = useRoute("/members/:id");
  const memberId = params?.id;

  const { data: member, isLoading } = useQuery<Member>({
    queryKey: ["/api/members", memberId],
    enabled: !!memberId,
  });

  const { data: galleries = [] } = useQuery<Gallery[]>({
    queryKey: ["/api/galleries"],
  });

  // Get related members from same cohort
  const { data: allMembers = [] } = useQuery<Member[]>({
    queryKey: ["/api/members"],
  });

  const relatedMembers = member
    ? allMembers.filter(
        (m) => m.cohort === member.cohort && m.id !== member.id
      ).slice(0, 4)
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-muted rounded-md" />
            <div className="h-32 bg-muted rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen py-16 px-4 text-center">
        <UserIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">ไม่พบข้อมูลสมาชิก</h2>
        <Link href="/members">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับไปคลังสมาชิก
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/members">
          <Button variant="outline" className="mb-6" data-testid="button-back-to-members">
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับ
          </Button>
        </Link>

        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <Avatar className="w-48 h-48 rounded-md flex-shrink-0">
                <AvatarImage src={member.profileImage || undefined} alt={member.name} />
                <AvatarFallback className="rounded-md text-6xl">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <div>
                  <h1
                    className="text-3xl md:text-4xl font-serif font-bold mb-2"
                    data-testid="text-profile-name"
                  >
                    {member.name}
                  </h1>
                  {member.nameEn && (
                    <p className="text-lg text-muted-foreground">{member.nameEn}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default" data-testid="badge-cohort">
                    {member.cohort}
                  </Badge>
                  <Badge variant="secondary">{member.department}</Badge>
                  {member.position && <Badge variant="outline">{member.position}</Badge>}
                </div>
                {member.bio && (
                  <p className="text-base leading-relaxed">{member.bio}</p>
                )}
                {member.contactInfo && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{member.contactInfo}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Members */}
        {relatedMembers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-serif font-semibold mb-6">
              สมาชิกรุ่นเดียวกัน
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedMembers.map((relatedMember) => (
                <Link key={relatedMember.id} href={`/members/${relatedMember.id}`}>
                  <Card className="hover-elevate active-elevate-2 cursor-pointer">
                    <CardHeader className="space-y-3">
                      <Avatar className="w-full aspect-square rounded-md">
                        <AvatarImage
                          src={relatedMember.profileImage || undefined}
                          alt={relatedMember.name}
                        />
                        <AvatarFallback className="rounded-md">
                          {relatedMember.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-sm leading-tight">
                          {relatedMember.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {relatedMember.department}
                        </p>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
