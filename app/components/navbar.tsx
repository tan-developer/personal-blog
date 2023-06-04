import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  const linkArr: [string, string][] = [
    ["About", "/"],
    ["Writings", "/blog"],
    ["Project", "/project"],
    ["Contact", "/contact"],
  ];

  return (
    <div
      className="
          md:border-r-[.5px] 
          border-gray-800
          md:w-[5rem]
          flex 
          md:flex-col 
          md:justify-between 
          md:pt-20
          md:relative
          fixed          
          bottom-0
          left-0
          w-screen
          md:pl-4
        "
    >
      <Image
        alt="logo"
        src={"/static/icon.svg"}
        width={39}
        height={39}
        className="md:block hidden"
      />

        <ul className="md:flex md:flex-col grid grid-cols-4 w-full md:w-12 md:bg-opacity-0 bg-main-blue md:bg-black ">
          {linkArr.map((element) => (
            <li
              key={element[0]}
              className="md:w-12 md:h-12 m-auto h-20 flex items-center"
            >
              <Link href={element[1]}>
                <p className="md:hidden block text-black ">{element[0]}</p>
                <Image
                  className="mx-auto hidden md:block"
                  alt=""
                  width={26}
                  height={26}
                  src={`/static/${element[0].toLowerCase()}.svg`}
                />
              </Link>
            </li>
          ))}
        </ul>

      <div className="opacity-0 pointer-events-none hidden md:block">placeholder</div>
    </div>
  );
};

export default Navbar;
