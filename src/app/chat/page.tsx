"use client";
import React, { useState } from "react";
import UserConversationArea from "../_components/Conversation/UserConversationArea";
import { useUserMutation } from "../hooks/useUserMutation";
import type { UserWithDetails } from "../types";
import { useSession } from "next-auth/react";
import { ChatSidebar } from "@/components/common/ChatSidebat";

const Page = () => {
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

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-muted-foreground">Loading user information...</p>
      </div>
    );
  }

  return (
    <>
      {selectedUser ? (
        <UserConversationArea
          conversationId={conversationId}
          user={user as UserWithDetails}
        />
      ) : (
        <div>
          <p>Select a user to start a conversation</p>
        </div>
      )}
    </>
  );
};

export default Page;
