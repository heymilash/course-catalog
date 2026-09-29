import { cookies } from "next/headers";
import { cache } from "react";
import { createTranslator, type Locale } from "./translations";

export const getI18n = cache(async () => {
  const locale: Locale = (await cookies()).get("course-locale")?.value === "ru" ? "ru" : "en";
  return { locale, t: createTranslator(locale) };
});
