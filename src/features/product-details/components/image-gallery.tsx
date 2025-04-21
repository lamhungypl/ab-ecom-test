'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react';
import { useState } from 'react';

import ImageWithFallback from '@/features/base/components/image-with-fallback';
import { Button } from '@/features/base/components/ui/button';
import { Dialog, DialogClose, DialogContent } from '@/features/base/components/ui/dialog';

interface ImageGalleryProps {
  discount?: number;
  images: string[];
}

export function ImageGallery({ images, discount }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const openPreview = (index: number) => {
    setPreviewIndex(index);
    setPreviewOpen(true);
  };

  const nextImage = () => {
    setPreviewIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setPreviewIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="relative h-80 w-full">
          <ImageWithFallback
            src={images[selectedImage] || '/placeholder.svg'}
            alt="Product"
            className="h-80 w-full cursor-pointer rounded-lg object-contain"
            onClick={() => openPreview(selectedImage)}
            fill
          />
        </div>
        {discount && (
          <div className="absolute left-4 top-4 rounded-md bg-yellow-400 px-3 py-1 text-sm font-medium text-black">
            {discount}% Off
          </div>
        )}
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-4 rounded-full bg-white"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`flex-shrink-0 ${selectedImage === index ? 'ring-2 ring-green-500' : 'opacity-70'}`}
            onClick={() => setSelectedImage(index)}
          >
            <ImageWithFallback
              src={image || '/placeholder.svg'}
              alt={`Product thumbnail ${index + 1}`}
              className="h-20 w-20 rounded-md object-cover"
              width={80}
              height={80}
            />
          </button>
        ))}
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-screen-lg border-none bg-transparent p-0">
          <VisuallyHidden>
            <DialogTitle></DialogTitle>
          </VisuallyHidden>
          <div className="relative flex h-full w-full items-center justify-center">
            <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-1 text-white hover:bg-black/70">
              <X className="h-6 w-6" />
            </DialogClose>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full border-none bg-black/50 text-white hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="flex h-full w-full items-center justify-center">
              <ImageWithFallback
                src={images[previewIndex] || '/placeholder.svg'}
                alt="Product preview"
                className="max-h-[80vh] max-w-full rounded-lg object-contain"
                width={600}
                height={600}
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full border-none bg-black/50 text-white hover:bg-black/70"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
