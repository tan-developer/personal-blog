import Wrapper from "./components/UI/Wrapper";
import Footer from "./components/footer";
import Header from "./components/header";

export default function NotFound() {
  return (
    <main
      className="max-w-2xl w-full mx-auto overflow-y-auto md:pt-20 min-h-screen
  post px-6 "
    >
       <Wrapper className="lg:hidden block">
        <Header />
      </Wrapper>
      {" "}
      <div className="relative w-full h-2/3">
        <img
          className="w-full max-w-lg lg:mx-auto"
          src="https://merakiui.com/images/components/illustration.svg"
          alt=""
        />
      </div>
      <Wrapper className="lg:hidden block mt-10">
        <Footer />
      </Wrapper>
    </main>
  );
}
