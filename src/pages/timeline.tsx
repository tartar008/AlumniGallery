import { useQuery } from "@tanstack/react-query";
import { Clock, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Activity } from "@/lib/schema";

export default function TimelinePage() {
  const { data: activities = [], isLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  // Sort activities by date (newest first)
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
  );

  // Group by year
  const groupedByYear = sortedActivities.reduce((acc, activity) => {
    const year = new Date(activity.eventDate).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(activity);
    return acc;
  }, {} as Record<number, Activity[]>);

  const years = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">ไทม์ไลน์กิจกรรม</h1>
          <p className="text-muted-foreground text-lg">
            เหตุการณ์สำคัญและกิจกรรมทั้งหมดเรียงตามเวลา
          </p>
        </div>

        {/* Timeline */}
        {isLoading ? (
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-8 animate-pulse">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-muted" />
                  <div className="w-0.5 h-full bg-muted mt-4" />
                </div>
                <div className="flex-1 pb-12">
                  <div className="h-32 bg-muted rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-16">
            <Clock className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">ยังไม่มีกิจกรรม</h3>
            <p className="text-muted-foreground">
              เพิ่มกิจกรรมใหม่ได้ที่หน้าจัดการข้อมูล
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

            {years.map((year, yearIndex) => (
              <div key={year} className="mb-12">
                {/* Year Marker */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-mono font-bold">
                    {year}
                  </div>
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-primary to-transparent" />
                </div>

                {/* Activities for this year */}
                <div className="space-y-8 ml-20">
                  {groupedByYear[year].map((activity, activityIndex) => {
                    const isLeft = activityIndex % 2 === 0;
                    return (
                      <div
                        key={activity.id}
                        className={`relative ${isLeft ? "" : "md:ml-12"}`}
                      >
                        {/* Connection dot */}
                        <div className="absolute -left-[5.5rem] top-6 w-3 h-3 rounded-full bg-ring border-2 border-background" />

                        <Card
                          className="hover-elevate active-elevate-2"
                          data-testid={`card-activity-${activity.id}`}
                        >
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
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <CardTitle className="text-xl" data-testid={`text-timeline-title-${activity.id}`}>
                                  {activity.title}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-2 mt-2">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(activity.eventDate).toLocaleDateString("th-TH", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </CardDescription>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="default">{activity.category}</Badge>
                                {activity.cohort && (
                                  <Badge variant="secondary">{activity.cohort}</Badge>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          {activity.description && (
                            <CardContent>
                              <p className="text-sm leading-relaxed">{activity.description}</p>
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
