"use client";

import { useState } from "react";
import type { Course } from "@/lib/courses";
import { createTranslator, type Locale } from "@/lib/translations";

type LikeButtonProps = {
  courseId: string;
  initialLikes: number;
  locale: Locale;
};

const API = process.env.NEXT_PUBLIC_API_URL;

export default function LikeButton({ courseId, initialLikes, locale }: LikeButtonProps) {
  const t = createTranslator(locale);
  const [likes, setLikes] = useState<number>(initialLikes);
  const [failed, setFailed] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setFailed(false);
    setPending(true);
    try {
      const res = await fetch(`${API}/courses/${encodeURIComponent(courseId)}/like`, {
        method: "POST",
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const course: Course = await res.json();
      setLikes(course.likes);
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-busy={pending}
      aria-label={`${t("Поставить лайк. Лайков:")} ${likes}`}
      className="like-button"
    >
      <span>{t("❤ Мне нравится")}</span>
      <span className="like-count" aria-live="polite">
        {likes}
      </span>
    </button>
    {failed && <p role="alert" className="form-error">{t("Не удалось поставить лайк")}</p>}
    </div>
  );
}
