import getCurrentUser from "../actions/getCurrentUser";
import getSession from "../actions/getSession";
import AuthForm from "./components/AuthForm";
import Post from "./components/Post";
import User from "./components/User";
import getAllPost from "@/app/actions/getAllPost";
import Prisma from "@prisma/client";

export default async function Admin() {
  const user = await getCurrentUser();
  const server = await getSession();


  const listPost: (Post & {})[] = await getAllPost();

  return (
    <main className="max-w-2xl w-full mx-auto overflow-y-auto md:pt-20 min-h-screen ">
      <AuthForm />
      {user && (
        <>
          <User user={user}/>

          <ul
            className="
          flex flex-wrap
          w-full
          mt-10
          [&>*:not(:last-child)]:border-b-[.25px]
          [&>*:not(:last-child)]:border-gray-700/50
        "
          >
            {listPost.map((post: Prisma.Post) => (
              <Post post={post} />
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
