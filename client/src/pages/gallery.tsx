import { useState, useMemo } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ✅ mock data — รูปภาพทั้งหมดอยู่ใน public/images/gallery/
const imageFiles = [
  "Photo_001.jpeg", "Photo_001.jpg", "Photo_002.jpeg", "Photo_002.jpg", "Photo_003.jpeg", "Photo_003.jpg", "Photo_004.jpeg", "Photo_004.jpg", "Photo_005.jpeg", "Photo_005.jpg",
  "Photo_006.jpeg", "Photo_006.jpg", "Photo_007.jpeg", "Photo_007.jpg", "Photo_008.jpeg", "Photo_008.jpg", "Photo_009.jpeg", "Photo_009.jpg", "Photo_010.jpeg", "Photo_010.jpg",
  "Photo_011.jpeg", "Photo_011.jpg", "Photo_012.jpeg", "Photo_012.jpg", "Photo_013.jpeg", "Photo_013.jpg", "Photo_014.jpeg", "Photo_014.jpg", "Photo_015.jpeg", "Photo_015.jpg",
  "Photo_016.jpeg", "Photo_016.jpg", "Photo_017.jpeg", "Photo_017.jpg", "Photo_018.jpeg", "Photo_018.jpg", "Photo_019.jpeg", "Photo_019.jpg", "Photo_020.jpeg", "Photo_020.jpg",
  "Photo_021.jpeg", "Photo_021.jpg", "Photo_022.jpeg", "Photo_022.jpg", "Photo_023.jpeg", "Photo_023.jpg", "Photo_024.jpeg", "Photo_024.jpg", "Photo_025.jpeg", "Photo_025.jpg",
  "Photo_026.jpeg", "Photo_026.jpg", "Photo_027.jpeg", "Photo_027.jpg", "Photo_028.jpg", "Photo_028.PNG", "Photo_029.jpg", "Photo_029.PNG", "Photo_030.jpg", "Photo_030.PNG",
  "Photo_031.jpg", "Photo_031.PNG", "Photo_032.jpg", "Photo_032.PNG", "Photo_033.jpg", "Photo_033.PNG", "Photo_034.jpg", "Photo_034.PNG", "Photo_035.jpg", "Photo_035.PNG",
  "Photo_036.jpg", "Photo_036.PNG", "Photo_037.jpg", "Photo_037.PNG", "Photo_038.jpg", "Photo_038.PNG", "Photo_039.jpg", "Photo_039.PNG", "Photo_040.jpg", "Photo_040.PNG",
  "Photo_041.jpg", "Photo_041.PNG", "Photo_042.jpg", "Photo_042.PNG", "Photo_043.jpg", "Photo_043.PNG", "Photo_044.jpg", "Photo_044.PNG", "Photo_045.jpg", "Photo_045.PNG",
  "Photo_046.jpg", "Photo_046.PNG", "Photo_047.jpg", "Photo_047.PNG", "Photo_048.jpg", "Photo_048.PNG", "Photo_049.jpg", "Photo_049.PNG", "Photo_050.GIF", "Photo_050.jpg",
  "Photo_051.GIF", "Photo_051.jpg", "Photo_052.GIF", "Photo_052.jpg", "Photo_053.jpg", "Photo_053.PNG", "Photo_054.jpg", "Photo_054.PNG", "Photo_055.jpg", "Photo_055.PNG",
  "Photo_056.jpg", "Photo_056.PNG", "Photo_057.jpg", "Photo_057.PNG", "Photo_058.jpg", "Photo_058.PNG", "Photo_059.jpg", "Photo_059.PNG", "Photo_060.jpg", "Photo_060.PNG",
  "Photo_061.jpg", "Photo_061.PNG", "Photo_062.jpg", "Photo_062.PNG", "Photo_063.jpg", "Photo_063.PNG", "Photo_064.jpg", "Photo_064.PNG", "Photo_065.jpg", "Photo_065.PNG",
  "Photo_066.jpg", "Photo_066.PNG", "Photo_067.jpg", "Photo_067.PNG", "Photo_068.jpg", "Photo_068.PNG", "Photo_069.jpg", "Photo_069.PNG", "Photo_070.jpg", "Photo_070.PNG",
  "Photo_071.jpg", "Photo_071.PNG", "Photo_072.jpg", "Photo_072.PNG", "Photo_073.jpg", "Photo_073.PNG", "Photo_074.jpg", "Photo_074.PNG", "Photo_075.jpg", "Photo_075.PNG",
  "Photo_076.jpg", "Photo_076.PNG", "Photo_077.jpg", "Photo_077.PNG", "Photo_078.jpg", "Photo_078.PNG", "Photo_079.jpg", "Photo_079.PNG", "Photo_080.jpg", "Photo_080.PNG",
  "Photo_081.jpg", "Photo_081.PNG", "Photo_082.jpg", "Photo_082.PNG", "Photo_083.jpg", "Photo_083.PNG", "Photo_084.jpg", "Photo_084.PNG", "Photo_085.jpg", "Photo_085.PNG",
  "Photo_086.jpg", "Photo_086.PNG", "Photo_087.jpg", "Photo_087.PNG", "Photo_088.jpg", "Photo_088.PNG", "Photo_089.jpg", "Photo_089.PNG", "Photo_090.jpg", "Photo_090.PNG",
  "Photo_091.jpg", "Photo_091.PNG", "Photo_092.jpg", "Photo_092.PNG", "Photo_093.jpg", "Photo_093.PNG", "Photo_094.jpg", "Photo_094.PNG", "Photo_095.jpg", "Photo_095.PNG",
  "Photo_096.jpg", "Photo_096.PNG", "Photo_097.jpg", "Photo_097.PNG", "Photo_098.jpg", "Photo_098.PNG", "Photo_099.jpg", "Photo_099.PNG", "Photo_100.jpg", "Photo_100.PNG",
  "Photo_101.jpg", "Photo_101.PNG", "Photo_102.jpg", "Photo_102.PNG", "Photo_103.jpg", "Photo_103.PNG", "Photo_104.jpg", "Photo_104.PNG", "Photo_105.jpg", "Photo_105.PNG",
  "Photo_106.jpg", "Photo_106.png", "Photo_107.jpg", "Photo_108.jpg", "Photo_109.jpg", "Photo_110.jpg", "Photo_111.JPG", "Photo_112.JPG", "Photo_113.JPG", "Photo_114.JPG",
  "Photo_115.JPG", "Photo_116.JPG", "Photo_117.JPG", "Photo_118.JPG", "Photo_119.JPG", "Photo_120.JPG", "Photo_121.jpg", "Photo_122.JPG", "Photo_123.JPG", "Photo_124.JPG",
  "Photo_125.JPG", "Photo_126.jpg", "Photo_127.JPG", "Photo_128.jpg", "Photo_129.JPG", "Photo_130.JPG", "Photo_131.JPG", "Photo_132.JPG", "Photo_133.JPG", "Photo_134.JPG",
  "Photo_135.JPG", "Photo_136.JPG", "Photo_137.JPG", "Photo_138.JPG", "Photo_139.JPG", "Photo_140.JPG", "Photo_141.JPG", "Photo_142.JPG", "Photo_143.JPG", "Photo_156.JPG",
  "Photo_157.JPG", "Photo_158.JPG", "Photo_159.JPG", "Photo_160.JPG", "Photo_161.jpg", "Photo_162.JPG", "Photo_163.JPG", "Photo_164.JPG", "Photo_165.JPG", "Photo_166.JPG",
  "Photo_167.JPG", "Photo_168.JPG", "Photo_169.JPG", "Photo_170.JPG", "Photo_171.JPG", "Photo_172.JPG", "Photo_173.JPG", "Photo_174.JPG", "Photo_175.JPG", "Photo_176.JPG",
  "Photo_177.JPG", "Photo_178.JPG", "Photo_179.JPG", "Photo_180.JPG", "Photo_181.JPG", "Photo_182.JPG", "Photo_183.JPG", "Photo_184.JPG", "Photo_185.JPG", "Photo_186.JPG",
  "Photo_187.JPG", "Photo_188.JPG", "Photo_189.JPG", "Photo_190.JPG", "Photo_191.jpg"
];

