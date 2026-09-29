import { setLanguage } from "@/app/actions";
import { getI18n } from "@/lib/i18n";

export default async function LanguageSwitcher() {
  const { locale, t } = await getI18n();
  return (
    <form action={setLanguage} className="language-switcher" aria-label={t("Язык")}>
      <button type="submit" name="locale" value="en" lang="en" aria-label="English" aria-pressed={locale === "en"}>EN</button>
      <button type="submit" name="locale" value="ru" lang="ru" aria-label="Русский" aria-pressed={locale === "ru"}>RU</button>
    </form>
  );
}
