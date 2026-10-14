# Lab 5 — подготовка к защите / Defense guide

## Сначала выбери нужную лабораторную

| Работа | Что открывать |
| --- | --- |
| Lab 4 | Папка `course-catalog-api-lab4`, Swagger `http://localhost:8004/docs` — три GET-маршрута |
| Lab 5 | Папки `course-catalog-api` и `course-catalog`, сайт `http://localhost:3000`, Swagger `http://localhost:8000/docs` — шесть операций |

Запуск Lab 4 в PowerShell:

```powershell
cd "C:\Users\77712\Desktop\4 course\WEB\course-catalog-api-lab4"
.\.venv\Scripts\fastapi.exe dev main.py --port 8004
```

Для Lab 5 в первом терминале:

```powershell
cd "C:\Users\77712\Desktop\4 course\WEB\course-catalog-api"
.\.venv\Scripts\fastapi.exe dev main.py
```

Во втором терминале:

```powershell
cd "C:\Users\77712\Desktop\4 course\WEB\course-catalog"
npm run dev -- --port 3000
```

Если адрес уже открывается, второй экземпляр сервера запускать не нужно. В терминале своего сервера остановка — Ctrl+C.

## Что сказать в начале

**RU:** «В этой работе я соединила frontend на Next.js с backend на FastAPI. Страницы получают курсы с сервера, а браузер отправляет фильтры, лайки и записи на курс».

**EN:** “I connected the Next.js frontend to the FastAPI backend. The pages load courses from the API. The browser sends filter, like, and enrollment requests.”

## 1. Starting check — исходное состояние

**Показать:** сохранённый Swagger Lab 4 с тремя маршрутами; исходное состояние frontend доступно через тег `before-lab5`. В новой версии уже шесть операций, это ожидаемо.

**RU:** «До интеграции backend работал отдельно, а frontend использовал массив из lib/courses.ts. В next.config.ts не включён cacheComponents».

**EN:** “Before integration, the backend worked separately. The frontend used local mock data. Cache Components is not enabled.”

## 2. CORS

**Показать:** `course-catalog-api/main.py`, блок `app.add_middleware`.

**RU:** «Frontend работает на порту 3000, backend — на 8000. Это разные origins. Разрешён origin http://localhost:3000, чтобы браузер мог читать ответы API».

**EN:** “The frontend uses port 3000, and the backend uses port 8000. They have different origins. I allow http://localhost:3000 so the browser can read API responses.”

Origin — сочетание схемы, хоста и порта. В нём нет пути и завершающего слеша. `localhost` и `127.0.0.1` — разные хосты.

Вопрос: защищает ли CORS данные от любых клиентов? **Нет.** Он управляет доступом браузерного JavaScript к ответам, не заменяет авторизацию. **EN:** “CORS is a browser rule. It is not authentication.”

## 3. API contract — имена полей

**Показать:** `models.py`, `CamelModel`, затем JSON `/courses` и schema Course в Swagger.

**RU:** «В Python поле называется is_elective, а в JSON — isElective. alias_generator создаёт camelCase-имена. validate_by_name позволяет создавать объекты по Python-именам, как в data.py».

**EN:** “Python uses is_elective. JSON uses isElective. The alias generator changes the field names. validate_by_name also accepts Python field names.”

Важно: query-параметр остаётся `?is_elective=true`. Aliases модели не переименовывают параметры функции маршрута. `?isElective=true` игнорируется и возвращает шесть курсов.

Без `validate_by_name=True` аргумент `is_elective=True` при создании модели игнорируется как лишний, поэтому действует default False. Это проверено, настройка восстановлена.

## 4. POST — лайк и запись

**Показать:** `like_course`, `create_enrollment`, `list_enrollments` в main.py; `EnrollmentIn` и `Enrollment` в models.py.

**RU:** «Лайк увеличивает счётчик на сервере и возвращает обновлённый курс. Запись принимает ID курса и имя, проверяет данные, присваивает номер и возвращает статус 201».

**EN:** “A like increases the counter on the server and returns the updated course. An enrollment accepts a course ID and a name. The server validates the data, adds an ID, and returns status 201.”

| Код | Значение | Пример |
| --- | --- | --- |
| 200 | OK | Получение курса, успешный лайк |
| 201 | Created | Создана запись на курс |
| 404 | Not found | Курса `nope` не существует |
| 422 | Validation error | Имя `A` короче двух символов |

**Где хранятся данные?** В памяти Python-процесса. Обновление страницы их не сбрасывает; перезапуск backend сбрасывает. **EN:** “Data is stored in server memory. A page reload keeps it. A backend restart resets it.”

## 5. Настоящие запросы вместо mock

**Показать:** `.env.local` и `lib/courses.ts`.

**RU:** «API_URL использует сервер Next.js, NEXT_PUBLIC_API_URL доступна браузеру. getCourses и getCourse вызывают fetch. Проверяю res.ok, потому что fetch сам по себе не выбрасывает ошибку на HTTP 404 или 500».

**EN:** “The Next.js server uses API_URL. The browser uses NEXT_PUBLIC_API_URL. My functions call fetch and check res.ok. A 404 or 500 response does not make fetch throw an error by itself.”

`cache: "no-store"` запрашивает свежие данные. В `getCourse` статус 404 возвращает `undefined`, остальные ошибки выбрасываются. `.env.local` исключён из Git, значения приведены в README.

