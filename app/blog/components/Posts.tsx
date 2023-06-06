'use client'

import Post from "@/app/admin/components/Post";

interface IPosts {
  posts: Post[];
}
const Posts: React.FC<IPosts> = ({ posts }) => {
  return (
    <ul
      className="
flex flex-wrap
w-full
mt-10
[&>*:not(:last-child)]:border-b-[.25px]
[&>*:not(:last-child)]:border-gray-700/50
"
    >
      {posts.map((post) => {
        return <Post post={post} key={post.id} />;
      })}
    </ul>
  );
};

export default Posts;
