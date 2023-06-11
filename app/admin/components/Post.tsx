"use client";

import Wrapper from "@/app/components/UI/Wrapper";
import { Post } from "@prisma/client";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { toast } from "react-hot-toast";
import {AiFillDelete} from 'react-icons/ai'
import { useRouter  , usePathname} from "next/navigation";

interface Props {
  post: Post;
}

const Post: React.FC<Props> = ({ post }) => {
  const router = useRouter();

  const path = usePathname();


  const [state, setState] = useState<boolean>(false);

  const handlerDelete = (id: string): void => {
    const toastId = toast.loading("Deleting.....");
    axios
      .post("api/post/delete", {
        id: id,
      })
      .then(() => {
        toast.dismiss(toastId)
        toast("Post deleted !" , {
          icon : <AiFillDelete />
        })
        router.refresh();
      })
      .catch(() => {
        toast.dismiss(toastId)
        toast.error("Post doesn't exist !")
        router.refresh();
      })
  };

  return (
    <li
      className="
       
        relative
        group
      "
    >
      <Link
        href={`/p/${post.id}`}
        className=" h-fit
        w-full
        flex
        py-8
        font-sans
        items-center"
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

        <div className="ml-10 ">
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
      </Link>

      <div className={clsx("absolute bottom-0 flex  w-full justify-between group-hover:opacity-100 transition-all" ,!path.includes('/admin') && "hidden" )} >
        <a
          href={`/admin/edit/${post.id}`}
          className="text-main-blue hover:underline "
        >
          Edit
        </a>
        <a
          href="#"
          className={clsx(`text-main-blue hover:underline`, state && "hidden")}
          onClick={() => setState(true)}
        >
          Delete
        </a>
        <span className={clsx(`text-main-blue`, !state && "hidden")}>
          <span>Are you sure? : </span>
          <button
            className="hover:underline"
            onClick={() => handlerDelete(post.id)}
          >
            Yes
          </button>{" "}
          /{" "}
          <button className="hover:underline" onClick={() => setState(false)}>
            No
          </button>
        </span>
      </div>
    </li>
  );
};
export default Post;
