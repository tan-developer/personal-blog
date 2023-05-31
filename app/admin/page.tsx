
import { SessionProvider } from "next-auth/react";
import AuthForm from "./components/AuthForm";
import User from "./components/User";

export default function Admin() {
  return (
    <main className="max-w-2xl w-full mx-auto overflow-y-auto md:pt-20 min-h-screen ">
        <AuthForm />
        <User />
    </main>
  );
}
