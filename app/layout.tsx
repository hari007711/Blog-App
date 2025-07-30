import Footer from "@/components/footer";
import Header from "../components/Header";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Providers from "./provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-800">
        <header className="bg-white p-4 text-white shadow-md">
          <nav>
            <Header />
          </nav>
        </header>
        <Providers>
          <div className="mx-auto flex-grow">{children}</div>
        </Providers>
        <footer className="bg-gray-800 p-4 text-center text-white">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
