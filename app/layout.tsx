import SideBar from "./components/aside";
import Navbar from "./components/navbar";
import "./globals.css";

export const metadata = {
  title: "Tan Blog",
  description: "Hehe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/static/icon.svg" />
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Sorts+Mill+Goudy:ital@0;1&display=swap');
      </style>
      <body>
        <div className=" max-w-7xl mx-auto flex max-h-fit h-screen">
          <Navbar />

          {children}

          <SideBar />
        </div>
      </body>
    </html>
  );
}
