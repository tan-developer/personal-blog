import Image from "next/image";

const Header: React.FC = () => {
  const socialLink: [string, string][] = [
    ["github", "github.com/tan-developer"],
    ["facebook", "facebook.com/errorsyntax"],
    ["instagram", "instagram.com/tan.nthing"],
  ];

  return (
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
            <li className="text-main-blue mr-2 hover:underline">
              <a href="" target="_blank">
                {element[0]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
