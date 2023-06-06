import { Suspense } from "react";
import Editor from "../../components/Editor";

export default async function Edit() {
  return (
      <Suspense>
        <Editor />
      </Suspense>
  );
}
