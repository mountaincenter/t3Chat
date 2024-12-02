"use client";

import React from "react";
import { SidebarMenuBadge } from "@/components/ui/sidebar";
import AvatarComponent from "./AvatarComponent";

import type { UserWithDetails } from "@/app/types";

interface AvatarListItemProps {
  user: UserWithDetails;
  subText: string | null; // サブ情報（例: メールアドレスまたはコンテンツ情報）
  badgeCount?: number; // バッジの件数（オプション）
  rightIcon?: React.ReactNode; // 右側アイコン（オプション）
  onClick?: () => void; // クリックイベント
  className?: string; // カスタムクラス
  subTextClassName?: string;
  isMobile?: boolean;
  isHeader?: boolean;
}

const AvatarItem: React.FC<AvatarListItemProps> = ({
  user,
  subText,
  rightIcon,
  onClick,
  className = "",
  subTextClassName = "",
  isMobile = false,
  isHeader = false,
}) => {
  if (isMobile || isHeader) {
    return (
      <button
        className={`flex items-center gap-4 p-2 ${className}`}
        onClick={onClick}
        aria-label={`User ${user.name}`}
      >
        <AvatarComponent entity={user} />
      </button>
    );
  }

  return (
    <button
      className={`flex w-full items-center gap-4 rounded-lg p-2 hover:bg-accent ${className}`}
      onClick={onClick}
      aria-label={`User ${user.name}`}
    >
      <AvatarComponent entity={user} />
      <div className="flex flex-1 flex-col overflow-hidden text-left">
        <span className="text-sm font-medium">{user.name}</span>
        <span
          className={`overflow-hidden text-ellipsis whitespace-nowrap text-xs text-muted-foreground ${subTextClassName}`}
        >
          {subText}
        </span>
      </div>
      {user.unreadCount !== undefined && user.unreadCount > 0 ? (
        <SidebarMenuBadge className="rounded-full bg-green-500">
          {user.unreadCount}
        </SidebarMenuBadge>
      ) : (
        <SidebarMenuBadge className="rounded-full bg-green-500">
          0
        </SidebarMenuBadge>
      )}
      {rightIcon && <div className="text-muted-foreground">{rightIcon}</div>}
    </button>
  );
};

export default AvatarItem;
