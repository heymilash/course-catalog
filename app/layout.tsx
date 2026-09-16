import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Каталог учебных курсов",
  description: "Учебные курсы по современной веб-разработке",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-slate-200 bg-white">
          <nav
            aria-label="Основная навигация"
            className="mx-auto flex w-full max-w-5xl flex-wrap gap-2 px-6 py-4"
          >
            <Link href="/" className="rounded-lg px-3 py-2 hover:bg-slate-100">
              Главная
            </Link>
            <Link href="/courses" className="rounded-lg px-3 py-2 hover:bg-slate-100">
              Курсы
            </Link>
            <Link href="/about" className="rounded-lg px-3 py-2 hover:bg-slate-100">
              О проекте
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
