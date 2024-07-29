"use client";

import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "./auth/firebase/firebase";
import "./globals.css";

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        router.push("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (user === null) {
    return <p>Loading...</p>;
  }

  return (
    <html lang="en">
      <head>
        <title>Chatbot App</title>
        <meta name="description" content="A simple chatbot app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
