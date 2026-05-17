import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MessageBubble from "../components/MessageBubble";
import ChatInput from "../components/ChatInput";
import LoadingDots from "../components/LoadingDots";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Spinner from "../components/Spinner";
import { fetchProfile } from "../services/auth.routes";
import toast from "react-hot-toast";
import {
  deleteChatAPI,
  fetchChatAPI,
  newChatAPI,
} from "../services/chat.routes";

type Chat = {
  _id: number;
  title: string;
  messages: { role: "user" | "assistant"; content: string }[];
};

export default function ChatPage() {
  useEffect(() => {
    document.title = "Chat - Smart Chaty";
  }, []);
  const navigate = useNavigate();

  const [active, setActive] = useState(1);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const [screenLoading, setScreenLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [chats, setChats] = useState<Chat[]>([]);

  const chat = chats?.length > 0 ? chats?.find((c) => c._id === active) : null;

  useEffect(() => {
    const fetchChats = async () => {
      if (!token) return;
      setScreenLoading(true);
      const response = await fetchChatAPI(token);
      if (response?.status === "success") {
        setChats(response.data || []);
        setScreenLoading(false);
      } else {
        setScreenLoading(false);
        toast.error(response?.message || "Please try again later");
      }
    };
    fetchChats();
  }, [token]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const msg = text;
    setText("");

    setChats((prev) =>
      prev.map((c) =>
        c._id === active
          ? {
              ...c,
              title: c.title === "New chat" ? msg.slice(0, 20) : c.title,
              messages: [...c.messages, { role: "user", content: msg }],
            }
          : c,
      ),
    );

    setLoading(true);

    setTimeout(() => {
      setChats((prev) =>
        prev.map((c) =>
          c._id === active
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  { role: "assistant", content: "Static AI response." },
                ],
              }
            : c,
        ),
      );
      setLoading(false);
    }, 800);
  };

  const deleteChat = async (id: string) => {
    const payload = {
      chatId: id,
    };
    if (!token) return;
    const response = await deleteChatAPI(token, payload);
    if (response?.status === "success") {
      setChats(response.data);
      setScreenLoading(false);
      toast.success(response.message);
    } else {
      setScreenLoading(false);
      toast.error(response?.message || "Please try again later");
    }
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      setScreenLoading(true);
      if (token) {
        const response = await fetchProfile(token);
        if (response?.status === "success") {
          navigate("/chat");
          setScreenLoading(false);
        } else {
          navigate("/");
          setScreenLoading(false);
        }
      } else {
        navigate("/");
        setScreenLoading(false);
      }
    };
    fetchProfileUser();
  }, [token, navigate]);

  const logoutUser = () => {
    setScreenLoading(true);
    sessionStorage.removeItem("token");
    navigate("/");
    setScreenLoading(false);
    toast.success("Logged Out Successfully");
  };

  const addNewChat = async () => {
    if (!token) return;
    setScreenLoading(true);
    const response = await newChatAPI(token);
    if (response?.status === "success") {
      setChats(response.data);
      setActive(response.data);
      setScreenLoading(false);
      toast.success(response.message);
    } else {
      setScreenLoading(false);
      toast.error(response?.message || "Please try again later");
    }
  };

  if (screenLoading) return <Spinner />;

  if (!token) return <Login />;

  return (
    <div className="h-screen flex bg-[#f8fafc] text-[#334155] overflow-hidden">
      <Sidebar
        chats={chats}
        active={active}
        onSelect={setActive}
        onDelete={deleteChat}
        onLogout={logoutUser}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        addNewChat={addNewChat}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#f8fafc]">
        {/* Sticky Mobile Header */}
        <header className="flex items-center justify-between px-4 py-3.5 bg-[#030C31] text-white border-b border-[#121b44]/60 md:hidden shrink-0 z-30 shadow-md shadow-indigo-950/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="Open Sidebar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <img
                src="/favicon.svg"
                alt="Smart Chaty Logo"
                className="w-7 h-7 drop-shadow-[0_0_8px_rgba(82,69,250,0.4)] animate-float"
              />
              <span className="font-extrabold text-md tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                Smart Chaty
              </span>
            </div>
          </div>

          <button
            onClick={logoutUser}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Logout"
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
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="font-bold text-slate-800 text-base">
              {chat?.title || "Chat"}
            </h2>
            <span className="text-[10px] uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold tracking-wider">
              Smart Session
            </span>
          </div>
        </header>

        {/* Message Workspace Area */}
        <div className="flex-1 overflow-y-auto bg-[#f8fafc] scrollbar-none">
          <div className="max-w-3xl mx-auto px-4 py-8 md:py-10 space-y-6">
            {chat?.messages.map((m, i) => (
              <MessageBubble key={i} {...m} />
            ))}

            {loading && <LoadingDots />}
          </div>
        </div>

        {/* Chat Input Area */}
        <ChatInput value={text} onChange={setText} onSubmit={send} />
      </main>
    </div>
  );
}
