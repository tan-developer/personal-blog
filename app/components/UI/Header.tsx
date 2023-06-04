interface IHeader {
  title : string ,
  desc  : string
}

const Header: React.FC<IHeader> = ({desc , title}) => (
  <>
    <h1 className="italic text-2xl text-gray-400">{title}</h1>

    <p className="font-sans mt-4 text-4xl  tracking-tight md:mt-0 md:text-6xl font-black text-white break-keep">
      {" "}
      {desc}
    </p>
  </>
);

export default Header