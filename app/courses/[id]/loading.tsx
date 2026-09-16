export default function CourseLoading() {
  return (
    <main id="main-content" className="shell loading-page">
      <p role="status" className="eyebrow">
        Загрузка курса…
      </p>
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
