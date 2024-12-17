import { Paperclip, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConversationFooterProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ConversationFooter = ({
  message,
  onMessageChange,
  onSendMessage,
  onFileChange,
}: ConversationFooterProps) => (
  <footer className="flex items-center border-t bg-gray-800 px-4 py-2">
    <label htmlFor="file-upload" className="mr-2 cursor-pointer">
      <Paperclip className="h-6 w-6 text-gray-400" />
    </label>
    <input
      id="file-upload"
      type="file"
      className="hidden"
      accept="image/*"
      onChange={onFileChange}
    />

    <textarea
      value={message}
      onChange={(e) => onMessageChange(e.target.value)}
      placeholder="メッセージを入力"
      rows={2}
      className="flex-1 resize-none rounded-md bg-gray-700 p-2 text-white"
    />
    <Button
      type="button"
      size="icon"
      onClick={onSendMessage}
      className="ml-2 bg-blue-500 hover:bg-blue-600"
    >
      <SendHorizontal className="h-5 w-5 text-white" />
    </Button>
  </footer>
);

export default ConversationFooter;
