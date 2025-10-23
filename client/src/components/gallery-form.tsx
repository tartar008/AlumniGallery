import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertGallerySchema, type Gallery } from "@shared/schema";
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

interface GalleryFormProps {
  gallery?: Gallery;
  onClose?: () => void;
}

export function GalleryForm({ gallery, onClose }: GalleryFormProps) {
  const { toast } = useToast();
  const isEditing = !!gallery;

  const form = useForm<Gallery>({
    resolver: zodResolver(insertGallerySchema),
    defaultValues: gallery || {
      imageUrl: "",
      title: "",
      description: "",
      eventDate: "",
      cohort: "",
      category: "",
      activityId: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: Gallery) => {
      if (isEditing) {
        return await apiRequest("PATCH", `/api/galleries/${gallery.id}`, data);
      } else {
        return await apiRequest("POST", "/api/galleries", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/galleries"] });
      toast({
        title: isEditing ? "แก้ไขสำเร็จ" : "เพิ่มสำเร็จ",
        description: isEditing
          ? "แก้ไขข้อมูลภาพเรียบร้อยแล้ว"
          : "เพิ่มภาพลงแกลเลอรีเรียบร้อยแล้ว",
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

  const onSubmit = (data: Gallery) => {
    mutation.mutate(data);
  };

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL รูปภาพ *</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  {...field}
                  data-testid="input-gallery-image"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อภาพ</FormLabel>
              <FormControl>
                <Input
                  placeholder="ชื่อภาพหรือกิจกรรม"
                  {...field}
                  value={field.value || ""}
                  data-testid="input-gallery-title"
                />
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
              <FormLabel>คำอธิบาย</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="คำอธิบายภาพ..."
                  className="resize-none"
                  rows={3}
                  {...field}
                  value={field.value || ""}
                  data-testid="input-gallery-description"
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
                <FormLabel>วันที่ถ่ายภาพ</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value || ""}
                    data-testid="input-gallery-date"
                  />
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
                <FormLabel>หมวดหมู่</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || undefined}
                >
                  <FormControl>
                    <SelectTrigger data-testid="select-gallery-category">
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
                <Input
                  placeholder="รุ่น 65"
                  {...field}
                  value={field.value || ""}
                  data-testid="input-gallery-cohort"
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
            data-testid="button-submit-gallery"
          >
            {mutation.isPending ? "กำลังบันทึก..." : isEditing ? "บันทึกการแก้ไข" : "เพิ่มภาพ"}
          </Button>
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-gallery">
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
            <DialogTitle>แก้ไขข้อมูลภาพ</DialogTitle>
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return formContent;
}
