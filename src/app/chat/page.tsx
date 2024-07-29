"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../auth/firebase/firebase.js";
import { onAuthStateChanged, User } from "firebase/auth";

const Chat = () => {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ sender: string; message: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/welcome");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setChat([...chat, { sender: "user", message }]);
      setMessage("");
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Chatbot</h1>
      <div className="w-full max-w-2xl p-4 bg-white shadow-md rounded">
        <div className="flex flex-col space-y-2 mb-4">
          {chat.map((chatMessage, index) => (
            <p key={index} className="bg-gray-200 p-2 rounded">
              <strong>{chatMessage.sender}:</strong> {chatMessage.message}
            </p>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
