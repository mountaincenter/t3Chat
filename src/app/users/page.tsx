"use client";

import { useChatStore } from "@/store/useChatStore";

const Page = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex h-[calc(100vh-60px)] w-full flex-col">
      <h1>{selectedUser?.name}</h1>
    </div>
  );
};

export default Page;
