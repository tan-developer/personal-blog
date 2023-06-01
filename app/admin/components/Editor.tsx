"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

import React, { useContext } from "react";
import { commands, ICommand, EditorContext } from "@uiw/react-md-editor";
import { FieldValues, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Input from "@/app/components/UI/Input";
import UpLoad from "./Upload";
import { useRouter } from "next/navigation";
import Wrapper from "@/app/components/UI/Wrapper";
import MDXRender from "./MD/MDXRender";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

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
    if (status === "unauthenticated" || status === "loading") {
      router.push("/admin");
    }
  }, [status]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      (async () => {

        const {props : {source}} = await getSerialize(value)


        await setPreview(source)
      })();
    }, 700);

    return () => clearTimeout(timeout);
  }, [value]);

  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      header: "",
      desc: "",
      author: data?.user?.name,
      content: ``,
    },
  });
  return (
    <div className="">
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
            <UpLoad />
            <MDEditor
              value={value}
              preview="edit"
              extraCommands={[codePreview, commands.fullscreen]}
              height={500}
              onChange={(val) => {
                setValueMd(val!);
                setValue("content", val!);
              }}
            />
          </>
        )}
      </div>

      <Wrapper className="p-3 border border-gray-700 rounded-md my-10">
        {previewValue && <MDXRender source={previewValue} />}
      </Wrapper>
    </div>
  );
};

export async function getSerialize(data: string) {
  const source = data;
  const mdxSource = await serialize(source, {
    mdxOptions: {
      development: process.env.NODE_ENV === "development",
    },
  });
  return { props: { source: mdxSource } };
}

export default Editor;
