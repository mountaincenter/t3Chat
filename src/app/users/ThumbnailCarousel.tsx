import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ThumbnailCarouselProps {
  images: string[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

export function ThumbnailCarousel({
  images,
  selectedIndex,
  setSelectedIndex,
}: ThumbnailCarouselProps) {
  return (
    <Carousel className="mx-auto w-full max-w-3xl">
      <CarouselContent className="-ml-1">
        {images.map((src, index) => (
          <CarouselItem key={index} className="basis-1/5 pl-1">
            <div
              className={`cursor-pointer p-1 ${selectedIndex === index ? "border-2 border-primary" : ""}`}
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={src}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={75}
                className="h-auto w-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
