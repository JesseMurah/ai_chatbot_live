// src/app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "./auth/firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/welcome");
      } else {
        router.push("/chat");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <p>Loading...</p>;
};

export default Home;
