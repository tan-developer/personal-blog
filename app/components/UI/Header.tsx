interface IHeader {
  title : string ,
  desc  : string
}

const Header: React.FC<IHeader> = ({desc , title}) => (
  <>
    <h1 className="italic text-2xl text-gray-400">{title}</h1>

    <p className="font-sans mt-4 text-2xl font-medium tracking-tight text-gray-600 dark:text-gray-400 md:mt-0 md:text-6xl md:font-black md:text-black dark:md:text-white break-keep">
      {" "}
      {desc}
    </p>
  </>
);

export default Header