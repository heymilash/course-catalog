import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">Каталог учебных курсов</h1>
      <p className="mt-4 text-lg text-slate-600">
        Добро пожаловать! Здесь можно познакомиться с курсами по современной
        веб-разработке.
      </p>
      <Link
        href="/courses"
        className="mt-6 inline-block rounded-lg bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800"
      >
        Посмотреть курсы
      </Link>
    </main>
  );
}
