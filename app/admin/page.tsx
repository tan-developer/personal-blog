import getCurrentUser from "../actions/getCurrentUser";
import AuthForm from "./components/AuthForm";
import Post from "./components/Post";
import User from "./components/User";
import getAllPost from "@/app/actions/getAllPost";
import Prisma from "@prisma/client";

export default async function Admin() {
  const user = await getCurrentUser();


  const listPost: (Post & {})[] = await getAllPost();

  return (
    <>
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
    </>
  );
}
