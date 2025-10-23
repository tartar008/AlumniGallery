import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { insertMemberSchema, type Member } from "@/lib/schema";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formSchema = insertMemberSchema.extend({
  year: z.coerce.number().min(1900).max(2100),
});

type FormData = z.infer<typeof formSchema>;

interface MemberFormProps {
  member?: Member;
  onClose?: () => void;
}

export function MemberForm({ member, onClose }: MemberFormProps) {
  const { toast } = useToast();
  const isEditing = !!member;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: member || {
      name: "",
      nameEn: "",
      cohort: "",
      department: "",
      bio: "",
      profileImage: "",
      position: "",
      contactInfo: "",
      year: new Date().getFullYear(),
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (isEditing) {
        return await apiRequest("PATCH", `/api/members/${member.id}`, data);
      } else {
        return await apiRequest("POST", "/api/members", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/members"] });
      toast({
        title: isEditing ? "แก้ไขสำเร็จ" : "เพิ่มสำเร็จ",
        description: isEditing ? "แก้ไขข้อมูลสมาชิกเรียบร้อยแล้ว" : "เพิ่มสมาชิกใหม่เรียบร้อยแล้ว",
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

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อ-นามสกุล (ไทย) *</FormLabel>
                <FormControl>
                  <Input placeholder="นายสมชาย ใจดี" {...field} data-testid="input-member-name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nameEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อ-นามสกุล (อังกฤษ)</FormLabel>
                <FormControl>
                  <Input placeholder="Somchai Jaidee" {...field} value={field.value || ""} data-testid="input-member-name-en" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cohort"
            render={({ field }) => (
              <FormItem>
                <FormLabel>รุ่น *</FormLabel>
                <FormControl>
                  <Input placeholder="รุ่น 65" {...field} data-testid="input-member-cohort" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ปี (ค.ศ.) *</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="2023" {...field} data-testid="input-member-year" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>สาขา *</FormLabel>
                <FormControl>
                  <Input placeholder="วิทยาศาสตร์คอมพิวเตอร์" {...field} data-testid="input-member-department" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ตำแหน่ง</FormLabel>
                <FormControl>
                  <Input placeholder="นายก, หัวหน้าฝ่าย" {...field} value={field.value || ""} data-testid="input-member-position" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ประวัติ / Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="เกี่ยวกับตัวเอง..."
                  className="resize-none"
                  rows={3}
                  {...field}
                  value={field.value || ""}
                  data-testid="input-member-bio"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL รูปโปรไฟล์</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  {...field}
                  value={field.value || ""}
                  data-testid="input-member-image"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ข้อมูลติดต่อ</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com หรือ เบอร์โทร"
                  {...field}
                  value={field.value || ""}
                  data-testid="input-member-contact"
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
            data-testid="button-submit-member"
          >
            {mutation.isPending ? "กำลังบันทึก..." : isEditing ? "บันทึกการแก้ไข" : "เพิ่มสมาชิก"}
          </Button>
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-member">
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>แก้ไขข้อมูลสมาชิก</DialogTitle>
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    );
  }

  return formContent;
}
