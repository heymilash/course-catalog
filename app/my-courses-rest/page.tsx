import Link from "next/link";
import { getJson } from "@/lib/api";

type Student = { id: number; name: string; email: string };
type Enrollment = { id: number; courseId: string };
type Course = { id: string; title: string; credits: number; level: string };

export default async function MyCoursesRestPage() {
  // Round 1: independent requests run together.
  const [student, enrollments] = await Promise.all([
    getJson<Student>("/students/2"),
    getJson<Enrollment[]>("/students/2/enrollments"),
  ]);
  // Round 2 starts only after the course ids are known.
  const courses = await Promise.all(
    enrollments.map((enrollment) =>
      getJson<Course>(`/courses/${encodeURIComponent(enrollment.courseId)}`),
    ),
  );

  return (
    <main id="main-content" className="shell catalog-page">
      <div className="mb-8 flex flex-wrap gap-4 text-sm">
        <Link href="/my-courses" className="underline">GraphQL</Link>
        <Link href="/my-courses-rest" aria-current="page" className="font-bold underline">REST</Link>
      </div>
      <h1 className="text-3xl font-bold">My courses: {student.name}</h1>
      <ul className="mt-8 divide-y divide-stone-300">
        {courses.map((course) => (
          <li key={course.id} className="py-5">
            <h2 className="text-lg font-semibold">{course.title}</h2>
            <p className="mt-2 text-sm">{course.credits} credits, level: {course.level}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
