import { getCourseDesign } from "@/lib/course-design";

export default function CourseArtwork({ id }: { id: string }) {
  const design = getCourseDesign(id);
  return (
    <div className={`course-art theme-${design.theme}`} aria-hidden="true">
      <span className="art-grid" />
      <span className="art-orbit" />
      <span className="art-mark">{design.mark}</span>
      <span className="art-caption">{design.category}</span>
      <span className="art-spark">✳</span>
    </div>
  );
}
