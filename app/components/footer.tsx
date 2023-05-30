import Link from "./UI/Link";

const Footer: React.FC = () => {
  return (
    <footer className="font-sans text-gray-500 text-sm">
      <p>
        2023©tanngocph. Made with{" "}
        <Link
          href="https://nextjs.org/"
          className="text-main-blue font-base underline"
        >
          NextJS
        </Link> ,
         
        <Link
          href="https://tailwindcss.com/"
          className="text-main-blue font-base underline"
        >
          TailwindCSS
        </Link> , & hosted on <Link
          href="https://vercel.com/"
          className="text-main-blue font-base underline"
        >
          Vercel
        </Link>
         
      </p>
    </footer>
  );
};

export default Footer;
