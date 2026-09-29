import { getI18n } from "@/lib/i18n";
export default async function CourseLoading() {
  const { t } = await getI18n();
  return (
    <main id="main-content" className="shell loading-page">
      <p role="status" className="eyebrow"> {t("Загрузка курса…")} </p>
      <div className="loading-grid" aria-hidden="true">
        <div>
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-block" />
        </div>
        <div className="skeleton skeleton-cover" />
      </div>
    </main>
  );
}
