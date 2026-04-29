type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const ChatInput = ({ value, onChange, onSubmit }: Props) => {
  return (
    <div className="border-t border-[#e8ecf3] bg-[#f4f6fb]">
      <form onSubmit={onSubmit} className="max-w-3xl mx-auto p-4 flex gap-3">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Message..."
          className="flex-1 bg-white border border-[#e8ecf3] rounded-2xl px-4 py-3 text-sm outline-none focus:border-[#4f7cff] cursor-text"
        />

        <button className="bg-[#4f7cff] text-white px-5 rounded-2xl text-sm cursor-pointer hover:opacity-90">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInput;