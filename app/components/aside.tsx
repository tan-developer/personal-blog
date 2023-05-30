import Footer from "./footer";
import Header from "./header";
import LatestBlog from "./latest";
import TechStack from "./stack";

const SideBar: React.FC = () => {
  return (
    <aside className="w-72 sticky pt-20  flex-col justify-between pb-5 hidden lg:flex">
      <Header>
        <TechStack />
      </Header>
      <LatestBlog />
      <Footer />
    </aside>
  );
};

export default SideBar;
