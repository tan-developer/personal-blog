const TechStack: React.FC = () => {
  const stack: string[] = [
    "NextJs",
    "TailwindCSS",
    "Prisma",
    "ReactJs",
    "Typescript",
    "SASS",
    "MongodbAtlas",
  ];
  return (
    <div className="border-t-[.5px] border-t-gray-800 font-sans">
      <div className="uppercase text-gray-500 text-xs  mt-2">
        <p>Current Stack</p>
      </div>
      <ul className="flex w-full flex-wrap">
        {stack.map((element) => (
          <li className="rounded-md mt-1 mr-2 px-1 py-1 text-xs bg-cyan-900/20 text-gray-400 " key={element}>
            {element}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechStack;
