"use client";

import { useState, type FormEvent } from "react";
import type { Enrollment } from "@/lib/courses";
import { createTranslator, type Locale } from "@/lib/translations";

const API = process.env.NEXT_PUBLIC_API_URL;
type Status = "idle" | "sending" | "done" | "rejected" | "error";

export function EnrollForm({ courseId, locale }: { courseId: string; locale: Locale }) {
  const t = createTranslator(locale);
  const [studentName, setStudentName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch(`${API}/enrollments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, studentName }),
      });
      if (res.status === 422) {
        const body: { detail: { msg: string }[] } = await res.json();
        setMessage(body.detail[0]?.msg ?? t("Проверьте введённые данные"));
        setStatus("rejected");
        return;
      }
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const enrollment: Enrollment = await res.json();
      setMessage(String(enrollment.id));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="enrollment-section" aria-labelledby="enrollment-heading">
      <h3 id="enrollment-heading">{t("Записаться на курс")}</h3>
      <form onSubmit={handleSubmit} className="enrollment-form" aria-busy={status === "sending"}>
        <label htmlFor="studentName">{t("Ваше имя")}</label>
        <input
          id="studentName"
          name="studentName"
          autoComplete="given-name"
          value={studentName}
          onChange={(event) => setStudentName(event.target.value)}
        />
        <button type="submit" disabled={status === "sending"} className="button button-primary">
          {status === "sending" ? t("Отправка…") : t("Записаться")}
        </button>
        {status === "done" && (
          <p role="status">{t("Вы записаны.")} {t("Номер записи:")} {message}</p>
        )}
        {status === "rejected" && (
          <p role="alert" className="form-error">{t("Сервер отклонил данные:")} {message}</p>
        )}
        {status === "error" && (
          <p role="alert" className="form-error">{t("Не удалось отправить заявку")}</p>
        )}
      </form>
    </section>
  );
}
