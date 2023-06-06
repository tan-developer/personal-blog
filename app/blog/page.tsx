import Prisma from "@prisma/client";
import getAllPostByPage from "../actions/getPostByPage";
import Header from "../components/UI/Header";
import { notFound } from "next/navigation";
import getPostLength from "@/app/actions/getPostLength";
import Posts from "./components/Posts";

const isPosts = (posts: Prisma.Post[] | []): posts is Prisma.Post[] => {
  return posts.length > 0;
};

const isNumber = (String: unknown): String is number => {
  return !isNaN(Number(String));
};

export default async function Home() {
  const posts = await getAllPostByPage({
    limit: 10,
    page: 1,
  });


  const count = await getPostLength();

  const next = 1 * 10 > count;
  return (
    <>
      <div className="">
        <Header desc="Exploring Code with an Intern" title="Writings" />

        {isPosts(posts) && (
          <Posts posts={posts}/>
        )}
        <div className="flex w-full justify-between py-10">
          <div className="">
            <button
              disabled={true}
              className="underline text-xl hover:text-main-blue transition-all disabled:text-gray-500 disabled:hover:text-gray-500"
            >
              Previous
            </button>
          </div>
          <div className="">
            <button
              disabled={next}
              className="underline text-xl hover:text-main-blue transition-all disabled:text-gray-500 disabled:hover:text-gray-500"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
