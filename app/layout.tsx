import { getI18n } from "@/lib/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
 const { t } = await getI18n();
 return {
  title: t("Course — каталог учебных курсов"),
  description:
    t("Найди своё направление в современной веб-разработке: frontend, backend, базы данных и AI."),
};
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { t, locale } = await getI18n();
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <a href="#main-content" className="skip-link"> {t("Перейти к содержимому")} </a>
        <header className="site-header">
          <div className="shell header-inner">
            <Link href="/" className="brand" aria-label={t("Course — главная")}>
              <span className="brand-symbol">
                c<span>↗</span>
              </span>
              course<span className="brand-dot">.</span>
            </Link>
            <nav
              aria-label={t("Основная навигация")}
              className="flex flex-wrap items-center gap-1 sm:gap-3"
            >
              <Link
                href="/"
                className="nav-link nav-home rounded-full px-4 py-2 transition-colors hover:bg-orange-50"
              > {t("Главная")} </Link>
              <Link
                href="/courses"
                className="nav-link nav-courses rounded-full px-4 py-2 transition-colors hover:bg-orange-50"
              > {t("Курсы")} </Link>
              <Link
                href="/about"
                className="nav-link nav-about rounded-full px-4 py-2 transition-colors hover:bg-orange-50"
              > {t("О проекте")} </Link>
            </nav>
            <LanguageSwitcher />
            <span className="header-note">
              <span /> {t("Учись. Создавай. Развивайся.")} </span>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="shell footer-inner">
            <Link href="/" className="footer-brand">
              course<span>.</span>
            </Link>
            <p>{t("Маленький шаг сегодня. Большие возможности завтра.")}</p>
            <span>Advanced Web Technologies · 2026</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
