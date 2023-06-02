"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

import React from "react";
import { commands, ICommand } from "@uiw/react-md-editor";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Input from "@/app/components/UI/Input";
import UpLoad from "./Upload";
import { useRouter } from "next/navigation";
import Wrapper from "@/app/components/UI/Wrapper";
import MDXRender from "./MD/MDXRender";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import rehypeHighlight from "rehype-highlight";
import { BsFillSendFill } from "react-icons/bs";
import { toast } from "react-hot-toast";

import { BiError } from "react-icons/bi";
import axios from "axios";

const codePreview: ICommand = {
  name: "preview",
  keyCommand: "preview",
  value: "preview",
};

const Editor: React.FC = ({}) => {
  const [value, setValueMd] = React.useState("");
  const [previewValue, setPreview] =
    React.useState<
      MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
    >();

  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // if (status === "unauthenticated" || status === "loading") {
    //   router.push("/admin");
    // }
  }, [status]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      (async () => {
        const {
          props: { source },
        } = await getSerialize(value.replace(/\\n/g, "\\"));


        await setPreview(source);
      })();
    }, 700);

    return () => clearTimeout(timeout);
  }, [value]);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      header: "",
      desc: "",
      author: data?.user?.email,
      content: ``,
      imageUrl: ``,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!data.target) {
      if (
        data.header &&
        data.header.length > 10 &&
        data.imageUrl &&
        data.imageUrl.startsWith("https://res.cloudinary.com/")
      ) {
        // All conditions are met
        const toastId = toast.loading("Posting...");
        axios
          .post("/api/post", {
            ...data,
          })
          .then(() => {
            toast.dismiss(toastId)
            toast.success("Upload Post Successfully 🚀")
          })
          .catch(() => {
            toast.dismiss(toastId)
            toast.error("Something is wrong . Please reload the page 😵")
          })
          ;
      } else {
        // Notify user about the failed condition(s)
        if (!data.header || data.header.length <= 10) {
          toast("Header should have more than 10 characters", {
            duration: 1000,
            icon: <BiError />,
          });
        }
        if (
          !data.imageUrl ||
          !data.imageUrl.startsWith("https://res.cloudinary.com/")
        ) {
          toast("Please upload the image before use it !", {
            duration: 1000,
            icon: <BiError />,
          });
        }
      }
    }
  };

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="container" data-color-mode="dark">
        {status === "authenticated" && (
          <>
            <Input
              register={register}
              errors={errors}
              id="header"
              label="Header :"
            />
            <Input
              register={register}
              errors={errors}
              id="desc"
              label="Description :"
            />
            <Input
              register={register}
              errors={errors}
              id="imageUrl"
              label="Thumbnail :"
            />
            <UpLoad />
            <MDEditor
              aria-atomic={true}
              className="text-lg"
              value={value}
              preview="edit"
              extraCommands={[codePreview, commands.fullscreen]}
              height={500}
              onChange={(val) => {
                setValueMd(val!);
                (async () => {
                  setValue(
                    "content",
                    await getSerialize(val!.replace(/\\n/g, "\\"))
                  );
                })();
              }}
            />
          </>
        )}

        <button
          onClick={onSubmit}
          className="s
            bg-black 
            hover:bg-gray-950/80 
            rounded-md 
            transition 
            border-gray-700
            border
            flex
            text-center
            justify-center
            items-center
            py-2
            px-3
            font-sans
            mt-10
            mb-4

        "
        >
          <BsFillSendFill size={20} />
          <h2 className="ml-2">Send</h2>
        </button>

        <h1
          className="
        my-10
        text-2xl
        font-sans
        text-gray-400
      "
        >
          Preview :{" "}
        </h1>

        <Wrapper
          className="
        w-full 
        border 
        flex
        border-gray-700
        px-2
        py-4
        my-10
        rounded-lg

      "
        >
          <main
            className="
              mx-auto
              my-10
              prose
              prose-invert 
              font-sans 
              w-full
              prose-img:w-full
          "
          >
            {previewValue && <MDXRender source={previewValue} />}
          </main>
        </Wrapper>
      </div>
    </form>
  );
};

export async function getSerialize(data: string) {
  const source = data;
  const mdxSource = await serialize(source, {
    mdxOptions: {
      development: process.env.NODE_ENV === "development",
      rehypePlugins: [rehypeHighlight],
    },
  });
  return { props: { source: mdxSource } };
}

export default Editor;
