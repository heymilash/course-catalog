import { getI18n } from "@/lib/i18n";
import CourseCard from "@/components/CourseCard";
import Link from "next/link";
import { getCourses } from "@/lib/courses";

export default async function CoursesPage() {
  const { t } = await getI18n();
  const courses = await getCourses();
  return (
    <main id="main-content" className="shell catalog-page">
      <div className="page-intro">
        <span className="eyebrow">{t("КАТАЛОГ НАПРАВЛЕНИЙ")}</span>
        <h1> {t("Знания, которые")} <br />
          <span className="accent-text">{t("открывают возможности.")}</span>
        </h1>
        <p> {t("Выбери, что хочешь создавать. Мы собрали ключевые направления")} <br className="desktop-break" /> {t("современной веб-разработки в одном месте.")} </p>
      </div>
      <div className="catalog-toolbar">
        <span className="catalog-pill"> {t("Все курсы")} <span>{courses.length}</span>
        </span>
        <span>{t("От интерфейсов до искусственного интеллекта")}</span>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <li key={course.id} className="min-w-0">
            <CourseCard {...course} />
          </li>
        ))}
      </ul>
      <div className="catalog-note">
        <span aria-hidden="true">↗</span>
        <p> {t("Не знаешь, с чего начать?")} <LinkStart />
        </p>
      </div>
    </main>
  );
}
async function LinkStart() {
  const { t } = await getI18n();
  return (
    <Link href="/courses/modern-frontend" className="inline-course-link"> {t("Познакомься с frontend-разработкой.")} </Link>
  );
}
