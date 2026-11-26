# Course Catalog

Учебный каталог курсов для Advanced Web Technologies. Текущая версия — Lab 8: две страницы «Мои курсы» через REST и GraphQL; изменения Lab 5 сохранены.

## Lab 8 — REST и GraphQL

Backend: [course-catalog-api](https://github.com/heymilash/course-catalog-api).
Исходное состояние frontend до Lab 8 сохранено тегом `before-lab8`.

- `lib/api.ts`: GET через REST, проверка HTTP-статуса, `cache: "no-store"`.
- `lib/graphql.ts`: POST с query/variables, проверка HTTP-статуса и `body.errors`;
  ошибки GraphQL становятся `GraphQLRequestError`.
- `/my-courses-rest`: студент 2 и его записи загружаются через `Promise.all`,
  затем во втором раунде загружаются три курса.
- `/my-courses`: тот же экран одним GraphQL-запросом с переменной `id: "2"`.

Запуск: `npm ci`, создать `.env.local`, затем `npm run dev`.

```dotenv
API_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

На этом компьютере Lab 8 работает на **http://127.0.0.1:8008** — этот адрес уже
указан в локальном `.env.local`. Backend нужно запустить перед открытием страниц.
Открой http://localhost:3000/my-courses и http://localhost:3000/my-courses-rest.
Обе показывают Данияра и три одинаковых курса с кредитами и уровнями.

Реальные измерения backend: REST — **5 запросов / 2 раунда / 1145 байт / 5 SQL**;
GraphQL — **1 запрос / 1 раунд / 339 байт / 3 SQL**. Значения байт зависят от данных.
Подробные таблицы, восемь экспериментов и проверка пустой базы находятся в README backend.
Запросы серверных компонентов видны в логе API, а не в браузерном Fetch/XHR.
Проверены HTTP 200 обеих страниц, одинаковые данные, реальные 5/1 запросов;
`npm run lint` и `npm run build` проходят, страницы динамические (`ƒ`).

Старый `lib/courses.ts` сохранён. Форма записи из Lab 5 отправляет studentName,
а API Lab 7/8 требует studentId: она относится к сохранённому этапу Lab 5 и
не является формой записи Lab 8. Локальные `.env.local` не публикуются.

## Технологии

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 и shadcn/ui.

## Lab 2 — Tailwind CSS и shadcn/ui

Карточки оформлены через shadcn/ui (`Card`, `CardHeader`, `CardTitle`, `CardContent`, `Button`). Сохранены цветные обложки, тёплая палитра и переходы к курсам. Навигация использует Flexbox, отступы, hover и отделена от страницы границей.

- Конфигурация shadcn/ui: `components.json`; исходники компонентов: `components/ui/`; утилита объединения классов: `lib/utils.ts`.
- `components/CourseCard.tsx` остаётся серверным компонентом, без `use client`.
- Вся карточка — ссылка. `Button variant="ghost" size="sm"` использует `asChild` со `span`, чтобы не вкладывать интерактивную кнопку внутрь ссылки. Он показывает число лайков; поставить лайк можно на странице курса, как в Lab 1.
- Сетка в `app/courses/page.tsx`: `grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3`. До 640 px — 1 колонка, от 640 px — 2, от 1024 px — 3.
- Эффект карточки при наведении: тень, голубая граница и лёгкий подъём.
- Бонусы: фирменный цвет `brand` объявлен в `@theme inline`; собственный вариант shadcn/ui `Button variant="brand"` используется для кнопки «Выбрать курс» на главной странице.
- Тёмная тема автоматически следует `prefers-color-scheme: dark`: карточки и навигация используют `dark:` (в том числе через `@apply` в CSS), включая границы, текст и hover. Переключатель и клиентский JavaScript не нужны; `CourseCard` остаётся серверным компонентом.
- Дополнительный компонент `Badge` установлен командой `npx shadcn add badge --yes` и показывает категорию каждой карточки; у него также есть оформление для тёмной темы.

Для проверки адаптивности откройте `/courses`, нажмите F12 → режим устройств (Ctrl+Shift+M) и проверьте ширины 375, 768 и 1280 px: соответственно 1, 2 и 3 колонки без наложений и горизонтальной прокрутки.

Проверено 24 сентября 2026: `npm run lint`, `npm run build` и запуск `npm run dev` прошли успешно. В Chrome проверены ширины 320, 375, 639, 640, 768, 1023, 1024 и 1280 px: число колонок соответствует правилам, наложений и горизонтальной прокрутки нет. Также проверены hover, переход к курсу и увеличение счётчика лайков; ошибок JavaScript не обнаружено.

Компоненты установлены официальным CLI: [документация shadcn/ui](https://ui.shadcn.com/docs/cli).

Все четыре бонуса выполнены. После добавления тёмной темы и Badge повторно пройдены lint и production build. В Chrome проверены обе темы на ширинах 375, 768 и 1280 px, шесть Badge, смена системной темы без перезагрузки и работа лайка. Ошибок JavaScript и горизонтальной прокрутки нет. Для ручной проверки темы: DevTools → More tools → Rendering → Emulate CSS media feature prefers-color-scheme → dark / light.

Повторная проверка 29 сентября 2026 после добавления бонусов: `npm run lint`, `npm run build` и `npm run dev` прошли успешно. В Chrome проверены 375, 768 и 1280 px: 1, 2 и 3 колонки, все шесть карточек без горизонтальной прокрутки. Проверены голубая граница при наведении, переход к курсу, лайк 24 → 25 и фирменная кнопка перехода в каталог. Ошибок JavaScript нет.

Изменения Lab 2 сохраняются в тот же репозиторий `course-catalog`, что и Lab 1. `github-explorer` — отдельное практическое задание.

## Возможности

- Главная страница с приветствием и ссылкой на каталог.
- Страница «О проекте» и общая навигация через next/link.
- Список шести курсов с типизированными карточками CourseCard.
- Страница каждого курса с названием, описанием и количеством кредитов.
- Кнопка лайка отправляет POST в FastAPI и показывает серверный счётчик.
- Фильтр выборных курсов через SWR и форма записи с серверной валидацией.
- Сообщение о загрузке, страница «Курс не найден» и обработка ошибок с кнопкой Try again.
- Серверный рендеринг с учётом языка и свежими запросами `cache: "no-store"`; `generateStaticParams` удалён в Lab 5.
- Адаптивный дизайн: тёплая светлая палитра, цветные обложки направлений, выделение текущей страницы в меню и оформление загрузки и ошибки 404.

## Язык интерфейса

По умолчанию используется английский, независимо от языка браузера. Кнопки **EN / RU** в шапке переключают язык текущей страницы. Server Action сохраняет выбор в cookie `course-locale` на год; выбор применяется при переходах и после перезагрузки. Переведены страницы, данные курсов, категории, темы, сообщения загрузки/404, подписи доступности и метаданные; атрибут `<html lang>` соответствует выбранному языку. Переводы находятся в `lib/translations.ts`, чтение языка — в `lib/i18n.ts`. Карточки и переключатель остаются серверными компонентами.

Проверка: открыть сайт без cookie — английская версия; выбрать RU, перейти к курсу и перезагрузить — русский сохраняется; выбрать EN — вернуться к английскому. В обеих темах проверены ширины 320, 375, 768 и 1280 px.

## Локальный запуск — Lab 5

Нужны Node.js 20.9+ и Python 3.10+. Запускайте backend первым, frontend вторым, в двух разных терминалах. Каталоги `course-catalog-api` и `course-catalog` находятся рядом.

Терминал 1, PowerShell (backend):

```powershell
cd "C:\Users\77712\Desktop\4 course\WEB\course-catalog-api"
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\fastapi.exe dev main.py
```

Окружение и установка нужны только при первоначальной настройке. Swagger: <http://localhost:8000/docs>.

В корне frontend, рядом с `package.json`, создайте `.env.local`:

```dotenv
API_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

`API_URL` читается серверным кодом Next.js. `NEXT_PUBLIC_API_URL` доступна браузеру и не должна содержать секреты. Файл `.env.local` исключён из Git; после первоначального создания перезапустите dev-сервер. Для сборки переменные тоже должны быть заданы, но работающий backend не требуется.

Терминал 2, PowerShell (frontend):

```powershell
cd "C:\Users\77712\Desktop\4 course\WEB\course-catalog"
npm ci
npm run dev -- --port 3000
```

Открывайте именно <http://localhost:3000>, поскольку backend разрешает этот origin. `http://127.0.0.1:3000` и порт `3001` — другие origins. Если порт 3000 занят, сначала остановите лишний экземпляр своего dev-сервера.

## Сохранённая версия Lab 4

Backend до интеграции сохранён в ветке `lab4-defense` и локальной папке `../course-catalog-api-lab4`. В ней отдельное окружение и исходные три GET-маршрута с полем `is_elective`. Для одновременной защиты используйте другой порт:

```powershell
cd "C:\Users\77712\Desktop\4 course\WEB\course-catalog-api-lab4"
.\.venv\Scripts\fastapi.exe dev main.py --port 8004
```

Swagger Lab 4: <http://localhost:8004/docs>. Lab 5 использует порт 8000. В frontend исходное состояние отмечено тегом `before-lab5`.

## Проверки и сборка

```bash
npm run lint
npm run build
```

Для запуска собранной версии:

```bash
npm run start
```

Перед запуском на том же порту остановите сервер разработки сочетанием Ctrl+C.

## Страницы

| Адрес | Содержимое |
| --- | --- |
| `/` | Главная страница |
| `/about` | О проекте |
| `/courses` | Список курсов с backend, Server Component |
| `/filter` | Фильтрация через SWR, запросы из браузера |
| `/courses/modern-frontend` | Пример страницы курса |
| `/courses/does-not-exist` | Проверка сообщения «Курс не найден» |

## Структура

```text
app/
  layout.tsx                  # Общая оболочка и навигация
  page.tsx                    # Главная страница
  globals.css                 # Общие стили и Tailwind
  about/page.tsx              # О проекте
  filter/page.tsx             # Фильтрация курсов из браузера
  courses/
    page.tsx                  # Список курсов
    not-found.tsx             # Курс не найден
    error.tsx                 # Ошибка API и retry
    loading.tsx               # Загрузка списка
    [id]/
      page.tsx                # Динамическая страница курса
      loading.tsx             # Загрузка курса
components/
  CourseCard.tsx              # Серверная карточка курса
  LikeButton.tsx              # POST лайка
  EnrollForm.tsx              # POST записи и обработка 422
  ElectiveFilter.tsx          # SWR и фильтр выборных курсов
  CourseArtwork.tsx           # Декоративная обложка курса
lib/
  courses.ts                 # Типы Course/Enrollment и серверные fetch-функции
  course-design.ts           # Цвета, категории и ключевые темы направлений
```

## Как это работает

`lib/courses.ts` больше не содержит массив курсов или искусственную задержку: `getCourses()` и `getCourse(id)` выполняют запросы к FastAPI с `cache: "no-store"` и проверкой `res.ok`. Для одного курса статус 404 преобразуется в `undefined`, затем страница вызывает `notFound()`. Другие неуспешные статусы и недоступность API обрабатывает `app/courses/error.tsx`.

| Действие | Кто обращается к FastAPI | Запрос | CORS / preflight |
| --- | --- | --- | --- |
| Список курсов | Сервер Next.js | GET /courses | CORS не применяется |
| Страница курса | Сервер Next.js | GET /courses/{id} | CORS не применяется |
| Фильтр | Браузер, SWR | GET /courses?is_elective=true | CORS, без preflight |
| Лайк | Браузер | POST /courses/{id}/like | CORS, без preflight |
| Запись на курс | Браузер | POST /enrollments, JSON | CORS и OPTIONS preflight |

В JSON поле курса называется `isElective`, поля записи — `courseId` и `studentName`. Query-параметр остаётся `is_elective`. Клиентские компоненты импортируют из `lib/courses.ts` только типы через `import type`.

Лайки и записи хранятся в памяти backend: обновление страницы их сохраняет, перезапуск backend — сбрасывает. `fastapi dev` тоже перезапускает backend при изменениях Python-файлов. У имени намеренно нет клиентского `minLength`: короткое имя отправляется серверу, а форма показывает `detail[0].msg` из ответа 422. Текст серверной ошибки остаётся на языке API; новые подписи интерфейса переведены на EN/RU.

## Decisions

`generateStaticParams` удалён, потому что он вызывал `getCourses()` во время сборки и требовал работающий API; теперь страницы курсов получают свежие данные во время запроса, а сборка проходит с выключенным backend. Лайк — простой POST без тела и специальных заголовков, поэтому браузер отправляет его без preflight; форма использует `Content-Type: application/json`, поэтому сначала выполняется OPTIONS. `retry()` в Next.js 16.3.5 повторно запрашивает серверные данные и восстанавливает страницу после запуска backend без ручной перезагрузки.

В проекте уже есть `cookies()` для выбора языка, поэтому страницы динамические и по этой причине. Удаление только `cache: "no-store"` здесь не гарантирует статическую страницу из необязательного эксперимента; поведение зависит от всего маршрута.

## Проверка перед защитой

1. Перезапустите backend и frontend: это сбросит лайки и записи. Откройте `/courses`: шесть карточек, `ai-integration` первая.
2. На `/courses/web-security` дважды нажмите лайк: 21 → 22 → 23; обновите страницу — остаётся 23.
3. Откройте F12 → Network. Отправьте имя `A`: OPTIONS 200, POST 422 и сообщение сервера под формой.
4. Отправьте `Aigerim`: POST 201 и `Enrollment number: 1`. Проверьте запись в <http://localhost:8000/enrollments>.
5. Включите Disable cache и повторите отправку: OPTIONS появляется снова. Без этого флага разрешение preflight кэшируется на 600 секунд.
6. Откройте `/filter`, включите Electives only: остаются два курса. В Network виден GET `http://localhost:8000/courses?is_elective=true`, `Origin: http://localhost:3000` и ответный `Access-Control-Allow-Origin`.
7. На `/courses` браузер не отправляет запросы напрямую на порт 8000: запрос выполняет сервер Next.js, он виден в backend-логе.
8. `/courses/does-not-exist` показывает Course not found. При остановленном backend `/courses` и страница курса показывают Something went wrong. Запустите backend и нажмите Try again.
9. Для демонстрации loading временно добавьте `time.sleep(1)` в backend `get_course` (с импортом `time`), откройте курс, затем удалите задержку.
10. `npm run build` проходит при выключенном backend; `/courses` и `/courses/[id]` отмечены `ƒ`. `npm run lint` проверяет исходники.

## Сдача

Изменения сохраняются в существующих репозиториях `course-catalog` и `course-catalog-api`. Требуются минимум 5 новых frontend-коммитов и 3 backend-коммита. Перед push проверьте `git status --short` и `git log --oneline`.

Frontend уже имеет remote `https://github.com/heymilash/course-catalog.git`; после проверки изменений отправьте `git push origin master`. Для backend нужно создать пустой GitHub-репозиторий `course-catalog-api`, добавить его как `origin`, затем выполнить `git push -u origin main`. Локальная реализация сама по себе не означает публикацию на GitHub. Облачный деплой в Lab 5 не требуется.

## Breakage journal

Проверено 14 октября 2026 в Microsoft Edge (Chromium) через реальные действия интерфейса. Для каждой поломки использован новый контекст браузера с отключённым кэшем; записаны Console и сетевые события, включая OPTIONS. После каждого эксперимента backend останавливался, рабочий код восстанавливался; следующая поломка вводилась отдельно. В конце восстановлен также next.config.ts.

Важно: HTTP-статус ниже — ответ сервера, видимый в сетевом протоколе/логе. JavaScript не получает доступ к заблокированному CORS-ответу. DevTools может показывать строку предполагаемого POST записи как failed: это не означает, что POST дошёл до backend после отказа preflight.

### Breakage 1: CORS middleware удалён

- What I did: Удалён блок `app.add_middleware(CORSMiddleware, ...)`.
- Console: `Access to fetch at 'http://localhost:8000/courses' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
- Network: GET /courses и POST /courses/web-security/like получают HTTP 200 на сервере, но браузер помечает ответы CORS error; счётчик на сервере вырос до 22. OPTIONS /enrollments → 405; основной POST заблокирован браузером. Серверная страница /courses работает.
- Cause: Нет middleware, поэтому отсутствует Access-Control-Allow-Origin; OPTIONS попадает в обычный роутинг.
- How I found it: Шаги 3–4: нет разрешающего заголовка, preflight получает 405.
- Fix: восстановлен исходный рабочий код; исправленная версия проверена при финальном запуске.

### Breakage 2: Завершающий слеш в origin

- What I did: `allow_origins=["http://localhost:3000"]` заменён на `allow_origins=["http://localhost:3000/"]`.
- Console: `Access to fetch at 'http://localhost:8000/courses' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
- Network: GET списка и POST лайка: HTTP 200, CORS error в браузере. OPTIONS /enrollments → 400, `Disallowed CORS origin`; POST записи не отправлен. /courses работает.
- Cause: Origin страницы не содержит завершающий слеш и не совпадает с allow_origins; Access-Control-Allow-Origin отсутствует.
- How I found it: Шаги 3–4: сравнение origin и тела ответа preflight.
- Fix: восстановлен исходный рабочий код; исправленная версия проверена при финальном запуске.

### Breakage 3: Не разрешён POST в preflight

- What I did: Удалена строка `allow_methods=["*"]`; по умолчанию остаётся GET.
- Console: `Access to fetch at 'http://localhost:8000/enrollments' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status.`
- Network: GET фильтра → 200, POST лайка → 200: оба работают. OPTIONS /enrollments → 400, `Disallowed CORS method`; основной POST записи не отправлен. /courses работает.
- Cause: Origin разрешён, но метод POST не разрешён в проверке preflight. Простой POST лайка не проходит preflight, поэтому выполняется.
- How I found it: Шаг 4: Access-Control-Allow-Origin присутствует, но Access-Control-Allow-Methods содержит только GET.
- Fix: восстановлен исходный рабочий код; исправленная версия проверена при финальном запуске.

### Breakage 4: 127.0.0.1 вместо localhost

- What I did: Backend оставлен рабочим. Временно добавлен `allowedDevOrigins: ["127.0.0.1"]` в next.config.ts, frontend перезапущен, страница открыта на http://127.0.0.1:3000.
- Console: `Access to fetch at 'http://localhost:8000/courses' from origin 'http://127.0.0.1:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
- Network: GET списка и POST лайка: HTTP 200, но CORS error. OPTIONS /enrollments → 400, `Disallowed CORS origin`; POST записи не отправлен. Серверная /courses работает.
- Cause: localhost и 127.0.0.1 — разные хосты и разные origins; backend разрешает только http://localhost:3000.
- How I found it: Шаги 1 и 3: сравнение адреса страницы, Origin и списка разрешённых origins.
- Fix: восстановлен исходный рабочий код; страница снова открывается через localhost, временная настройка allowedDevOrigins удалена.

### Breakage 5: Python-ошибка, похожая на CORS

- What I did: В list_courses заменено `offset = p["offset"]` на `offset = p["ofset"]`.
- Console: `Access to fetch at 'http://localhost:8000/courses' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
- Network: GET /courses → HTTP 500, в браузерном фильтре CORS error; серверная страница /courses показывает Something went wrong. POST лайка → 200, OPTIONS записи → 200, POST записи → 201.
- Cause: KeyError в Python формирует ответ 500 вне CORSMiddleware: у него нет Access-Control-Allow-Origin, хотя настройки CORS правильные.
- How I found it: Шаги 2 и 5: статус 500 и traceback в backend заканчивается на `KeyError: 'ofset'`.
- Fix: восстановлен исходный рабочий код; исправленная версия проверена при финальном запуске.

### Проверка preflight вручную

```powershell
curl.exe -i -X OPTIONS http://localhost:8000/enrollments -H "Origin: http://localhost:3000" -H "Access-Control-Request-Method: POST" -H "Access-Control-Request-Headers: content-type"
```

Рабочий ответ: 200, тело `OK`, `access-control-allow-origin: http://localhost:3000`, в методах есть POST, заголовки разрешают content-type, `access-control-max-age: 600`. При выключенном middleware получен 405; при неверном origin — 400 `Disallowed CORS origin`; при запрещённом методе — 400 `Disallowed CORS method`.

### Другие выполненные эксперименты

- Удаление `validate_by_name=True` в модели: `/courses?is_elective=true` вернул 0 курсов; после восстановления — 2.
- Временная задержка 1 секунду в `get_course`: экран Loading course… показан до загрузки страницы. Задержка удалена.
- При остановленном backend список и страница курса показывают error.tsx. После запуска кнопка Try again возвращает шесть карточек без запроса нового HTML-документа.
- Проверено кэширование preflight: первая отправка формы — OPTIONS 200 + POST 422; следующая корректная — только POST 201; с Disable cache — новый OPTIONS 200 перед POST 201.

Подготовка к защите по всем 11 этапам: [LAB5_DEFENSE.md](LAB5_DEFENSE.md).

Проверка сборки с временно возвращённым `generateStaticParams`: при выключенном backend получен ожидаемый `ECONNREFUSED`. После удаления функции повторная сборка прошла; рабочий код восстановлен.
