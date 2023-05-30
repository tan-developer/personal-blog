const Link: React.FC<{
  children: React.ReactNode | string;
  href: string;
  blank?: boolean;
  className : string;
  onClick?: () => void
}> = ({ children, href, blank = true ,className , onClick }) => {
  return (
    <a onClick={onClick} href={href} target={blank ? "_blank" : ""} className={className}>
      {children}
    </a>
  );
};


export default Link
