import Wrapper from "./components/UI/Wrapper";
import SideBar from "./components/aside";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import AuthContext from "./context/AuthProvider";
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
      <head>
        <link rel="icon" href="/static/icon.svg" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        />
      </head>
      <body>
        <div className=" max-w-7xl mx-auto flex max-h-fit h-screen">
          <AuthContext>
            <Navbar />

            {children}
            <SideBar />
            <ToasterContext />
          </AuthContext>
        </div>
      </body>
    </html>
  );
}
