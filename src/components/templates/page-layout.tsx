import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export interface PagelayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PagelayoutProps) => {
  return (
    <>
      <header className="h-16 fixed top-0 w-screen text-center z-50">
        <nav className="flex flex-row justify-between h-full w-full items-center px-10 bg-gray-50 bg-opacity-50 backdrop-blur-sm"></nav>
      </header>
      <main className={`${inter.className} py-16 h-screen px-16 bg-gray-50`}>
        {children}
      </main>
    </>
  );
};

export default PageLayout;
