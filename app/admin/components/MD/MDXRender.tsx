
import {
  MDXRemote,
  MDXRemoteProps,
  MDXRemoteSerializeResult,
} from "next-mdx-remote";

import { CodePen, Gist ,CodeSandbox , Spotify , TikTok ,Twitch  , YouTube } from "mdx-embed";
import ErrorBoundary from "@/app/components/ErrorBoundary";

interface MDXRenderProps {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;


}

const Components = {
  CodePen, Gist ,CodeSandbox , Spotify , TikTok ,Twitch  , YouTube
}

const MDXRender: React.FC<MDXRenderProps> = ({ source }) => {
  return (
    <>
      {source && (
        <ErrorBoundary>
          <MDXRemote {...source} components={Components} />
        </ErrorBoundary>
      )}
    </>
  );
};

export default MDXRender;
