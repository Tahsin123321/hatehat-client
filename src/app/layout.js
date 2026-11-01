import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata = {
  title: {
    default: "HateHat | Community service events in Bangladesh",
    template: "%s | HateHat",
  },
  description:
    "Find, create and join local social service events: clothes and blanket distributions, cleanups, plantation drives and more.",
};

// Runs before first paint so the saved theme never flashes.
const themeScript = `
try {
  var t = localStorage.getItem("hatehat-theme");
  if (!t) t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "hatehat-night" : "hatehat";
  document.documentElement.setAttribute("data-theme", t);
} catch (e) { document.documentElement.setAttribute("data-theme", "hatehat"); }
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="hatehat" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&family=Hind+Siliguri:wght@500;700&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
