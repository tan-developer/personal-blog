"use client";
import Editor from "../components/Editor";

export default async function Post() {
  
  return (
    <main className="max-w-2xl w-full mx-auto overflow-y-auto md:t-20 min-h-screen flex [&>*]:w-full flex-col">
      <Editor />
    </main>
  );
}
