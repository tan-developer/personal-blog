import Prisma from "@prisma/client";
import getAllPostByPage from "../../actions/getPostByPage";
import Post from "../../admin/components/Post";
import Header from "../../components/UI/Header";
import { GetServerSideProps } from "next";
import {notFound} from 'next/navigation'


const isPosts = (posts: Prisma.Post[] | []): posts is Prisma.Post[] => {
  return posts.length > 0;
};

const isNumber = (String : unknown) : String is number => {
  return !isNaN(Number(String))
}


export default async function Home(props : {
  params : {
    slug : string
  }
}) {
  const {params: {slug}}  = props

  if(!isNumber(slug)) {
    notFound();
  }

  const posts = await getAllPostByPage({
    limit: 10,
    page: Number(slug),
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


