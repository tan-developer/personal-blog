import { Suspense } from "react";
import Editor from "../../components/Editor";

export default async function Edit() {
  return (
    <main className="max-w-2xl w-full mx-auto overflow-y-auto md:pt-20 min-h-screen ">
      <Suspense>
        <Editor />
      </Suspense>
    </main>
  );
}
