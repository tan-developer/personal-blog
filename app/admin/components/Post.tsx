import Wrapper from "@/app/components/UI/Wrapper";
import { Post } from "@prisma/client";
import Image from "next/image";
import {format}  from 'date-fns'

interface Props {
  post: Post;
}

const Post: React.FC<Props> = ({ post }) => {
  return (
    <li
      className="
        h-36
        w-full
        mb-10
      "
    >
      <Wrapper
        className="
        w-full
        mb-6
        h-full
      "
      >
        <Image alt="" src={post.titleImage} height={144} width={144} />
      </Wrapper>
    </li>
  );
};
// {format(post.createdAt , "dd/MM/yyyy hh:mm")}
export default Post;
