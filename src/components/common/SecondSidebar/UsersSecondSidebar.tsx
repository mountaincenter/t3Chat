import React from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarInput,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { useUserMutation } from "@/app/hooks/useUserMutation";

import { useChatStore } from "@/store/useChatStore";
import type { UserWithDetails } from "@/app/types";

// 表示用のパス名に変換する関数
const displayPathname = (pathname: string): string => {
  const mapping: Record<string, string> = {
    "/users": "Users",
  };

  return mapping[pathname] ?? pathname;
};

interface UsersSecondSidebarProps {
  pathname: string;
}

const UsersSecondSidebar: React.FC<UsersSecondSidebarProps> = ({
  pathname,
}) => {
  const { users } = useUserMutation();
  const { selectedUser, setSelectedUser } = useChatStore();

  const handleUserSelect = (user: UserWithDetails) => {
    try {
      setSelectedUser(user);
    } catch (error) {
      console.error("Failed to create conversation", error);
    }
  };

  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="truncate text-base font-medium text-foreground">
            {displayPathname(pathname)}
          </div>
          <Label className="flex shrink-0 items-center gap-2 text-sm">
            <span>Online</span>
            <Switch className="shadow-none" />
          </Label>
        </div>
        <SidebarInput placeholder="Search users..." />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            {users ? (
              users.map((user) => {
                const isSelected = user.id === selectedUser?.id;

                return (
                  <div
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    className={`flex cursor-pointer items-start gap-4 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      isSelected
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : ""
                    }`}
                  >
                    <Avatar className="h-10 w-10 shrink-0">
                      {user.image && user.name ? (
                        <AvatarImage src={user.image} alt={user.name} />
                      ) : (
                        <AvatarFallback>
                          {user.name?.slice(0, 2).toUpperCase() ?? "??"}
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <div className="flex flex-1 flex-col space-y-1 overflow-hidden">
                      <span className="truncate font-medium text-foreground">
                        {user.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user.role}
                      </span>
                      <span className="line-clamp-2 break-words text-xs text-muted-foreground">
                        Example long text: test test test test test test test
                        stes tes tset test tst testetsetset
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4">Users not found</div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default UsersSecondSidebar;
