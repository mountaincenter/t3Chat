"use client";

import AvatarComponent from "@/components/common/AvatarComponent";
import type { UserWithDetails } from "@/app/types";

interface UserItemProps {
  user: UserWithDetails;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <div className="flex w-full cursor-pointer items-center space-x-4 p-4 hover:bg-accent">
      <div className="relative">
        <AvatarComponent entity={user} />
      </div>
      <div className="flex-1">
        <h2 className="flex-sm">{user.name}</h2>
      </div>
      {user.unreadCount && user.unreadCount > 0 ? (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-sm text-white">
          {user.unreadCount}
        </div>
      ) : null}
    </div>
  );
};

export default UserItem;
