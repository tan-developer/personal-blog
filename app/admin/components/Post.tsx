import Wrapper from "@/app/components/UI/Wrapper";
import { Post } from "@prisma/client";
import Image from "next/image";
import { format } from "date-fns";

interface Props {
  post: Post;
}

const Post: React.FC<Props> = ({ post }) => {
  return (
    <li
      className="
        h-fit
        w-full
        flex
        py-12
        font-sans
        items-center
      "
    >
      <Wrapper
        className="
        bg-gray-600/10
        rounded-lg
        w-fit
        h-fit
        p-3
      "
      >
        <Image
          className="aspect-auto"
          alt=""
          src={post.titleImage}
          height={96}
          width={128}
        />
      </Wrapper>

      <div
        className="
        ml-10
      "
      >
        <p className="break-before-avoid text-gray-500 ">{format(post.createdAt, "dd/MM/yyyy hh:mm")} & {post.desc}</p>
        <h1 className={'capitalize text-2xl font-bold'}>{post.title}</h1>
      </div>
    </li>
  );
};
export default Post;
