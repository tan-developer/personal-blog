"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

import React from "react";
import { commands, ICommand } from "@uiw/react-md-editor";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/UI/Input";
import UpLoad from "./Upload";
import Wrapper from "@/app/components/UI/Wrapper";
import MDXRender from "./MD/MDXRender";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import rehypeHighlight from "rehype-highlight";
import { BsFillSendFill } from "react-icons/bs";
import { toast } from "react-hot-toast";

import { BiError } from "react-icons/bi";
import axios from "axios";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";

const codePreview: ICommand = {
  name: "preview",
  keyCommand: "preview",
  value: "preview",
};

export const theme = `
  prose 
  prose-invert 
  prose-a:text-main-blue 
  prose-blockquote:font-base 
  prose-blockquote:italic 
  prose-blockquote:text-2xl 
  prose-img:w-full
`;
interface IEditor {
  post?: Post;
}

const isPost = (post: Post | any): post is Post => {
  return post.title !== '';
};

enum STATUS {
  NEW_POST,
  EDIT,
}

const Editor: React.FC<IEditor> = ({
  post = {
    title: "",
    content: "",
    desc: "",
    id: "",
    rawContent: "",
    titleImage: "",
  },
}) => {
  const Status = useRef(isPost(post) ? STATUS.EDIT : STATUS.NEW_POST);
  const { title, content, titleImage, desc, rawContent , id } = post!;

  const router = useRouter()

  const [value, setValueMd] = React.useState(rawContent);
  const [previewValue, setPreview] =
    React.useState<
      MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
    >();


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
      header: title,
      desc: desc,
      content: JSON.parse(JSON.parse(content)),
      imageUrl: titleImage,
      rawContent: rawContent,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!data.target) {
      console.log(data)
      if (
        data.header &&
        data.header.length > 10 &&
        data.imageUrl &&
        data.imageUrl.startsWith("https://res.cloudinary.com/")
      ) {
        // All conditions are met
        switch (Status.current) {
          case STATUS.EDIT:
            const toastId_1 = toast.loading("Updating...");
            axios
              .post("/api/post/edit", {
                ...data,
                id : id
              })
              .then(() => {
                toast.dismiss(toastId_1);
                toast.success("Update Post Successfully 🚀");
                axios.get(
                  `/api/revalidate?path=/blog&access_token=13406433cecd2567fd0f03571bee1362`
                );
              })
              .then(() => {
                router.push(`/p/${id}`)
              })
              .catch(() => {
                toast.dismiss(toastId);
                toast.error("Something is wrong . Please reload the page 😵");
              });
            break;
          case STATUS.NEW_POST:
            const toastId = toast.loading("Posting...");
            axios
              .post("/api/post", {
                ...data,
              })
              .then(() => {
                toast.dismiss(toastId);
                toast.success("Upload Post Successfully 🚀");
                axios.get(
                  `/api/revalidate?path=/blog&access_token=13406433cecd2567fd0f03571bee1362`
                );
              })
              .then((data) => {
                
              })
              .catch(() => {
                toast.dismiss(toastId);
                toast.error("Something is wrong . Please reload the page 😵");
              });
            break;

          default:
            break;
        }
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
          toast("Please upload and choose the image before post  !", {
            duration: 1000,
            icon: <BiError />,
          });
        }
      }
    }
  };
  console.log(Status);

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="container" data-color-mode="dark">
        <>
          <Suspense fallback={<>Loading</>}>
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
          </Suspense>
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
                setValue("rawContent", val!);

                setValue(
                  "content",
                  JSON.stringify(
                    await getSerialize(value!.replace(/\\n/g, "\\"))
                  )
                );
              })();
            }}
          />
        </>

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
          <h2 className="ml-2">{Status.current === STATUS.EDIT ? "Save" : "Send"}</h2>
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
            className={`
              mx-auto
              my-10
              prose
              prose-invert 
              font-sans 
              w-full
              prose-img:w-full
              ${theme}
            `}
          >
            {previewValue && <MDXRender source={previewValue} />}
          </main>
        </Wrapper>
      </div>
    </form>
  );
};

// Formatting part
async function getSerialize(data: string) {
  const source = data;
  const mdxSource = await serialize(source, {
    mdxOptions: {
      rehypePlugins: [rehypeHighlight],
    },
  });
  return { props: { source: mdxSource } };
}

export default Editor;
