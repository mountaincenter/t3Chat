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
  return <div>UserConversationArea</div>;
};

export default UserConversationArea;
