"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

import React, { useContext } from "react";
import { commands, ICommand, EditorContext } from "@uiw/react-md-editor";
import { FieldValues, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Input from "@/app/components/UI/Input";
import UpLoad from "./Upload";

const codePreview: ICommand = {
  name: "preview",
  keyCommand: "preview",
  value: "preview",
};

const Editor: React.FC = () => {
  const {data} = useSession()
  const [value, setValueMd] = React.useState("**Hello world!!!**");
  const {watch , setValue , register , formState : {errors}} = useForm<FieldValues>({
    defaultValues : {
      header : "",
      desc : "",
      author : data?.user?.name,
      content : ``
    }
  });



  return (
    <div className="container" data-color-mode="dark">
      <Input register={register} errors={errors} id="header" label="Header :" />
      <Input register={register} errors={errors} id="desc" label="Description :" />
      <UpLoad />
      <MDEditor
        value={value}
        preview="edit"
        extraCommands={[codePreview, commands.fullscreen]}
        height={500}
        onChange={(val) => {
          setValueMd(val!);
          setValue("content" , val!)
        }}
      />
    </div>
  );
};

export default Editor;
