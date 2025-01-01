import React from "react";

interface ConversationAreaProps {
  username: string;
}

const ConversationHeader: React.FC<ConversationAreaProps> = ({ username }) => {
  return (
    <header className="border-b p-4">
      <h2 className="text-lg font-semibold">{username}</h2>
    </header>
  );
};

export default ConversationHeader;
