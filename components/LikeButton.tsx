"use client";

import { useState } from "react";

type LikeButtonProps = {
  initialLikes: number;
};

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(initialLikes);

  return (
    <button
      type="button"
      onClick={() => setLikes((currentLikes) => currentLikes + 1)}
      aria-label={`Поставить лайк. Лайков: ${likes}`}
      className="like-button"
    >
      <span>❤ Мне нравится</span>
      <span className="like-count" aria-live="polite">
        {likes}
      </span>
    </button>
  );
}
