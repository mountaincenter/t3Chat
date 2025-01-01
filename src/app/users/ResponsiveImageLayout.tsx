import Image from "next/image";

interface ResponsiveImageLayoutProps {
  images: string[];
}

export default function ResponsiveImageLayout({
  images,
}: ResponsiveImageLayoutProps) {
  if (images.length === 0) return null;

  return (
    <div className="relative grid h-[300px] w-full gap-1">
      <div className={`grid ${getGridClass(images.length)}`}>
        {images.map((src, index) => (
          <div
            key={index}
            className={`relative ${getImageClass(images.length, index)}`}
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 600px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function getGridClass(count: number): string {
  switch (count) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2";
    case 3:
    case 4:
      return "grid-cols-2 grid-rows-2";
    default:
      return "grid-cols-2 grid-rows-2";
  }
}

function getImageClass(count: number, index: number): string {
  if (count === 3 && index === 0) {
    return "col-span-2";
  }
  return "";
}
