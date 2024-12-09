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

const displayPathname = (pathname: string): string => {
  const mapping: Record<string, string> = {
    "/chat": "Chat",
  };
  return mapping[pathname] || pathname;
};

interface ChatSecondSidebarProps {
  pathname: string;
}

const users = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/avatars/john-doe.jpg",
    role: "Software Engineer",
    status: "Online",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "/avatars/jane-smith.jpg",
    role: "Product Manager",
    status: "Offline",
  },
  // Add more users as needed
];

const ChatSecondSidebar: React.FC<ChatSecondSidebarProps> = ({ pathname }) => {
  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-medium text-foreground">
            {pathname}
          </div>
          <Label className="flex items-center gap-2 text-sm">
            <span>Online</span>
            <Switch className="shadow-none" />
          </Label>
        </div>
        <SidebarInput placeholder="Search users..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            {users.map((user) => (
              <div
                key={user.email}
                className="flex items-center gap-3 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.role}
                  </span>
                </div>
                <div className="ml-auto flex flex-col items-end">
                  <span className="text-xs font-medium">{user.status}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatSecondSidebar;
