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
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    notFound();
  }
  const design = getCourseDesign(id);

  return (
    <main id="main-content" className="shell detail-page">
      <Link href="/courses" className="back-link">
        ← Назад к курсам
      </Link>
      <div className="detail-grid">
        <div className="detail-copy">
          <span className="eyebrow">{design.category} / УЧЕБНЫЙ КУРС</span>
          <h1>{course.title}</h1>
          <p className="detail-description">{course.description}</p>
          <div className="detail-tags">
            <span>{course.credits} кредитов</span>
            <span>
              {course.isElective ? "Курс по выбору" : "Обязательный курс"}
            </span>
          </div>
          <section className="topics-section">
            <h2>С чем познакомишься</h2>
            <p>Ключевые темы и технологии этого направления.</p>
            <ol>
              {design.topics.map((topic, index) => (
                <li key={topic}>
                  <span>0{index + 1}</span>
                  {topic}
                  <span aria-hidden="true">↗</span>
                </li>
              ))}
            </ol>
          </section>
          <Link href="/courses" className="text-link">
            Посмотреть другие направления <span aria-hidden="true">→</span>
          </Link>
        </div>
        <aside className="course-summary" aria-label="Информация о курсе">
          <CourseArtwork id={id} />
          <div className="summary-body">
            <span className="eyebrow">ТВОЙ СЛЕДУЮЩИЙ ШАГ</span>
            <h2>Начни с интереса.</h2>
            <p>Нравится направление? Поддержи этот курс сердечком.</p>
            <dl>
              <div>
                <dt>Направление</dt>
                <dd>{design.category}</dd>
              </div>
              <div>
                <dt>Учебная нагрузка</dt>
                <dd>{course.credits} кредитов</dd>
              </div>
              <div>
                <dt>Тип курса</dt>
                <dd>{course.isElective ? "По выбору" : "Обязательный"}</dd>
              </div>
            </dl>
            <LikeButton key={course.id} initialLikes={course.likes} />
          </div>
        </aside>
      </div>
    </main>
  );
}
