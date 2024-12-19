import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

interface MainCarouselProps {
  images: string[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

export function MainCarousel({
  images,
  selectedIndex,
  setSelectedIndex,
}: MainCarouselProps) {
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (!api) return;
    api.scrollTo(selectedIndex);
  }, [api, selectedIndex]);

  const handleNext = () => {
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  return (
    <Carousel setApi={setApi} className="mx-auto w-full max-w-3xl">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="flex aspect-video items-center justify-center p-6">
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                width={800}
                height={600}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious onClick={handlePrevious} />
      <CarouselNext onClick={handleNext} />
    </Carousel>
  );
}
