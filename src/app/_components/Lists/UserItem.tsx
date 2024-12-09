"use client";

import type { UserWithDetails } from "@/app/types";
import AvatarItem from "@/components/common/AvatarItem";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

interface UserItemProps {
  user: UserWithDetails;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <AvatarItem
      user={user}
      subText="test test test test test test test "
      subTextClassName="mr-8"
    />
  );
};

export default UserItem;
