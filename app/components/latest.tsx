import Image from "next/image";
import { BsArrowRightShort } from "react-icons/bs";

interface BlogHeaderInterface {
  title: string;
  desc: string;
}

const LatestBlog: React.FC = () => {
  const dummyData: BlogHeaderInterface[] = [
    { title: "My first blog", desc: "none" },
    { title: "My second blog", desc: "nho cac con vo qua" },
  ];
  return (
    <div className="font-sans border border-gray-700 rounded-lg p-4">
      <div className="flex text-gray-400 text-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          height="16"
          width="16"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            stroke="#41403c"
            d="M21 13.2554C18.2207 14.3805 15.1827 15 12 15C8.8173 15 5.7793 14.3805 3 13.2554M16 6V4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4V6M12 12H12.01M5 20H19C20.1046 20 21 19.1046 21 18V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V18C3 19.1046 3.89543 20 5 20Z"
          ></path>
        </svg>

        <p className="text-xs uppercase ml-2 font-medium">Latest Blog</p>
      </div>

      <ul className="mt-2">
        {dummyData.map(({title , desc}) => (
          <li className="font-medium text-sm py-[10px] capitalize [&:not(:last-child)]:border-b border-gray-700" key={title}>
            <div className="flex text-center items-center w-full justify-between text-gray-200">
              <p>{title}</p>
              <BsArrowRightShort size={20} />
            </div>
            <div className="text-main-blue font-thin ">
              {desc}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestBlog;
