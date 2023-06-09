import { Suspense } from "react";
import Editor from "../../components/Editor";
import getAllPostById from "@/app/actions/getPostById";
import { Post } from "@prisma/client";
import getSession from "@/app/actions/getSession";
import { notFound } from "next/navigation";

export default async function Edit(props : any) {

  const postId = props.params.postId

  const session = await getSession()

  const post : Post | null = await getAllPostById(postId)

  if (!post) {
    return notFound();
  }
  return (
      <Suspense>
        <Editor post={post!}/>
      </Suspense>
  );
}
