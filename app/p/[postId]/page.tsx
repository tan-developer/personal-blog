import getAllPostById from "@/app/actions/getPostById";
import MDXWrapper from "@/app/components/UI/MDXWrapper";
import Wrapper from "@/app/components/UI/Wrapper";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";

const isString = (id: unknown): id is string => {
  return typeof id === "string";
};
const theme = `
  prose 
  prose-invert 
  prose-a:text-main-blue 
  prose-blockquote:font-base 
  prose-blockquote:italic 
  prose-blockquote:text-2xl 
  prose-img:w-full
`;

export default async function Home(props: any) {
  const {
    params: { postId },
  } = props;

  if (!isString(postId)) {
    notFound();
  }

  const post = await getAllPostById(postId);

  if (!post) {
    notFound();
  }
  const { title, desc, content, createdAt } = post;
  // console.log(content);
  return (
    <>
      <div className="font-sans">
        <h1 className="md:text-5xl text-3xl font-bold md:mb-24 mb-10 ">
          {title}
        </h1>
        <p className="text-sm text-gray-500">
          {format(createdAt, "eee yyyy MM dd")} , {desc}
        </p>
        <Image
          src={post.titleImage}
          alt=""
          width={100000000}
          height={1000000000}
        />

        <Wrapper className={`mt-20 ${theme}`}>
          <MDXWrapper source={content} />
        </Wrapper>
      </div>
    </>
  );
}
