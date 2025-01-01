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
  className = "",
  subTextClassName = "",
  isMobile,
}) => {
  console.log("AvatarItem isMobile", isMobile);
  if (!isMobile) {
    return <AvatarComponent entity={user} />;
  }

  return (
    <>
      <AvatarComponent entity={user} className={className} />
      <div className="flex flex-1 flex-col overflow-hidden text-left">
        <span className="text-sm font-medium">{user.name}</span>
        <span
          className={`overflow-hidden text-ellipsis whitespace-nowrap text-xs text-muted-foreground ${subTextClassName}`}
        >
          {subText}
        </span>
      </div>
      {user.unreadCount !== undefined && user.unreadCount > 0 && (
        <SidebarMenuBadge className="rounded-full bg-green-500">
          {user.unreadCount}
        </SidebarMenuBadge>
      )}
      {rightIcon && <div className="text-muted-foreground">{rightIcon}</div>}
    </>
  );
};

export default AvatarItem;
