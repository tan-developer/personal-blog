import Prisma from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import getAllPostByPage from "../actions/getPostByPage";
import Post from "../admin/components/Post";
import Header from "../components/UI/Header";


import { useParams } from 'next/navigation';

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
        <Header desc="Exploring Code with an Intern" title="Writings"/>

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
