"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import type { UserWithDetails } from "@/app/types";

export const useUserMutation = () => {
  const { data: session } = useSession();
  const [usersWithUnread, setUsersWithUnread] = useState<UserWithDetails[]>([]);

  // 現在のユーザー情報を取得するクエリ
  const {
    data: user,
    isLoading: isUserLoading,
    refetch: refetchUser,
  } = api.user.getUserById.useQuery(undefined, {
    enabled: !!session?.user?.id,
  });

  // 自分以外のユーザーリストを取得するクエリ
  const {
    data: users,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = api.user.listUserExcludingSelf.useQuery(undefined, {
    enabled: !!session?.user?.id,
  });

  const isLoading = isUserLoading || isUsersLoading;

  return {
    user,
    users,
    refetchUser,
    refetchUsers,
    isLoading,
  };
};
