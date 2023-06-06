import Header from "../components/UI/Header";
import Wrapper from "../components/UI/Wrapper";
import ContactForm from "./components/ContactForm";

export default async function Home() {
  return (
    <>
      <Header desc="How can I do you a favour?" title="Keep in touch" />
      <Wrapper className="mt-20">
        <ContactForm />
      </Wrapper>
    </>
  );
}
