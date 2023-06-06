import Header from "../components/UI/Header";
import Wrapper from "../components/UI/Wrapper";
import ContactForm from "./components/ContactForm";


export default async function Home() {
  return (
    <main className="max-w-xl w-full mx-auto overflow-y-auto md:pt-20 min-h-screen pt-5 px-2 pb-20">
      <Header desc="How can I do you a favour?" title="Keep in touch" />
      <Wrapper className="mt-20">
        <ContactForm />
      </Wrapper>
    </main>
  );
}
