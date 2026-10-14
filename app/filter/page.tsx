import { ElectiveFilter } from "@/components/ElectiveFilter";
import { getI18n } from "@/lib/i18n";

export default async function FilterPage() {
  const { t, locale } = await getI18n();
  return (
    <main id="main-content" className="shell catalog-page">
      <div className="page-intro">
        <span className="eyebrow">{t("КАТАЛОГ НАПРАВЛЕНИЙ")}</span>
        <h1>{t("Фильтр курсов")}</h1>
        <p>{t("Найди курс для своего следующего шага.")}</p>
      </div>
      <ElectiveFilter locale={locale} />
    </main>
  );
}
