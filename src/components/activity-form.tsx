import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertActivitySchema, type Activity } from "@/lib/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const categories = ["กิจกรรม", "พิธีการ", "สังสรรค์", "อื่นๆ"];

interface ActivityFormProps {
  activity?: Activity;
  onClose?: () => void;
}

export function ActivityForm({ activity, onClose }: ActivityFormProps) {
  const { toast } = useToast();
  const isEditing = !!activity;

  const form = useForm<Activity>({
    resolver: zodResolver(insertActivitySchema),
    defaultValues: activity || {
      title: "",
      description: "",
      eventDate: new Date().toISOString().split("T")[0],
      cohort: "",
      category: "กิจกรรม",
      imageUrl: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: Activity) => {
      if (isEditing) {
        return await apiRequest("PATCH", `/api/activities/${activity.id}`, data);
      } else {
        return await apiRequest("POST", "/api/activities", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({
        title: isEditing ? "แก้ไขสำเร็จ" : "เพิ่มสำเร็จ",
        description: isEditing
          ? "แก้ไขข้อมูลกิจกรรมเรียบร้อยแล้ว"
          : "เพิ่มกิจกรรมใหม่เรียบร้อยแล้ว",
      });
      form.reset();
      if (onClose) onClose();
    },
    onError: () => {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถบันทึกข้อมูลได้",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: Activity) => {
    mutation.mutate(data);
  };

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อกิจกรรม *</FormLabel>
              <FormControl>
                <Input placeholder="งานปฐมนิเทศน์รุ่น 65" {...field} data-testid="input-activity-title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>รายละเอียด</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="รายละเอียดกิจกรรม..."
                  className="resize-none"
                  rows={4}
                  {...field}
                  value={field.value || ""}
                  data-testid="input-activity-description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>วันที่จัดกิจกรรม *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} data-testid="input-activity-date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>หมวดหมู่ *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-activity-category">
                      <SelectValue placeholder="เลือกหมวดหมู่" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="cohort"
          render={({ field }) => (
            <FormItem>
              <FormLabel>รุ่นที่เกี่ยวข้อง</FormLabel>
              <FormControl>
                <Input placeholder="รุ่น 65" {...field} value={field.value || ""} data-testid="input-activity-cohort" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL รูปภาพกิจกรรม</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://example.com/activity.jpg"
                  {...field}
                  value={field.value || ""}
                  data-testid="input-activity-image"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={mutation.isPending}
            data-testid="button-submit-activity"
          >
            {mutation.isPending
              ? "กำลังบันทึก..."
              : isEditing
              ? "บันทึกการแก้ไข"
              : "เพิ่มกิจกรรม"}
          </Button>
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-activity">
              ยกเลิก
            </Button>
          )}
        </div>
      </form>
    </Form>
  );

  if (isEditing && onClose) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>แก้ไขข้อมูลกิจกรรม</DialogTitle>
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return formContent;
}
