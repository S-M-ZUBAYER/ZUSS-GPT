import { useRef, useState, useEffect } from "react";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import Header from "../components/Header";
import { useChatHistory } from "../hooks/useChatHistory";
import CONSTANTS from "../constants";

const ChatPage = () => {
  const inputRef = useRef();
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useChatHistory();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  const handleSend = async () => {
    const question = inputRef.current?.value.trim();
    if (!question) return;

    inputRef.current.value = "";
    const newUserMessage = { role: "user", content: question };
    setLoading(true);

    try {
      const storedHistory = JSON.parse(
        localStorage.getItem(CONSTANTS.STORAGE.CHAT_HISTORY) || "[]"
      );
      const messagesToSend = [...storedHistory, newUserMessage];

      setChatHistory((prev) => [...prev, newUserMessage]);

      const response = await fetch(
        `${CONSTANTS.API.BASE_URL}${CONSTANTS.API.ENDPOINTS.CHAT}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: messagesToSend }),
        }
      );
      const data = await response.json();

      const aiMessage = {
        role: "assistant",
        content: data.answer,
        lang: data.lang,
      };
      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Error sending message." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div
          ref={chatContainerRef}
          className="bg-white rounded-2xl shadow-lg border p-6 mb-6 max-h-[60vh] min-h-[400px] overflow-y-auto"
        >
          {chatHistory.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))}
        </div>
        <ChatInput inputRef={inputRef} loading={loading} onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatPage;
