import "./globals.css";
import ScrollToTop from "./components/scrollToTop";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-blue-900">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