// ✅ สร้างข้อมูลจำลอง
const sampleGalleries = imageFiles.map((file, index) => ({
  id: index + 1,
  imageUrl: `/images/gallery/${file}`,
  title: `กิจกรรมที่ ${index + 1}`,
  category: index < 50 ? "กิจกรรมชมรม" : "งานนิทรรศการ",
  cohort: "ICT 18",
  description: "ภาพกิจกรรมของนักศึกษาสาขา ICT รุ่นที่ 18",
  eventDate: new Date(2025, 0, index + 1).toISOString(),
}));

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCohort, setSelectedCohort] = useState<string>("all");
  const [lightboxImage, setLightboxImage] = useState<any | null>(null);

  // ✅ ใช้ข้อมูลจำลองแทน useQuery
  const galleries = sampleGalleries;

  // ✅ unique filters
  const categories = useMemo(
    () => Array.from(new Set(galleries.map((g) => g.category))),
    [galleries]
  );
  const cohorts = useMemo(
    () => Array.from(new Set(galleries.map((g) => g.cohort))).sort((a, b) => b.localeCompare(a)),
    [galleries]
  );

  // ✅ filter
  const filteredGalleries = galleries.filter((gallery) => {
    const matchesCategory =
      selectedCategory === "all" || gallery.category === selectedCategory;
    const matchesCohort =
      selectedCohort === "all" || gallery.cohort === selectedCohort;
    return matchesCategory && matchesCohort;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            แกลเลอรีภาพ
          </h1>
          <p className="text-muted-foreground text-lg">
            ภาพกิจกรรมและความทรงจำทั้งหมดของนักศึกษา
          </p>
        </div>

        {/* Filters */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm py-4 mb-8 border-b">
          <div className="flex flex-wrap gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="เลือกหมวดหมู่" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกหมวดหมู่</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCohort} onValueChange={setSelectedCohort}>
              <SelectTrigger className="w-48">
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
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            แสดง {filteredGalleries.length} จาก {galleries.length} ภาพ
          </p>
        </div>

        {/* ✅ Gallery Grid */}
        {filteredGalleries.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">ไม่พบภาพ</h3>
            <p className="text-muted-foreground">ลองเปลี่ยนตัวกรอง</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {filteredGalleries.map((gallery) => (
              <div
                key={gallery.id}
                className="mb-4 break-inside-avoid group cursor-pointer overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                onClick={() => setLightboxImage(gallery)}
              >
                <div className="relative w-full overflow-hidden rounded-xl">
                  <img
                    src={gallery.imageUrl}
                    alt={gallery.title}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-medium text-sm mb-1 truncate">
                        {gallery.title}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {gallery.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs text-white border-white">
                          {gallery.cohort}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Lightbox Dialog */}
        <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
          <DialogContent className="max-w-4xl p-0">
            {lightboxImage && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-50 bg-background/80 backdrop-blur-sm"
                  onClick={() => setLightboxImage(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
                <img
                  src={lightboxImage.imageUrl}
                  alt={lightboxImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="p-6">
                  <DialogHeader>
                    <DialogTitle>{lightboxImage.title}</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-muted-foreground mt-2">
                    {lightboxImage.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary">{lightboxImage.category}</Badge>
                    <Badge variant="outline">{lightboxImage.cohort}</Badge>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
