"use client";

import { useState } from "react";
import { createTranslator, type Locale } from "@/lib/translations";

type LikeButtonProps = {
  initialLikes: number;
  locale: Locale;
};

export default function LikeButton({ initialLikes, locale }: LikeButtonProps) {
  const t = createTranslator(locale);
  const [likes, setLikes] = useState<number>(initialLikes);

  return (
    <button
      type="button"
      onClick={() => setLikes((currentLikes) => currentLikes + 1)}
      aria-label={`${t("Поставить лайк. Лайков:")} ${likes}`}
      className="like-button"
    >
      <span>{t("❤ Мне нравится")}</span>
      <span className="like-count" aria-live="polite">
        {likes}
      </span>
    </button>
  );
}
