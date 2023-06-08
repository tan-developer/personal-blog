import Prisma from "@prisma/client";
import getAllPostByPage from "../../actions/getPostByPage";
import Header from "../../components/UI/Header";
import { notFound } from "next/navigation";
import getPostLength from "@/app/actions/getPostLength";
import Posts from "../components/Posts";
import axios from "axios";
import clsx from "clsx";

const isPosts = (posts: Prisma.Post[] | []): posts is Prisma.Post[] => {
  return posts.length > 0;
};

const isNumber = (String: unknown): String is number => {
  return !isNaN(Number(String));
};

export default async function Home(props: {
  params: {
    slug: string;
  };
}) {
  
  const {
    params: { slug },
  } = props;

  if (!isNumber(slug)) {
    notFound();
  }

  const posts = await getAllPostByPage({
    limit: 10,
    page: Number(slug),
  });


  if (posts.length === 0) {
    notFound();
  }
  const count = await getPostLength();

  const next = Number(slug) * 10 > count;
  return (
    <>
      <div className="">
        <Header desc="Exploring Code with an Intern" title="Writings" />

        {isPosts(posts) && (
          <Posts posts={posts}/> // client component
        )}
        <div className="flex w-full justify-between py-10">
          <div className="">
          <a
              href={`/blog/${Number(slug) - 1}`}
              className={clsx(
                `underline text-xl hover:text-main-blue transition-all cursor-pointer`,
                Number(slug) <= 1 && 'pointer-events-none text-gray-500'
              )}
            >
              Previous
            </a>
          </div>
          <div className="">
            <a
              href={`/blog/${slug + 1}`}
              className={clsx(
                `underline text-xl hover:text-main-blue transition-all cursor-pointer`,
                next && 'pointer-events-none text-gray-500'
              )}
            >
              Next
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
