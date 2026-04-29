type Props = {
  role: "user" | "assistant";
  content: string;
};

const MessageBubble = ({ role, content }: Props) => {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`text-sm leading-relaxed px-4 py-3 rounded-2xl max-w-[80%] shadow-sm ${
          role === "user"
            ? "bg-[#4f7cff] text-white"
            : "bg-white border border-[#e8ecf3] text-[#475569]"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default MessageBubble;