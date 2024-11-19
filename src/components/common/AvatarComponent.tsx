"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
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

  return (
    <Avatar className={`h-8 w-8 ${className}`}>
      {" "}
      {imageUrl && <AvatarImage src={imageUrl} alt="Entity Avatar" />}
    </Avatar>
  );
};

export default AvatarComponent;
