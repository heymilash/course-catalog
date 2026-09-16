import Link from "next/link";

export default function AboutPage() {
  return (
    <main id="main-content" className="shell about-page">
      <div className="page-intro">
        <span className="eyebrow">ПРИЯТНО ПОЗНАКОМИТЬСЯ</span>
        <h1>
          Место, где интерес
          <br />
          становится <span className="accent-text">направлением.</span>
        </h1>
        <p>
          Course — учебный каталог для тех, кто хочет разобраться
          <br className="desktop-break" /> в современной веб-разработке и найти
          своё.
        </p>
      </div>
      <section className="about-story">
        <div className="about-poster" aria-hidden="true">
          <span>STAY CURIOUS.</span>
          <div>
            learn.
            <br />
            build.
            <br />
            <em>repeat.</em>
          </div>
          <b>✳</b>
          <small>МАЛЕНЬКИЕ ШАГИ → БОЛЬШИЕ ИДЕИ</small>
        </div>
        <div className="about-copy">
          <span className="eyebrow">О ПРОЕКТЕ</span>
          <h2>
            Большой мир технологий.
            <br />
            Понятная точка входа.
          </h2>
          <p>
            Интерфейсы, серверы, базы данных, безопасность и AI — за каждым
            приложением стоит целый мир технологий. Этот каталог помогает
            увидеть общую картину и познакомиться с каждым направлением.
          </p>
          <p>
            Проект создан в рамках дисциплины{" "}
            <strong>Advanced Web Technologies</strong>. Здесь можно изучить
            описания шести курсов, сравнить количество кредитов и поддержать
            понравившийся курс лайком.
          </p>
          <Link href="/courses" className="button button-primary">
            Открыть каталог <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="about-values">
        <div>
          <span>01 / ИССЛЕДУЙ</span>
          <h3>Посмотри шире</h3>
          <p>
            Шесть направлений, чтобы познакомиться с разными сторонами
            веб-разработки.
          </p>
        </div>
        <div>
          <span>02 / ВЫБИРАЙ</span>
          <h3>Найди свой интерес</h3>
          <p>
            Открой описание курса и узнай, какие технологии лежат в его основе.
          </p>
        </div>
        <div>
          <span>03 / РАЗВИВАЙСЯ</span>
          <h3>Начни с одного шага</h3>
          <p>
            Отмечай то, что вдохновляет, и выбирай, в чём хочется разобраться
            глубже.
          </p>
        </div>
      </section>
    </main>
  );
}
