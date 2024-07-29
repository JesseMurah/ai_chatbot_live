"use client";

import Link from "next/link";

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Chatbot App</h1>
      <div className="space-x-4">
        <Link href="/sign-up" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          <button>Sign Up</button>
        </Link>
        <Link href="/sign-in" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
          <button>Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
