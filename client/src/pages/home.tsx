import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Users, Image as ImageIcon, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@assets/generated_images/Image_bus.jpg";
import type { Member, Activity, Gallery } from "@shared/schema";

export default function HomePage() {
  const { data: members = [] } = useQuery<Member[]>({
    queryKey: ["/api/members"],
  });

  const { data: activities = [] } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  const { data: galleries = [] } = useQuery<Gallery[]>({
    queryKey: ["/api/galleries"],
  });

  // Get unique cohorts and count members
  const cohortStats = members.reduce((acc, member) => {
    acc[member.cohort] = (acc[member.cohort] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const cohortList = Object.entries(cohortStats)
    .map(([cohort, count]) => ({ cohort, count }))
    .sort((a, b) => b.cohort.localeCompare(a.cohort));

  const totalCohorts = cohortList.length;
  const totalMembers = members.length;
  const totalPhotos = galleries.length;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Wash */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Campus community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            ภาพรวมทุกรุ่น
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-mono">
            {totalCohorts}+ รุ่น • {totalMembers}+ สมาชิก • {totalPhotos}+ ความทรงจำ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/members">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                data-testid="button-explore-members"
              >
                <Users className="w-5 h-5 mr-2" />
                สำรวจสมาชิก
              </Button>
            </Link>
            <Link href="/gallery">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                data-testid="button-view-gallery"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                ดูแกลเลอรี
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12">
            สถิติภาพรวม
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover-elevate active-elevate-2">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">จำนวนรุ่น</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-mono" data-testid="text-cohort-count">
                  {totalCohorts}
                </div>
                <p className="text-xs text-muted-foreground mt-1">รุ่นทั้งหมดในระบบ</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate active-elevate-2">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">สมาชิก</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-mono" data-testid="text-member-count">
                  {totalMembers}
                </div>
                <p className="text-xs text-muted-foreground mt-1">สมาชิกทั้งหมด</p>
              </CardContent>
            </Card>

            <Card className="hover-elevate active-elevate-2">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ภาพกิจกรรม</CardTitle>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-mono" data-testid="text-photo-count">
                  {totalPhotos}
                </div>
                <p className="text-xs text-muted-foreground mt-1">ภาพในแกลเลอรี</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cohorts Grid */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-12">
            รุ่นทั้งหมด
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {cohortList.map(({ cohort, count }) => (
              <Link key={cohort} href={`/members?cohort=${encodeURIComponent(cohort)}`}>
                <Card className="hover-elevate active-elevate-2 cursor-pointer h-full">
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-xl font-serif" data-testid={`text-cohort-${cohort}`}>
                      {cohort}
                    </CardTitle>
                    <CardDescription>
                      <Badge variant="secondary" data-testid={`badge-count-${cohort}`}>
                        {count} คน
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      {activities.length > 0 && (
        <section className="py-16 md:py-24 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold">
                กิจกรรมล่าสุด
              </h2>
              <Link href="/timeline">
                <Button variant="outline" data-testid="button-view-all-activities">
                  ดูทั้งหมด
                  <Clock className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.slice(0, 3).map((activity) => (
                <Card key={activity.id} className="hover-elevate active-elevate-2">
                  {activity.imageUrl && (
                    <div className="aspect-video overflow-hidden rounded-t-md">
                      <img
                        src={activity.imageUrl}
                        alt={activity.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg" data-testid={`text-activity-${activity.id}`}>
                      {activity.title}
                    </CardTitle>
                    <CardDescription>
                      <Badge variant="outline">{activity.category}</Badge>
                      {activity.cohort && (
                        <Badge variant="secondary" className="ml-2">
                          {activity.cohort}
                        </Badge>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(activity.eventDate).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
