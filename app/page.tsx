"use client";

import { useState, CSSProperties } from "react";
import { PulseLoader } from "react-spinners";

type Message = {
  role: "user" | "developer";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([{ role: 'developer', content: 'Hey bestie!! It’s your girl Beth, the pink queen of the blockchain! Ready to chat about the future of finance?'}]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const userMessage: Message = { role: "user", content: input };
    const updatedMessages: Message[] = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
  
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages }),
    });
  
    const data: { reply: Message } = await res.json(); // typed reply
    setMessages([...updatedMessages, data.reply]);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-[600px] px-6 pt-2 text-center">
      <div className="flex justify-center">
          <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 sm:size-6">
                  <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
              </svg>
          </span>
          <a href="https://bethonsolana.com" className="text-sm sm:text-base">Take me back to bethonsolana.com</a>
      </div>    

      <div className="p-6 max-w-2xl mx-auto">
        <div className="pt-3 pb-4 text-7xl md:text-9xl font-black max-w-[600px]">
          Beth AI
        </div>
        <div className="border p-4 rounded-md h-[60vh] overflow-y-auto bg-white shadow border-2 border-black">
          {messages.map((m, i) => (
            <div key={i} className={`mb-3 ${m.role === "user" ? "text-right" : "text-left"}`}>
              <p className={`inline-block p-2 rounded ${m.role === "user" ? "bg-blue-200" : "bg-gray-100"}`}>
                {m.content}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            className="flex-1 p-2 border rounded border-2 border-black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
          />
          <button 
            onClick={sendMessage} 
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded border-2 border-black"
            disabled={loading}>
              {!loading ? 'Flirt' : ''}

              <PulseLoader
                color="#ffffff"
                loading={loading}
                size={5}
                aria-label="Loading Spinner"
                data-testid="loader"
              />               
          </button>
        </div>
      </div>
    </div>
  );
}
