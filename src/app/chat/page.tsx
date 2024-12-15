"use client";
import React from "react";
import UserConversationArea from "../_components/Conversation/UserConversationArea";
import { useUserMutation } from "../hooks/useUserMutation";
import type { UserWithDetails } from "../types";

import { useChatStore } from "@/store/useChatStore";

const Page = () => {
  const { user } = useUserMutation();
  const { selectedUser, conversationId } = useChatStore();

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-muted-foreground">Loading user information...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full">
      <div className="p-4">
        {selectedUser ? (
          <UserConversationArea
            conversationId={conversationId}
            user={user as UserWithDetails} // 型を明示的に指定
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">
              Select a user to start a conversation
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
