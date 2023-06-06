import Wrapper from "@/app/components/UI/Wrapper";
import { Post } from "@prisma/client";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  post: Post;
}

const Post: React.FC<Props> = ({ post }) => {
  return (
    <Link href={`/p/${post.id}`}>
      <li
        className="
        h-fit
        w-full
        flex
        py-8
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
        p-[3px]
      "
        >
          <Image
            className="aspect-auto"
            alt=""
            src={post.titleImage}
            height={80}
            width={106}
          />
        </Wrapper>

        <div
          className="
        ml-10
      "
        >
          <p className="break-before-avoid text-gray-500 text-sm md:text-base">
            {format(post.createdAt, "dd/MM/yyyy hh:mm")} & {post.desc}
          </p>
          <p
            className={
              "capitalize md:text-2xl font-bold text-xl w-52 md:w-[20rem] overflow-hidden  text-ellipsis"
            }
          >
            {post.title}{" "}
          </p>
        </div>
      </li>
    </Link>
  );
};
export default Post;
