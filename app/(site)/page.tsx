import Image from "next/image";
import Footer from "../components/footer";
import Wrapper from "../components/UI/Wrapper";
import Header from "../components/header";

export default function Home() {
  return (
    <main className="max-w-2xl w-full mx-auto overflow-y-auto md:pt-20 min-h-screen ">
      <Wrapper className="lg:hidden block">
        <Header />
      </Wrapper>

      <Wrapper className="lg:hidden block">
        <Footer />
      </Wrapper>
    </main>
  );
}
