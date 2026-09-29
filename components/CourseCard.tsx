import { getI18n } from "@/lib/i18n";
import Link from "next/link";
import CourseArtwork from "./CourseArtwork";
import { getCourseDesign } from "@/lib/course-design";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  credits: number;
  likes: number;
};

export default async function CourseCard({
  id,
  title,
  description,
  credits,
  likes,
}: CourseCardProps) {
  const { t } = await getI18n();
  const design = getCourseDesign(id);
  return (
    <Link href={`/courses/${id}`} className="block h-full rounded-xl">
      <Card className="course-card gap-0 hover:shadow-md hover:border-blue-300 transition">
        <CourseArtwork id={id} />
        <CardHeader className="course-card-header">
          <div className="card-kicker">
            <Badge variant="secondary" className="dark:bg-orange-950 dark:text-orange-200">
              {t(design.category)}
            </Badge>
          </div>
          <CardTitle>
            <h2>{t(title)}</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className="card-content">
          <p>{t(description)}</p>
          <div className="card-bottom">
            <span className="card-link">
              {credits} {t("кредитов")} <span aria-hidden="true">↗</span>
            </span>
            {/* The card is one link; asChild avoids a nested interactive button. */}
            <Button asChild variant="ghost" size="sm" className="card-likes">
              <span aria-label={`${t("Лайков:")} ${likes}`}>♡ {likes}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
