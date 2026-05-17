type Props = {
  role: "user" | "assistant";
  content: string;
};

const MessageBubble = ({ role, content }: Props) => {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
      <div
        className={`text-sm leading-relaxed px-4.5 py-3 rounded-2xl max-w-[85%] md:max-w-[75%] transition-all duration-200 ${
          role === "user"
            ? "bg-gradient-to-r from-[#5245FA] to-[#0F89F7] text-white rounded-tr-none shadow-md shadow-[#5245FA]/15"
            : "bg-white border border-[#e8ecf3] text-[#334155] rounded-tl-none shadow-xs"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default MessageBubble;