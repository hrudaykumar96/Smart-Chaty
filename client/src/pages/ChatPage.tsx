import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MessageBubble from "../components/MessageBubble";
import ChatInput from "../components/ChatInput";
import LoadingDots from "../components/LoadingDots";

type Chat = {
  id: number;
  title: string;
  messages: { role: "user" | "assistant"; content: string }[];
};

export default function ChatPage() {
  useEffect(() => {
    document.title = "Chat - Smart Chaty";
  }, []);

  const [active, setActive] = useState(1);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="h-screen flex bg-[#f4f6fb] text-[#334155]">
      <Sidebar
        chats={chats}
        active={active}
        onSelect={setActive}
        onDelete={deleteChat}
        onLogout={() => location.reload()}
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
