'use client'

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import rehypeHighlight from "rehype-highlight/lib";
import MDXRender from "@/app/admin/components/MD/MDXRender";
import { useState } from "react";

interface IMDXWrapper {
  source: string;
}

interface Props {
  props : {
    source : MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
  }
}

const MDXWrapper: React.FC<IMDXWrapper> = (props) => {
  const state : Props = JSON.parse(JSON.parse(props.source))

  const {props : {source}} = state
  
  return (
    <>
       <MDXRender source={source} />
    </>
  );
};

export default MDXWrapper;
