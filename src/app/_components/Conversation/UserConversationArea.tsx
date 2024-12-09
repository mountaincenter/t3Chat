import React from "react";
import type { UserWithDetails } from "@/app/types";

interface UserConversationAreaProps {
  conversationId: string;
  user: UserWithDetails;
}

const UserConversationArea: React.FC<UserConversationAreaProps> = ({
  conversationId,
  user,
}) => {
  return (
    <div>
      <div>UserConversationArea</div>
      <div>{user.name}</div>
      <div>{conversationId}</div>
    </div>
  );
};

export default UserConversationArea;
