import Prisma from "@prisma/client";
import getAllPostByPage from "../../actions/getPostByPage";
import Post from "../../admin/components/Post";
import Header from "../../components/UI/Header";
import { GetServerSideProps } from "next";
import { notFound } from "next/navigation";
import getPostLength from "@/app/actions/getPostLength";
import Posts from "../components/Posts";

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

  const count = await getPostLength();

  const next = Number(slug) * 10 > count;
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
              disabled={!(slug - 1 > 0)}
              className="underline text-xl hover:text-main-blue transition-all disabled:text-gray-500 disabled:hover:text-gray-500">
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
