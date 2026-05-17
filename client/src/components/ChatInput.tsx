type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const ChatInput = ({ value, onChange, onSubmit }: Props) => {
  return (
    <div className="border-t border-slate-100 bg-white px-4 py-4 md:py-5 shrink-0 z-20">
      <form onSubmit={onSubmit} className="max-w-3xl mx-auto flex gap-2.5 items-center">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0F89F7] focus:ring-4 focus:ring-[#0F89F7]/5 rounded-2xl px-4 py-3.5 text-sm outline-none transition-all duration-200 cursor-text placeholder-slate-400 text-slate-700"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-[#5245FA] to-[#0F89F7] text-white font-bold px-5 py-3.5 rounded-2xl text-sm cursor-pointer hover:brightness-110 active:scale-[0.97] transition-all flex items-center justify-center shadow-md shadow-[#5245FA]/15 shrink-0"
        >
          <span className="hidden sm:inline mr-1">Send</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;