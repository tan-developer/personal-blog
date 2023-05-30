"use client";

import { SessionProvider } from "next-auth/react";
import AuthForm from "./components/AuthForm";

export default function Admin() {
  return (
    <main className="max-w-2xl w-full mx-auto overflow-y-auto md:pt-20 min-h-screen ">
      <SessionProvider>
        <AuthForm />
      </SessionProvider>
    </main>
  );
}
