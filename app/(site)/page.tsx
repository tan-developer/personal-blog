import Footer from "../components/footer";
import Wrapper from "../components/UI/Wrapper";
import Header from "../components/header";
import HeaderUI from "../components/UI/Header";
import rehypeHighlight from "rehype-highlight/lib";
import { serialize } from "next-mdx-remote/serialize";
import ClientRender from "../components/Client";
import MDXRender from "../admin/components/MD/MDXRender";
import Link from "../components/UI/Link";

export default async function Home() {
  return (
    <main className="max-w-xl w-full mx-auto overflow-y-auto md:pt-20 min-h-screen pt-5 px-2 pb-20">
      <Wrapper className="lg:hidden block">
        <Header />
      </Wrapper>

      <HeaderUI
        desc="Development for successful digital products and websites"
        title="Youth & Paginate"
      ></HeaderUI>

      <div
        className="
        w-full
        md:mt-32
        mt-20
        md:py-7
        py-3
        border-t-[.025rem]
        border-b-[.025rem]
        border-gray-800
        md:text-4xl
        text-2xl
        italic
      "
      >
        <p className="text-main-blue ">
          I am a sophomore studentt at{" "}
          {
            <Link
              href="https://portal.ptit.edu.vn/"
              className="hover:underline"
            >
              PTIT
            </Link>
          }{" "}
          & front-end developer based in VietNam.
        </p>
      </div>

      <div className="mt-10 text-gray-300 text-lg [&>p]:mt-7">
        <p>
          Hello reader! My name is Pham Ngoc Tan, and I am a 19-year-old
          front-end developer. I am currently pursuing my studies at the Posts
          and Telecommunications Institute of Technology. With a strong focus on
          web development, I specialize in{" "}
          <strong className="italic text-white">Next.js</strong>, a popular
          framework for building modern and efficient web applications
        </p>
        <p>
          Born and raised in the beautiful town of{" "}
          <strong className="italic text-white">Vinh Khuc</strong>,{" "}
          <strong className="italic text-white">Van Giang</strong>, in the
          <strong className="italic text-white">Hung Yen</strong> province of{" "}
          <strong className="italic text-white">Viet Nam</strong>, I am
          fortunate to have grown up in a culturally rich and vibrant
          environment. It has instilled in me a sense of curiosity and an
          appreciation for diversity.
        </p>
        <p>
          From an early age, I developed a deep passion for programming, with a
          particular fondness for{" "}
          <Link href="" className="text-main-blue hover:underline italic font-bold">
            Typescript
          </Link>
          . Its versatility and extensive use in web development have captivated
          me, and I constantly strive to expand my knowledge and improve my
          skills.
        </p>
        <p>
          {" "}
          I am excited to connect with fellow professionals and collaborate on
          exciting projects. If you have any opportunities or would like to
          discuss front-end development, Next.js,{" "}
          <Link href="" className="text-main-blue hover:underline italic font-bold">
            Typescript
          </Link>
          , or anything related to programming, I would be delighted to engage
          in stimulating conversations. Thank you for your time, and I look
          forward to connecting with you!"
        </p>
      </div>

      <Wrapper className="lg:hidden block">
        <Footer />
      </Wrapper>
    </main>
  );
}

// const {props : {source}} = await getSerialize('');

// <ClientRender fallback={<MDXRender source={source} />} />

// async function getSerialize(data: string) {
//   const source = data;
//   const mdxSource = await serialize(source, {
//     mdxOptions: {
//       development: process.env.NODE_ENV === "development",
//       rehypePlugins: [rehypeHighlight],
//     },
//   });
//   return { props: { source: mdxSource } };
// }
