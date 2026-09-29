import { getI18n } from "@/lib/i18n";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { getCourses } from "@/lib/courses";

export default async function Home() {
  const { t } = await getI18n();
  const courses = await getCourses();
  return (
    <main id="main-content" className="home-page">
      <section className="shell hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="status-dot" /> {t("ТВОЙ СЛЕДУЮЩИЙ ШАГ")} </span>
          <h1> {t("Большие идеи")} <br /> {t("начинаются")} <br />{t("с")} <span className="accent-word">{t("новых знаний.")}</span>
          </h1>
          <p className="hero-description"> {t("От первого интерфейса до искусственного интеллекта.")} <br className="desktop-break" /> {t("Найди своё направление в мире веб-разработки.")} </p>
          <div className="hero-actions">
            <Button asChild variant="brand" className="min-h-[50px] gap-6 px-6 text-[13px]">
              <Link href="/courses"> {t("Выбрать курс")} <span aria-hidden="true">↗</span>
              </Link>
            </Button>
            <Link href="/about" className="text-link"> {t("Познакомиться с проектом")} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="mini-icons">
              <i>⌘</i>
              <i>{"{ }"}</i>
              <i>✳</i>
            </span>
            <span>{t("6 направлений. Множество возможностей.")}</span>
          </div>
        </div>
        <div
          className="hero-art"
          aria-label={t("Иллюстрация: от идеи к работающему приложению")}
          role="img"
        >
          <span className="hero-ring ring-one" />
          <span className="hero-ring ring-two" />
          <span className="floating-label label-top"> {t("✦ Идеи становятся кодом")} </span>
          <div className="code-window">
            <div className="window-bar">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <span>your-next-step.tsx</span>
              <span>↗</span>
            </div>
            <div className="code-body">
              <span className="code-comment">
                {t("// всё начинается с любопытства")}
              </span>
              <br />
              <br />
              <span className="code-purple">const</span> developer = {"{"}
              <br />
              &nbsp; curiosity: <span className="code-orange">true</span>,<br />
              &nbsp; skills: [
              <span className="code-green">&quot;ideas&quot;</span>,{" "}
              <span className="code-green">&quot;code&quot;</span>],
              <br />
              &nbsp; nextStep:{" "}
              <span className="code-green">
                &quot;learn something new&quot;
              </span>
              <br />
              {"}"};<br />
              <br />
              <span className="code-purple">return</span>{" "}
              <span className="code-orange">&lt;YourFuture /&gt;</span>;
            </div>
            <div className="window-bottom">
              <span className="status-dot" /> Ready to create
            </div>
          </div>
          <span className="floating-symbol symbol-code">{"</>"}</span>
          <span className="floating-symbol symbol-star">✳</span>
          <span className="floating-label label-bottom">
            <span className="small-check">✓</span> {t("Новый навык — новые возможности")} </span>
        </div>
      </section>
      <div className="tech-strip">
        <div className="shell tech-inner">
          <span>{t("ТЕХНОЛОГИИ, КОТОРЫЕ ВДОХНОВЛЯЮТ")}</span>
          <strong>React</strong>
          <strong>Next.js</strong>
          <strong>Python</strong>
          <strong>PostgreSQL</strong>
          <strong>OpenAI</strong>
        </div>
      </div>
      <section className="shell section-space">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t("ВЫБИРАЙ СВОЁ НАПРАВЛЕНИЕ")}</span>
            <h2>{t("С чего начнёшь ты?")}</h2>
          </div>
          <Link href="/courses" className="text-link"> {t("Все 6 курсов")} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <ul className="course-grid">
          {courses.slice(0, 3).map((course) => (
            <li key={course.id}>
              <CourseCard {...course} />
            </li>
          ))}
        </ul>
      </section>
      <section className="shell">
        <div className="closing-banner">
          <div>
            <span className="eyebrow">{t("ОТ ЛЮБОПЫТСТВА К НАВЫКАМ")}</span>
            <h2> {t("Твоя следующая идея")} <br /> {t("заслуживает реализации.")} </h2>
          </div>
          <Link href="/courses" className="button button-dark"> {t("Найти свой курс")} <span aria-hidden="true">↗</span>
          </Link>
          <span className="banner-star" aria-hidden="true">
            ✳
          </span>
        </div>
      </section>
    </main>
  );
}
