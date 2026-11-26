import Link from "next/link";
import { gql } from "@/lib/graphql";

const MY_COURSES = `
  query MyCourses($id: ID!) {
    student(id: $id) {
      name
      enrollments { id course { title credits level } }
    }
  }
`;

type MyCourses = {
  student: {
    name: string;
    enrollments: {
      id: string;
      course: { title: string; credits: number; level: string };
    }[];
  } | null;
};

export default async function MyCoursesPage() {
  const { student } = await gql<MyCourses>(MY_COURSES, { id: "2" });
  if (student === null) throw new Error("Student not found");

  return (
    <main id="main-content" className="shell catalog-page">
      <div className="mb-8 flex flex-wrap gap-4 text-sm">
        <Link href="/my-courses" aria-current="page" className="font-bold underline">GraphQL</Link>
        <Link href="/my-courses-rest" className="underline">REST</Link>
      </div>
      <h1 className="text-3xl font-bold">My courses: {student.name}</h1>
      <ul className="mt-8 divide-y divide-stone-300">
        {student.enrollments.map(({ id, course }) => (
          <li key={id} className="py-5">
            <h2 className="text-lg font-semibold">{course.title}</h2>
            <p className="mt-2 text-sm">{course.credits} credits, level: {course.level}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