**Показать различие:** открой `/courses` с DevTools → Network. Прямого запроса браузера на порт 8000 нет; запрос к API выполняет сервер Next.js и он виден в backend-терминале.

## 6. Build без backend

**Показать:** в `app/courses/[id]/page.tsx` нет `generateStaticParams`; команда `npm run build` проходит с выключенным backend. В таблице маршрутов `/courses` и `/courses/[id]` отмечены `ƒ`.

**RU:** «generateStaticParams вызывал API во время сборки. Я убрала его, чтобы сборка не зависела от работающего backend, а данные загружались при запросе страницы».

**EN:** “generateStaticParams called the API during the build. I removed it so the build can work without the backend. Course data is loaded when a page is requested.”

`○` — статическая страница, `ƒ` — серверный рендеринг по запросу. В нашем проекте cookie языка тоже делает страницы динамическими.

## 7. loading / not-found / error

**Показать:** файлы в `app/courses/`.

| Ситуация | Что отображается |
| --- | --- |
| Ожидание backend | loading.tsx |
| Неизвестный курс | not-found.tsx |
| Backend выключен или ответил ошибкой | error.tsx |

**RU:** «При 404 показываю страницу неизвестного курса. При сбое API показываю ошибку. Кнопка retry повторно получает серверные данные».

**EN:** “For a missing course, I show the not-found page. For an API failure, I show the error page. The retry button requests the data again.”

Открой `/courses/does-not-exist`. Для ошибки останови backend, открой `/courses`, снова запусти backend и нажми **Try again**. Не обновляй страницу вручную: нужно показать работу retry. Задержка 1 секунду для проверки loading уже испытана и удалена.

## 8. SWR и фильтр

**Показать:** `components/ElectiveFilter.tsx`, страница `/filter`.

**RU:** «Это клиентский компонент. SWR загружает данные и предоставляет состояния загрузки и ошибки. Когда меняется checkbox, меняется URL запроса. При включённом фильтре остаются два выборных курса».

**EN:** “This is a Client Component. SWR loads data and provides loading and error states. The checkbox changes the request URL. When it is checked, only two elective courses are shown.”

Network: `GET http://localhost:8000/courses?is_elective=true`. Браузер добавляет `Origin: http://localhost:3000`. Ответ содержит `Access-Control-Allow-Origin: http://localhost:3000`.

`import type { Course }` забирает только TypeScript-тип; серверный модуль с `API_URL` не выполняется в браузере.

## 9. Лайки, форма и preflight

**Показать:** `LikeButton.tsx`, `EnrollForm.tsx`, страницу `/courses/web-security`, F12 → Network.

**RU:** «Кнопка показывает число лайков из ответа сервера. Форма отправляет JSON. При 422 она показывает сообщение из detail[0].msg, при успехе — номер записи».

**EN:** “The like button shows the number returned by the server. The form sends JSON. For status 422, it shows the server message. On success, it shows the enrollment number.”

**Почему у формы OPTIONS, а у лайка нет?**

**RU:** «Лайк — простой POST без тела и специальных заголовков. Форма использует Content-Type: application/json, поэтому браузер сначала проверяет разрешение запросом OPTIONS».

**EN:** “The like is a simple POST with no body or special headers. The form sends application/json, so the browser first sends an OPTIONS request to check permission.”

Первое имя `A`: OPTIONS 200, POST 422. Потом `Aigerim`: POST 201. OPTIONS может исчезнуть из-за кэша разрешения на 600 секунд. С **Disable cache** снова виден OPTIONS.

## 10. Диагностика пяти поломок

**Показать:** раздел **Breakage journal** в README. Поломки действительно воспроизведены и исправлены.

| Поломка | Главный признак |
| --- | --- |
| Удалён CORSMiddleware | Нет Allow-Origin; OPTIONS 405 |
| Завершающий `/` в origin | OPTIONS 400: Disallowed CORS origin |
| Не разрешён POST | Фильтр/лайк работают; OPTIONS 400: Disallowed CORS method |
| Открыт 127.0.0.1 вместо localhost | Другой Origin; OPTIONS 400 |
| Опечатка `p["ofset"]` | GET 500 и KeyError в Python; браузер тоже пишет CORS error |

**RU:** «Я сначала проверяю адрес и статус запроса, затем заголовки, OPTIONS и backend-лог. Сообщение CORS может быть следствием ошибки 500».

**EN:** “I check the request URL and status first. Then I check the headers, OPTIONS, and backend logs. A CORS message can be caused by a server error.”

На защите можно показать готовый журнал, не ломая рабочий код. Если преподаватель просит повторить эксперимент, меняй только один пункт за раз и возвращай исходное значение сразу после демонстрации.

## 11. Финальная демонстрация

1. Backend запущен на 8000, frontend на **localhost:3000**.
2. `/courses`: шесть карточек, AI/LLM первая после сброса backend.
3. `/courses/web-security`: два лайка, затем обновление страницы — число сохраняется.
4. Имя `A` отклоняется, `Aigerim` создаёт запись. Покажи `/enrollments` на backend.
5. `/filter`: checkbox меняет шесть курсов на два.
6. Покажи error/retry, README, журнал, историю коммитов `git log --oneline` в обоих проектах.

Публикация на GitHub — отдельный оставшийся шаг: нужны ссылки на оба репозитория. Локальная история Lab 5 уже содержит требуемое количество коммитов. Не называй локальные коммиты опубликованными до `git push`.
