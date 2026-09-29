import { getI18n } from "@/lib/i18n";
import Link from "next/link";

export default async function CourseNotFound() {
  const { t } = await getI18n();
  return (
    <main id="main-content" className="shell empty-page">
      <span className="error-number" aria-hidden="true">
        404<span>↗</span>
      </span>
      <span className="eyebrow">{t("КАЖЕТСЯ, МЫ СВЕРНУЛИ НЕ ТУДА")}</span>
      <h1>{t("Курс не найден")}</h1>
      <p> {t("Такого курса пока нет. Но в каталоге есть ещё шесть направлений для новых идей.")} </p>
      <Link href="/courses" className="button button-primary"> {t("Вернуться к курсам")} </Link>
    </main>
  );
}
