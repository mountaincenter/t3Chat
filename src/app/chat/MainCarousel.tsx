import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useRef } from "react";

interface MainCarouselProps {
  images: string[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>; // 型を明確に指定
}

export function MainCarousel({
  images,
  selectedIndex,
  setSelectedIndex,
}: MainCarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const items = carousel.querySelectorAll("[data-carousel-item]");

    if (items[selectedIndex]) {
      (items[selectedIndex] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [selectedIndex]);

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setSelectedIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true, // Enable looping
      }}
      className="relative mx-auto w-full max-w-3xl"
      ref={carouselRef}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index} data-carousel-item>
            <div className="flex items-center justify-center p-6">
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                width={800}
                height={600}
                className="max-h-full max-w-full rounded-lg object-contain"
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
