import Image from "next/image";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const socialLink: [string, string][] = [
    ["github", "https://github.com/tan-developer"],
    ["facebook", "https://facebook.com/errorsyntax"],
    ["instagram", "https://instagram.com/tan.nthing"],
  ];

  return (
    <div>
      <div className="flex pb-5">
        <div className="">
          <Image
            alt=""
            src={"/static/portrait.jpg"}
            width={56}
            height={56}
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col ml-4">
          <p className="font-bold italic text-xl">tanngocp</p>

          <ul className="flex">
            {socialLink.map((element) => (
              <li className="text-main-blue mr-2 hover:underline" key={element[1]}>
                <a href={element[1]} target="_blank">
                  {element[0]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {children && children}
    </div>
  );
};

export default Header;
