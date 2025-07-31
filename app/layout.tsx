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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-800">
        <ThemeProvider attribute="class">
          <header className="fixed top-0 left-0 right-0 z-50 bg-white p-4 shadow-md">
            <nav>
              <Header />
            </nav>
          </header>
          <main className="mx-auto flex-grow">{children}</main> 
          <footer className="bg-gray-800 p-4 text-center text-white">
            <Footer />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
