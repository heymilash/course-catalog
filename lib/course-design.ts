type CourseDesign = {
  category: string;
  mark: string;
  theme: string;
  topics: string[];
};
const designs: Record<string, CourseDesign> = {
  "modern-frontend": {
    category: "Frontend",
    mark: "</>",
    theme: "peach",
    topics: ["React 19", "Server Components", "Next.js App Router"],
  },
  "backend-fastapi": {
    category: "Backend",
    mark: "{ }",
    theme: "sage",
    topics: ["Асинхронные REST API", "FastAPI", "Валидация с Pydantic"],
  },
  "databases-postgresql": {
    category: "Базы данных",
    mark: "SQL",
    theme: "lavender",
    topics: ["Проектирование схем", "SQLAlchemy", "Миграции Alembic"],
  },
  "api-design": {
    category: "Архитектура",
    mark: "↔",
    theme: "butter",
    topics: ["REST", "GraphQL", "Сравнение подходов"],
  },
  "web-security": {
    category: "Безопасность",
    mark: "#",
    theme: "blue",
    topics: ["JWT и OAuth2", "Защита от XSS и CSRF", "Защита от SQL-инъекций"],
  },
  "ai-integration": {
    category: "Искусственный интеллект",
    mark: "✳",
    theme: "rose",
    topics: [
      "Большие языковые модели",
      "OpenAI API",
      "AI-функции в приложении",
    ],
  },
};
export function getCourseDesign(id: string): CourseDesign {
  return (
    designs[id] ?? {
      category: "Веб-разработка",
      mark: "</>",
      theme: "peach",
      topics: [],
    }
  );
}
