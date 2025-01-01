interface ConversationDateProps {
  date: string;
}

const ConversationDate = ({ date }: ConversationDateProps) => (
  <div className="my-4 flex items-center justify-center">
    <div className="rounded-full bg-gray-300 px-4 py-1 text-sm text-gray-700">
      {date}
    </div>
  </div>
);

export default ConversationDate;
