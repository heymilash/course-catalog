import Link from "next/link";

type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  credits: number;
  likes: number;
};

export default function CourseCard({
  id,
  title,
  description,
  credits,
  likes,
}: CourseCardProps) {
  return (
    <Link
      href={`/courses/${id}`}
      className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-blue-500 hover:bg-blue-50"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-3 flex-1 text-slate-600">{description}</p>
      <div className="mt-6 flex items-center justify-between gap-4 text-sm">
        <span>Кредиты: {credits}</span>
        <span aria-label={`Лайков: ${likes}`}>❤ {likes}</span>
      </div>
    </Link>
  );
}
