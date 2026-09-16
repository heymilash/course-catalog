import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse, getCourses } from "@/lib/courses";
import LikeButton from "@/components/LikeButton";

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

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <Link href="/courses" className="text-blue-700 hover:underline">
        ← Все курсы
      </Link>
      <h1 className="mt-6 text-3xl font-bold">{course.title}</h1>
      <p className="mt-4 text-lg text-slate-600">{course.description}</p>
      <p className="mt-6 font-medium">Кредиты: {course.credits}</p>
      <div className="mt-6">
        <LikeButton key={course.id} initialLikes={course.likes} />
      </div>
    </main>
  );
}
