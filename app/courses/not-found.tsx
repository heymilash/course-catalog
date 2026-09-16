import Link from "next/link";

export default function CourseNotFound() {
  return (
    <main id="main-content" className="shell empty-page">
      <span className="error-number" aria-hidden="true">
        404<span>↗</span>
      </span>
      <span className="eyebrow">КАЖЕТСЯ, МЫ СВЕРНУЛИ НЕ ТУДА</span>
      <h1>Курс не найден</h1>
      <p>
        Такого курса пока нет. Но в каталоге есть ещё шесть направлений для
        новых идей.
      </p>
      <Link href="/courses" className="button button-primary">
        Вернуться к курсам
      </Link>
    </main>
  );
}
