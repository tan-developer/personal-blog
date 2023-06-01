import Editor from "../components/Editor";
import { Post } from "@prisma/client";

export default async function Post() {

  return (
    <main className="max-w-2xl w-full mx-auto overflow-y-auto md:t-20 min-h-screen md:pt-20 flex [&>*]:w-full flex-col">
      <Editor />

      
    </main>
  );
  1;
}
