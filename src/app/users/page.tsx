"use client";
import React, { useState } from "react";
import UserConversationArea from "../_components/Conversation/UserConversationArea";
import { useUserMutation } from "../hooks/useUserMutation";
import type { UserWithDetails } from "../types";
import { useSession } from "next-auth/react";
import UserList from "../_components/Lists/UserList";

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
    <div className="flex h-screen w-full">
      <div className="w-1/4 border-r py-4">
        {users && (
          <UserList
            users={users}
            onSelectUser={handleSelectUser}
            session={session}
          />
        )}
      </div>
      <div className="w-3/4 p-4">
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
