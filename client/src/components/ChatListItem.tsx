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
      className={`group flex items-center justify-between px-3 py-2 rounded-xl text-sm cursor-pointer transition ${
        active ? "bg-[#eef3ff] text-[#4f7cff]" : "hover:bg-[#f6f8fc]"
      }`}
    >
      <span className="truncate">{title}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className="opacity-0 group-hover:opacity-100 text-xs text-red-400 hover:text-red-500 cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
};

export default ChatListItem;