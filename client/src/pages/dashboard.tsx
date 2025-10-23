import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Trash2, Edit, Users, Image as ImageIcon, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { MemberForm } from "@/components/member-form";
import { ActivityForm } from "@/components/activity-form";
import { GalleryForm } from "@/components/gallery-form";
import type { Member, Activity, Gallery } from "@shared/schema";

export default function DashboardPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("members");
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
  const [deletingItem, setDeletingItem] = useState<{
    type: "member" | "activity" | "gallery";
    id: string;
  } | null>(null);

  const { data: members = [] } = useQuery<Member[]>({
    queryKey: ["/api/members"],
  });

  const { data: activities = [] } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  const { data: galleries = [] } = useQuery<Gallery[]>({
    queryKey: ["/api/galleries"],
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ type, id }: { type: string; id: string }) => {
      // Convert singular to plural for API routes
      const pluralType = type === "member" ? "members" : type === "activity" ? "activities" : "galleries";
      await apiRequest("DELETE", `/api/${pluralType}/${id}`);
    },
    onSuccess: (_, variables) => {
      // Use plural form for cache invalidation to match query keys
      const pluralType = variables.type === "member" ? "members" : variables.type === "activity" ? "activities" : "galleries";
      queryClient.invalidateQueries({ queryKey: [`/api/${pluralType}`] });
      toast({
        title: "ลบสำเร็จ",
        description: "ลบข้อมูลเรียบร้อยแล้ว",
      });
      setDeletingItem(null);
    },
    onError: () => {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถลบข้อมูลได้",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">จัดการข้อมูล</h1>
          <p className="text-muted-foreground text-lg">
            เพิ่ม แก้ไข และจัดการข้อมูลสมาชิก กิจกรรม และแกลเลอรี
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">สมาชิกทั้งหมด</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-mono" data-testid="text-dashboard-member-count">
                {members.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">กิจกรรม</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-mono" data-testid="text-dashboard-activity-count">
                {activities.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ภาพแกลเลอรี</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-mono" data-testid="text-dashboard-gallery-count">
                {galleries.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="members" data-testid="tab-members">
              สมาชิก
            </TabsTrigger>
            <TabsTrigger value="activities" data-testid="tab-activities">
              กิจกรรม
            </TabsTrigger>
            <TabsTrigger value="galleries" data-testid="tab-galleries">
              แกลเลอรี
            </TabsTrigger>
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>เพิ่มสมาชิกใหม่</CardTitle>
                <CardDescription>กรอกข้อมูลสมาชิกใหม่</CardDescription>
              </CardHeader>
              <CardContent>
                <MemberForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>รายชื่อสมาชิก ({members.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border rounded-md hover-elevate"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold" data-testid={`text-dashboard-member-${member.id}`}>
                          {member.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {member.cohort} • {member.department}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setEditingMember(member)}
                          data-testid={`button-edit-member-${member.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setDeletingItem({ type: "member", id: member.id })}
                          data-testid={`button-delete-member-${member.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {members.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      ยังไม่มีสมาชิก
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>เพิ่มกิจกรรมใหม่</CardTitle>
                <CardDescription>กรอกข้อมูลกิจกรรมใหม่</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>รายการกิจกรรม ({activities.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 border rounded-md hover-elevate"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold" data-testid={`text-dashboard-activity-${activity.id}`}>
                          {activity.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {activity.category} • {new Date(activity.eventDate).toLocaleDateString("th-TH")}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setEditingActivity(activity)}
                          data-testid={`button-edit-activity-${activity.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setDeletingItem({ type: "activity", id: activity.id })}
                          data-testid={`button-delete-activity-${activity.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {activities.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      ยังไม่มีกิจกรรม
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Galleries Tab */}
          <TabsContent value="galleries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>เพิ่มภาพใหม่</CardTitle>
                <CardDescription>อัปโหลดภาพลงแกลเลอรี</CardDescription>
              </CardHeader>
              <CardContent>
                <GalleryForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ภาพทั้งหมด ({galleries.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {galleries.map((gallery) => (
                    <div key={gallery.id} className="relative group">
                      <img
                        src={gallery.imageUrl}
                        alt={gallery.title || "Gallery"}
                        className="w-full aspect-square object-cover rounded-md"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20"
                          onClick={() => setEditingGallery(gallery)}
                          data-testid={`button-edit-gallery-${gallery.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20"
                          onClick={() => setDeletingItem({ type: "gallery", id: gallery.id })}
                          data-testid={`button-delete-gallery-${gallery.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {galleries.length === 0 && (
                    <div className="col-span-full text-center text-muted-foreground py-8">
                      ยังไม่มีภาพในแกลเลอรี
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Dialogs */}
        {editingMember && (
          <MemberForm member={editingMember} onClose={() => setEditingMember(null)} />
        )}
        {editingActivity && (
          <ActivityForm activity={editingActivity} onClose={() => setEditingActivity(null)} />
        )}
        {editingGallery && (
          <GalleryForm gallery={editingGallery} onClose={() => setEditingGallery(null)} />
        )}

        {/* Delete Confirmation */}
        <AlertDialog open={!!deletingItem} onOpenChange={() => setDeletingItem(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
              <AlertDialogDescription>
                คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-testid="button-cancel-delete">
                ยกเลิก
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deletingItem && deleteMutation.mutate(deletingItem)}
                data-testid="button-confirm-delete"
              >
                ลบ
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
