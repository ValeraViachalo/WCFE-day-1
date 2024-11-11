import localFont from "next/font/local";
import "@/styles/reset.scss";
import { LoaderProvider } from "@/providers/LoaderProvider/LoaderProvider";
import { AnimatePresence } from "framer-motion";

const inter = localFont({
  src: [
    {
      path: "./fonts/Inter_Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Inter_ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Inter_Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

export const metadata = {
  title: "We'a Creating For Emotions | Project #1",
  description: "A journey of a thousand miles begins with a single step.",
};

export default function RootLayout({ children }) {
  return (
    <html className="html" lang="en">
      <body className={`body ${inter.variable}`}>
        <LoaderProvider>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </LoaderProvider>
      </body>
    </html>
  );
}
