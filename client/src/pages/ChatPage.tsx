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

type Chat = {
  id: number;
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

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      title: "New chat",
      messages: [{ role: "assistant", content: "Hi 👋 Ask me anything." }],
    },
  ]);

  const chat = chats.find((c) => c.id === active);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const msg = text;
    setText("");

    setChats((prev) =>
      prev.map((c) =>
        c.id === active
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
          c.id === active
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

  const deleteChat = (id: number) => {
    const updated = chats.filter((c) => c.id !== id);
    setChats(updated);
    if (active === id && updated.length) setActive(updated[0].id);
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      setScreenLoading(true);
      if (token) {
        const response: any = await fetchProfile(token);
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
  }, [token]);

  const logoutUser = () => {
    setScreenLoading(true);
    sessionStorage.removeItem("token");
    navigate("/");
    setScreenLoading(false);
    toast.success("Logged Out Successfully");
  };

  if (screenLoading) return <Spinner />;

  if (!token) return <Login />;

  return (
    <div className="h-screen flex bg-[#f4f6fb] text-[#334155]">
      <Sidebar
        chats={chats}
        active={active}
        onSelect={setActive}
        onDelete={deleteChat}
        onLogout={logoutUser}
      />

      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
            {chat?.messages.map((m, i) => (
              <MessageBubble key={i} {...m} />
            ))}

            {loading && <LoadingDots />}
          </div>
        </div>

        <ChatInput value={text} onChange={setText} onSubmit={send} />
      </main>
    </div>
  );
}
