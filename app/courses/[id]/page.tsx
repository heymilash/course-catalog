import { getI18n } from "@/lib/i18n";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse, getCourses } from "@/lib/courses";
import LikeButton from "@/components/LikeButton";
import CourseArtwork from "@/components/CourseArtwork";
import { getCourseDesign } from "@/lib/course-design";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((course) => ({ id: course.id }));
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { t, locale } = await getI18n();
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    notFound();
  }
  const design = getCourseDesign(id);

  return (
    <main id="main-content" className="shell detail-page">
      <Link href="/courses" className="back-link"> {t("← Назад к курсам")} </Link>
      <div className="detail-grid">
        <div className="detail-copy">
          <span className="eyebrow">{t(design.category)} {t("/ УЧЕБНЫЙ КУРС")}</span>
          <h1>{t(course.title)}</h1>
          <p className="detail-description">{t(course.description)}</p>
          <div className="detail-tags">
            <span>{course.credits} {t("кредитов")}</span>
            <span>
              {course.isElective ? t("Курс по выбору") : t("Обязательный курс")}
            </span>
          </div>
          <section className="topics-section">
            <h2>{t("С чем познакомишься")}</h2>
            <p>{t("Ключевые темы и технологии этого направления.")}</p>
            <ol>
              {design.topics.map((topic, index) => (
                <li key={t(topic)}>
                  <span>0{index + 1}</span>
                  {t(topic)}
                  <span aria-hidden="true">↗</span>
                </li>
              ))}
            </ol>
          </section>
          <Link href="/courses" className="text-link"> {t("Посмотреть другие направления")} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <aside className="course-summary" aria-label={t("Информация о курсе")}>
          <CourseArtwork id={id} />
          <div className="summary-body">
            <span className="eyebrow">{t("ТВОЙ СЛЕДУЮЩИЙ ШАГ")}</span>
            <h2>{t("Начни с интереса.")}</h2>
            <p>{t("Нравится направление? Поддержи этот курс сердечком.")}</p>
            <dl>
              <div>
                <dt>{t("Направление")}</dt>
                <dd>{t(design.category)}</dd>
              </div>
              <div>
                <dt>{t("Учебная нагрузка")}</dt>
                <dd>{course.credits} {t("кредитов")}</dd>
              </div>
              <div>
                <dt>{t("Тип курса")}</dt>
                <dd>{course.isElective ? t("По выбору") : t("Обязательный")}</dd>
              </div>
            </dl>
            <LikeButton key={course.id} initialLikes={course.likes} locale={locale} />
          </div>
        </aside>
      </div>
    </main>
  );
}
