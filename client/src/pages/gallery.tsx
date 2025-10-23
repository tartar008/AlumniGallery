import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
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
import type { Gallery } from "@shared/schema";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCohort, setSelectedCohort] = useState<string>("all");
  const [lightboxImage, setLightboxImage] = useState<Gallery | null>(null);

  const { data: galleries = [], isLoading } = useQuery<Gallery[]>({
    queryKey: ["/api/galleries"],
  });

  // Get unique categories and cohorts
  const categories = Array.from(
    new Set(galleries.filter((g) => g.category).map((g) => g.category!))
  ).sort();
  const cohorts = Array.from(
    new Set(galleries.filter((g) => g.cohort).map((g) => g.cohort!))
  ).sort((a, b) => b.localeCompare(a));

  // Filter galleries
  const filteredGalleries = galleries.filter((gallery) => {
    const matchesCategory =
      selectedCategory === "all" || gallery.category === selectedCategory;
    const matchesCohort = selectedCohort === "all" || gallery.cohort === selectedCohort;
    return matchesCategory && matchesCohort;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">แกลเลอรีภาพ</h1>
          <p className="text-muted-foreground text-lg">
            ภาพกิจกรรมและความทรงจำทั้งหมด
          </p>
        </div>

        {/* Filters */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm py-4 mb-8 border-b">
          <div className="flex flex-wrap gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48" data-testid="select-category-filter">
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
              <SelectTrigger className="w-48" data-testid="select-cohort-filter-gallery">
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

        {/* Gallery Grid - Masonry Layout */}
        {isLoading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="mb-4 break-inside-avoid">
                <div className="aspect-square bg-muted rounded-md animate-pulse" />
              </div>
            ))}
          </div>
        ) : filteredGalleries.length === 0 ? (
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
                className="mb-4 break-inside-avoid group cursor-pointer"
                onClick={() => setLightboxImage(gallery)}
                data-testid={`image-gallery-${gallery.id}`}
              >
                <div className="relative overflow-hidden rounded-md hover-elevate active-elevate-2">
                  <img
                    src={gallery.imageUrl}
                    alt={gallery.title || "Gallery image"}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {gallery.title && (
                        <p className="text-white font-semibold text-sm mb-1">
                          {gallery.title}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {gallery.category && (
                          <Badge variant="secondary" className="text-xs">
                            {gallery.category}
                          </Badge>
                        )}
                        {gallery.cohort && (
                          <Badge variant="outline" className="text-xs text-white border-white">
                            {gallery.cohort}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Dialog */}
        <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
          <DialogContent className="max-w-4xl p-0">
            {lightboxImage && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-50 bg-background/80 backdrop-blur-sm"
                  onClick={() => setLightboxImage(null)}
                  data-testid="button-close-lightbox"
                >
                  <X className="w-4 h-4" />
                </Button>
                <div className="relative">
                  <img
                    src={lightboxImage.imageUrl}
                    alt={lightboxImage.title || "Gallery image"}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                </div>
                <div className="p-6">
                  <DialogHeader>
                    <DialogTitle data-testid="text-lightbox-title">
                      {lightboxImage.title || "ภาพกิจกรรม"}
                    </DialogTitle>
                  </DialogHeader>
                  {lightboxImage.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {lightboxImage.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {lightboxImage.category && (
                      <Badge variant="secondary">{lightboxImage.category}</Badge>
                    )}
                    {lightboxImage.cohort && (
                      <Badge variant="outline">{lightboxImage.cohort}</Badge>
                    )}
                    {lightboxImage.eventDate && (
                      <Badge variant="outline">
                        {new Date(lightboxImage.eventDate).toLocaleDateString("th-TH", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Badge>
                    )}
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
