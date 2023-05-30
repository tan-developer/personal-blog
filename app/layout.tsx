import { SessionProvider } from "next-auth/react";
import Wrapper from "./components/UI/Wrapper";
import SideBar from "./components/aside";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import ToasterContext from "./context/ToasterContext";
import "./globals.css";

export const metadata = {
  title: "Tan Blog",
  description: "Personal Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/static/icon.svg" />

      <body>
        <div className=" max-w-7xl mx-auto flex max-h-fit h-screen">
            <Navbar />

            {children}
            <SideBar />
          <ToasterContext />
        </div>
      </body>
    </html>
  );
}
