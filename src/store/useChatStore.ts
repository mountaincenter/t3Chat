import { create } from "zustand";
import type { UserWithDetails } from "@/app/types";

interface ChatStoreState {
  selectedUser: UserWithDetails | null;
  conversationId: string;
  setSelectedUser: (user: UserWithDetails | null) => void;
  setConversationId: (id: string) => void;
}

export const useChatStore = create<ChatStoreState>((set) => ({
  selectedUser: null,
  conversationId: "",
  setSelectedUser: (user) => set({ selectedUser: user }),
  setConversationId: (id) => set({ conversationId: id }),
}));
