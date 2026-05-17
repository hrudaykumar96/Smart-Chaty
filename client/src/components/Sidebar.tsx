import ChatListItem from "./ChatListItem";

type Chat = {
  _id: number;
  title: string;
};

type Props = {
  chats: Chat[];
  active: number;
  onSelect: (_id: string) => void;
  onDelete: (_id: string) => void;
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  addNewChat: () => void;
};

const Sidebar = ({
  chats,
  active,
  onSelect,
  onDelete,
  onLogout,
  isOpen,
  onClose,
  addNewChat,
}: Props) => {
  return (
    <>
      {/* Mobile Sidebar Backdrop overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300 animate-fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-[#030C31] text-white border-r border-[#121b44]/60 z-50 flex flex-col transition-transform duration-300 transform md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:flex"
        }`}
      >
        {/* Logo / Brand Header */}
        <div className="p-4 border-b border-[#121b44]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/favicon.svg"
              alt="Logo"
              className="w-8 h-8 drop-shadow-[0_0_8px_rgba(82,69,250,0.4)] animate-float"
            />
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Smart Chaty
            </span>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            className="w-full bg-gradient-to-r from-[#5245FA] to-[#0F89F7] text-white py-2.5 rounded-xl text-sm font-bold cursor-pointer hover:brightness-110 active:scale-[0.98] shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
            onClick={addNewChat}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 4v16m8-8H4"
              />
            </svg>
            New chat
          </button>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1.5 scrollbar-none">
          {chats.map((c, index) => (
            <ChatListItem
              key={index}
              id={c._id}
              title={c.title}
              active={active === c._id}
              onSelect={() => {
                onSelect(c._id);
                if (onClose) onClose(); // Auto-close drawer on selection on mobile
              }}
              onDelete={onDelete}
            />
          ))}
        </div>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-[#121b44]/60">
          <button
            onClick={onLogout}
            className="w-full py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
