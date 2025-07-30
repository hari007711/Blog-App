import Footer from "@/components/footer";
import Header from "../components/Header";
import "./globals.css";
import { ThemeProvider } from "next-themes";

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
        <main className="mx-auto flex-grow">{children}</main>
        <footer className="bg-gray-800 p-4 text-center text-white">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
