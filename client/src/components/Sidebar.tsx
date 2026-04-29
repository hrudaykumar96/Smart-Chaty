import ChatListItem from "./ChatListItem";

type Chat = {
  id: number;
  title: string;
};

type Props = {
  chats: Chat[];
  active: number;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onLogout: () => void;
};

const Sidebar = ({ chats, active, onSelect, onDelete, onLogout }: Props) => {
  return (
    <aside className="w-64 bg-white border-r border-[#e8ecf3] hidden md:flex flex-col">

      <div className="p-3">
        <button className="w-full bg-[#4f7cff] text-white py-2 rounded-xl text-sm cursor-pointer hover:opacity-90">
          + New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {chats.map((c) => (
          <ChatListItem
            key={c.id}
            id={c.id}
            title={c.title}
            active={active === c.id}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className="p-3 border-t border-[#e8ecf3]">
        <button
          onClick={onLogout}
          className="w-full py-2 rounded-xl text-sm border border-[#e8ecf3] hover:bg-[#f6f8fc] cursor-pointer"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;