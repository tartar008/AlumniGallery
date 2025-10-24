import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [, navigate] = useLocation();

  useEffect(() => {
    // ✅ ให้ redirect ไป "/" ทันที เหมือนคลิกปุ่ม <Link href="/" />
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold font-mono text-muted-foreground mb-4">404</h1>
        <h2 className="text-3xl font-serif font-bold mb-4">ไม่พบหน้าที่คุณต้องการ</h2>
        <p className="text-muted-foreground mb-8">
          หน้าที่คุณกำลังมองหาอาจถูกย้าย ลบ หรือไม่มีอยู่จริง
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button data-testid="button-home">
              <Home className="w-4 h-4 mr-2" />
              กลับหน้าแรก
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            ย้อนกลับ
          </Button>
        </div>
      </div>
    </div>
  );
}
