import {
  MDXRemote,
  MDXRemoteProps,
  MDXRemoteSerializeResult,
} from "next-mdx-remote";

import { CodePen, Gist } from "mdx-embed";
import ErrorBoundary from "@/app/components/ErrorBoundary";

interface MDXRenderProps {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
}

const MDXRender: React.FC<MDXRenderProps> = ({ source }) => {
  return (
    <>
      {source && (
        <ErrorBoundary fallbackComponent={<h1>Error</h1>}>
          <MDXRemote {...source} components={{ CodePen }} />
        </ErrorBoundary>
      )}
    </>
  );
};

export default MDXRender;
