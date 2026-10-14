"use client";

import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import type { Course } from "@/lib/courses";
import { createTranslator, type Locale } from "@/lib/translations";

const API = process.env.NEXT_PUBLIC_API_URL;

async function fetcher(url: string): Promise<Course[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export function ElectiveFilter({ locale }: { locale: Locale }) {
  const t = createTranslator(locale);
  const [onlyElective, setOnlyElective] = useState(false);
  const query = onlyElective ? "?is_elective=true" : "";
  const { data, error, isLoading } = useSWR<Course[]>(`${API}/courses${query}`, fetcher);

  return (
    <section className="filter-panel" aria-label={t("Фильтр курсов")}>
      <label className="filter-toggle">
        <input
          type="checkbox"
          checked={onlyElective}
          onChange={(event) => setOnlyElective(event.target.checked)}
        />
        {t("Только курсы по выбору")}
      </label>
      {error && <p role="alert">{t("Не удалось загрузить курсы")}</p>}
      {isLoading && <p role="status">{t("Загрузка курса…")}</p>}
      {data && !error && (
        <ul className="filter-results" aria-live="polite">
          {data.map((course) => (
            <li key={course.id}>
              <Link href={`/courses/${course.id}`}>
                <span>{t(course.title)}</span>
                <span className="filter-meta">
                  {course.credits} {t("кредитов")}
                  {course.isElective && ` · ${t("По выбору")}`}
                  <span aria-hidden="true"> ↗</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
