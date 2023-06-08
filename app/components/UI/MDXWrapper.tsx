'use client'

import { MDXRemoteSerializeResult } from "next-mdx-remote";
import MDXRender from "@/app/admin/components/MD/MDXRender";

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
