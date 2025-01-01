"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { User } from "@prisma/client";

interface AvatarComponentProps {
  entity: User;
  className?: string;
}

const AvatarComponent: React.FC<AvatarComponentProps> = ({
  entity,
  className,
}) => {
  const imageUrl = entity.image;
  const fallbackText = entity.name?.charAt(0).toUpperCase() ?? "?";

  return (
    <Avatar className={` ${className}`}>
      {imageUrl && <AvatarImage src={imageUrl} alt="Entity Avatar" />}
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
