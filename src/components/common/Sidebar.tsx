"use client";

import React, { useState } from "react";
import { Home } from "lucide-react";
import Link from "next/link";

import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import LoginAvatar from "./LoginAvatar";

import { useSession } from "next-auth/react";
import { useUserMutation } from "@/hooks/useUserMutation";
import UserList from "@/app/_components/Lists/UserList";
import { UserWithDetails } from "@/app/types";

import UserItem from "@/app/_components/Lists/UserItem";

const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  const { users, user } = useUserMutation();
  const [selectedUser, setSelectedUser] = useState<UserWithDetails | null>(
    null,
  );
  const [conversationId, setConversationId] = useState<string>("");

  const handleSelectUser = (convId: string, user: UserWithDetails) => {
    setSelectedUser(user);
    setConversationId(convId);
  };

  return (
    <UISidebar className="hidden lg:flex lg:flex-col">
      <SidebarHeader className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-5 w-5 text-muted-foreground hover:text-primary" />
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-muted-foreground">
              My App
            </h2>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="w-full overflow-hidden">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div>
          <SidebarMenu className="w-full">
            {users && (
              <UserList
                users={users}
                session={session}
                onSelectUser={handleSelectUser}
              />
            )}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <LoginAvatar />
      </SidebarFooter>
    </UISidebar>
  );
};

export default Sidebar;
