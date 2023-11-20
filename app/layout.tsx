import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bal" dir="rtl">
      <body className="min-h-screen h-screen dark:bg-gray-700 dark:text-white ">
        <Navbar />
        <main className="w-[100vw] overflow-x-hidden overflow-y-auto m-auto flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
