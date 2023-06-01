
import AuthForm from "./components/AuthForm";
import Post from "./components/Post";
import User from "./components/User";
import getAllPost from "@/app/actions/getAllPost";
import Prisma from "@prisma/client";

export default async  function Admin() {

  const listPost: (Post & {})[] = await getAllPost();

  return (
    <main className="max-w-2xl w-full mx-auto overflow-y-auto md:pt-20 min-h-screen ">
        <AuthForm />
        <User />

        <ul className="
          flex flex-wrap
          w-full
          mt-10
          [&>*:not(:first-child)]:border-t-[.25px]
          [&>*:not(:first-child)]:border-gray-700/50
          [&>*:not(:first-child)]:pt-10
        ">
        {listPost.map((post : Prisma.Post) => (
          <Post post={post}/>
      ))}
        </ul>
    </main>
  );
}
