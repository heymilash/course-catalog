export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold">О проекте</h1>
      <p className="mt-4 text-lg text-slate-600">
        Этот каталог помогает познакомиться с учебными курсами по современной
        веб-разработке и узнать их содержание и количество кредитов.
      </p>
      <p className="mt-4 text-lg text-slate-600">
        Проект создан в рамках дисциплины Advanced Web Technologies с
        использованием Next.js, TypeScript и Tailwind CSS.
      </p>
      <p className="mt-4 text-lg text-slate-600">
        В первой лабораторной работе используются заранее подготовленные данные
        курсов, а подключение настоящего сервера запланировано на следующие работы.
      </p>
    </main>
  );
}
