import { getI18n } from "@/lib/i18n";
import Link from "next/link";

export default async function AboutPage() {
  const { t } = await getI18n();
  return (
    <main id="main-content" className="shell about-page">
      <div className="page-intro">
        <span className="eyebrow">{t("ПРИЯТНО ПОЗНАКОМИТЬСЯ")}</span>
        <h1> {t("Место, где интерес")} <br /> {t("становится")} <span className="accent-text">{t("направлением.")}</span>
        </h1>
        <p> {t("Course — учебный каталог для тех, кто хочет разобраться")} <br className="desktop-break" /> {t("в современной веб-разработке и найти своё.")} </p>
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
          <small>{t("МАЛЕНЬКИЕ ШАГИ → БОЛЬШИЕ ИДЕИ")}</small>
        </div>
        <div className="about-copy">
          <span className="eyebrow">{t("О ПРОЕКТЕ")}</span>
          <h2> {t("Большой мир технологий.")} <br /> {t("Понятная точка входа.")} </h2>
          <p> {t("Интерфейсы, серверы, базы данных, безопасность и AI — за каждым приложением стоит целый мир технологий. Этот каталог помогает увидеть общую картину и познакомиться с каждым направлением.")} </p>
          <p> {t("Проект создан в рамках дисциплины")}{" "}
            <strong>Advanced Web Technologies</strong>{t(". Здесь можно изучить описания шести курсов, сравнить количество кредитов и поддержать понравившийся курс лайком.")} </p>
          <Link href="/courses" className="button button-primary"> {t("Открыть каталог")} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="about-values">
        <div>
          <span>{t("01 / ИССЛЕДУЙ")}</span>
          <h3>{t("Посмотри шире")}</h3>
          <p> {t("Шесть направлений, чтобы познакомиться с разными сторонами веб-разработки.")} </p>
        </div>
        <div>
          <span>{t("02 / ВЫБИРАЙ")}</span>
          <h3>{t("Найди свой интерес")}</h3>
          <p> {t("Открой описание курса и узнай, какие технологии лежат в его основе.")} </p>
        </div>
        <div>
          <span>{t("03 / РАЗВИВАЙСЯ")}</span>
          <h3>{t("Начни с одного шага")}</h3>
          <p> {t("Отмечай то, что вдохновляет, и выбирай, в чём хочется разобраться глубже.")} </p>
        </div>
      </section>
    </main>
  );
}
