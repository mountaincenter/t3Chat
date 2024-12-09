import React, { useState } from "react";
import UserItem from "./UserItem";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUserConversationMutation } from "@/hooks/useUserConversationMutation";
import type { UserWithDetails } from "@/app/types";
import type { Session } from "next-auth";

interface UserListProps {
  users: UserWithDetails[];
  onSelectUser: (conversatonId: string, user: UserWithDetails) => void;
  session: Session | null;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onSelectUser,
  session,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { createUserConversation } = useUserConversationMutation();

  const handleUserClick = async (user: UserWithDetails) => {
    if (!session?.user?.id) return;
    let conversationId = user.conversations?.[0]?.id;
    if (!conversationId) {
      // 会話が存在しない場合には新たに作成
      const newConversation = await createUserConversation(
        session.user.id,
        user.id,
      );
      conversationId = newConversation?.id ?? "";
    }
    onSelectUser(conversationId, user);
  };

  const filteredUsers = users?.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex w-full flex-col">
      <div className="border-b p-4">
        <div className="relative mt-4">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <div className="w-full overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <Alert className="mt-4">
            <AlertTitle>No Results</AlertTitle>
            <AlertDescription>No users found...</AlertDescription>
          </Alert>
        ) : (
          <>
            {filteredUsers.map((user) => (
              <SidebarMenuItem
                key={user.id}
                onClick={() => handleUserClick(user)}
                className="flex w-full cursor-pointer items-center overflow-hidden border-b p-4 hover:bg-accent"
              >
                <SidebarMenuButton asChild>
                  <UserItem user={user} />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UserList;
