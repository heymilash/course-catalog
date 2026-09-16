import Link from "next/link";
import CourseArtwork from "./CourseArtwork";
import { getCourseDesign } from "@/lib/course-design";

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
  const design = getCourseDesign(id);
  return (
    <Link href={`/courses/${id}`} className="course-card">
      <CourseArtwork id={id} />
      <div className="card-content">
        <div className="card-kicker">
          <span>{design.category}</span>
          <span>{credits} кредитов</span>
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="card-bottom">
          <span className="card-link">
            О курсе <span aria-hidden="true">↗</span>
          </span>
          <span className="card-likes" aria-label={`Лайков: ${likes}`}>
            ♡ {likes}
          </span>
        </div>
      </div>
    </Link>
  );
}
