"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarInput,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Trash2,
  Image,
  Film,
  FileText,
  Mic,
  MoreVertical,
  Download,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const files = [
  {
    id: 1,
    name: "vacation_photo.jpg",
    type: "image",
    size: "2.3 MB",
    modified: "2 hours ago",
    icon: Image,
  },
  {
    id: 2,
    name: "project_presentation.pdf",
    type: "text",
    size: "4.1 MB",
    modified: "Yesterday",
    icon: FileText,
  },
  {
    id: 3,
    name: "family_video.mp4",
    type: "movie",
    size: "234.5 MB",
    modified: "3 days ago",
    icon: Film,
  },
  {
    id: 4,
    name: "voice_memo.m4a",
    type: "voice",
    size: "1.2 MB",
    modified: "1 week ago",
    icon: Mic,
  },
  {
    id: 5,
    name: "screenshot.png",
    type: "image",
    size: "567 KB",
    modified: "2 weeks ago",
    icon: Image,
  },
];

// 表示用のパス名に変換する関数
const displayPathname = (pathname: string): string => {
  const mapping: Record<string, string> = {
    "/files": "Files",
  };
  return mapping[pathname] || pathname;
};

interface FilesSecondSidebarProps {
  pathname: string;
}

const FilesSecondSidebar: React.FC<FilesSecondSidebarProps> = ({
  pathname,
}) => {
  // `activeFiles` を useState で管理
  const [activeFiles, setActiveFiles] = useState(files);

  return (
    <Sidebar collapsible="none" className="hidden flex-1 md:flex">
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-medium text-foreground">
            {displayPathname(pathname)}
          </div>
          <Label className="flex items-center gap-2 text-sm">
            <span>List view</span>
            <Switch className="shadow-none" />
          </Label>
        </div>
        <SidebarInput placeholder="Search files..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            {activeFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <file.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex flex-grow flex-col overflow-hidden">
                  <span className="truncate font-medium">{file.name}</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">
                      {file.size}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {file.modified}
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-md p-2 hover:bg-muted">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      <span>Download</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default FilesSecondSidebar;
