import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/courses";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">Учебные курсы</h1>
      <p className="mt-4 text-lg text-slate-600">
        Изучите направления современной веб-разработки.
      </p>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {courses.map((course) => (
          <li key={course.id}>
            <CourseCard
              id={course.id}
              title={course.title}
              description={course.description}
              credits={course.credits}
              likes={course.likes}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
