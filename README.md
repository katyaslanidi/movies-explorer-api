# Api для дипломного проекта курса «Веб-разработчик» от «Яндекс Практикум»

## Технологии:
* NodeJS
* Express
* MongoDB
* Mongoose
* Nginx
* PM2

## Функционал:
* Регистрация
* Авторизация
* Обновление данных пользователя
* Получение информации о текущем пользователе
* Получение списка фильмов
* Создание фильма
* Удаление фильма
* Центральная обработка ошибок
* Валидация входящих данных

## Ссылки:
* IP-адрес: 62.84.126.242
* [Backend](https://api.katyaslanidi.movies.nomoreparties.co)
* [Репозиторий Frontend](https://github.com/katyaslanidi/movies-explorer-frontend)

## Установка и запуск проекта:
1. Клонировать репозиторий: `git clone https://github.com/katyaslanidi/movies-explorer-api`
2. Установить зависимости: `npm install`
3. Запустить сервер: `npm run start`
4. Запустить сервер с hot-reload: `npm run dev`

### Роуты

| Запрос | Роут        | Описание                                                               |
| -------|-------------| -----------------------------------------------------------------------|
|POST    |/signup      | Создаёт пользователя с переданными в теле данными                      |
|POST    |/signin      | Возвращает JWT, если в теле запроса переданы правильные почта и пароль |
|GET     |/users/me    | Возвращает информацию о пользователе (email и имя)                     |
|PATCH   |/users/me    | 	Обновляет информацию о пользователе                                   |
|POST    |/movies      | Создаёт фильм с переданными в теле данными                             |
|GET     |/movies      | Возвращает все сохранённые пользователем фильмы                        |
|DELETE  |/movies/_id  | Удаляет сохранённый пользователем фильм по _id                         |

## Чеклист:
[Критерии диплома веб-разработчика](https://code.s3.yandex.net/web-developer/static/new-program/web-diploma-criteria-2.0/index.html#backend)

### Статус проекта: в разработке
