interface WrapperProps {
  className : string,
  children : React.ReactNode | string;
}

const Wrapper : React.FC<WrapperProps> = ({children , className}) => {
  return <div className={className}>{children}</div>
}

export default Wrapper