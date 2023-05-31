"use client";
import { useSession } from "next-auth/react";
import Editor from "../components/Editor";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Wrapper from "@/app/components/UI/Wrapper";

import MDX from "@/app/components/UI/MDXWrapper";
import Display from "@/app/content/Display.mdx";

import { CodePen, Gist } from "mdx-embed";
export default function Post() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.back();
    }
  }, [status]);

  return (
    <MDX>
      <main className="max-w-2xl w-full mx-auto overflow-y-auto md:t-20 min-h-screen flex [&>*]:w-full flex-col">
        <Editor />
        <Wrapper className="p-3 border border-gray-700 rounded-md my-10">
          {/* @ts-expect-error Server Component */}
          <MDXRemote
            source={`# Hello World

      This is from Server Components!
      `}
          />
        </Wrapper>
      </main>
    </MDX>
  );
}
