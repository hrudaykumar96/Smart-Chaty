type Props = {
  id: number;
  title: string;
  active: boolean;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
};

const ChatListItem = ({ id, title, active, onSelect, onDelete }: Props) => {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm cursor-pointer transition-all duration-200 border-l-3 ${
        active
          ? "bg-[#5245FA]/15 text-[#02D3F8] font-bold border-[#02D3F8] shadow-xs"
          : "text-slate-300 hover:bg-white/[0.04] hover:text-white border-transparent"
      }`}
    >
      <span className="truncate flex-1 pr-2">{title}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className="opacity-0 group-hover:opacity-100 text-xs text-slate-400 hover:text-red-400 hover:bg-white/10 p-1 rounded-md transition-all cursor-pointer flex items-center justify-center size-5 shrink-0"
        title="Delete chat"
      >
        ✕
      </button>
    </div>
  );
};

export default ChatListItem;