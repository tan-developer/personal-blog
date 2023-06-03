import Prisma from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import getAllPostByPage from "../actions/getPostByPage";
import Post from "../admin/components/Post";

const isPosts = (posts: Prisma.Post[] | []): posts is Prisma.Post[] => {
  return posts.length > 0;
};

export default async function Home() {
  const posts = await getAllPostByPage({
    limit: 10,
    page: 1,
  });

  return (
    <main
      className=" 
    max-w-2xl w-full mx-auto overflow-y-auto md:pt-20 min-h-screen
    post px-6 pt-[230px] pb-20  lg:px-20

    "
    >
      <div className="">
        <h1 className="italic text-2xl text-gray-400">Writings</h1>

        <p className="font-sans mt-4 text-2xl font-medium tracking-tight text-gray-600 dark:text-gray-400 md:mt-0 md:text-6xl md:font-black md:text-black dark:md:text-white break-keep">
          {" "}
          Exploring Code with an Intern
        </p>

        {isPosts(posts) && (
          <ul className="
          flex flex-wrap
          w-full
          mt-10
          [&>*:not(:last-child)]:border-b-[.25px]
          [&>*:not(:last-child)]:border-gray-700/50
          ">
            {posts.map((post) => {
              return <Post post={post} key={post.id}/>;
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
