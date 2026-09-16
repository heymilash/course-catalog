import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import { getCourses } from "@/lib/courses";

export default async function Home() {
  const courses = await getCourses();
  return (
    <main id="main-content" className="home-page">
      <section className="shell hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="status-dot" /> ТВОЙ СЛЕДУЮЩИЙ ШАГ
          </span>
          <h1>
            Большие идеи
            <br />
            начинаются
            <br />с <span className="accent-word">новых знаний.</span>
          </h1>
          <p className="hero-description">
            От первого интерфейса до искусственного интеллекта.
            <br className="desktop-break" /> Найди своё направление в мире
            веб-разработки.
          </p>
          <div className="hero-actions">
            <Link href="/courses" className="button button-primary">
              Выбрать курс <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/about" className="text-link">
              Познакомиться с проектом <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="mini-icons">
              <i>⌘</i>
              <i>{"{ }"}</i>
              <i>✳</i>
            </span>
            <span>6 направлений. Множество возможностей.</span>
          </div>
        </div>
        <div
          className="hero-art"
          aria-label="Иллюстрация: от идеи к работающему приложению"
          role="img"
        >
          <span className="hero-ring ring-one" />
          <span className="hero-ring ring-two" />
          <span className="floating-label label-top">
            ✦ Идеи становятся кодом
          </span>
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
                {"// всё начинается с любопытства"}
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
            <span className="small-check">✓</span> Новый навык — новые
            возможности
          </span>
        </div>
      </section>
      <div className="tech-strip">
        <div className="shell tech-inner">
          <span>ТЕХНОЛОГИИ, КОТОРЫЕ ВДОХНОВЛЯЮТ</span>
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
            <span className="eyebrow">ВЫБИРАЙ СВОЁ НАПРАВЛЕНИЕ</span>
            <h2>С чего начнёшь ты?</h2>
          </div>
          <Link href="/courses" className="text-link">
            Все 6 курсов <span aria-hidden="true">↗</span>
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
            <span className="eyebrow">ОТ ЛЮБОПЫТСТВА К НАВЫКАМ</span>
            <h2>
              Твоя следующая идея
              <br />
              заслуживает реализации.
            </h2>
          </div>
          <Link href="/courses" className="button button-dark">
            Найти свой курс <span aria-hidden="true">↗</span>
          </Link>
          <span className="banner-star" aria-hidden="true">
            ✳
          </span>
        </div>
      </section>
    </main>
  );
}
