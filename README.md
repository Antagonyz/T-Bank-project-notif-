# T-Банк · Управление подписками

MVP сервиса управления подписками: Laravel API + Next.js frontend.

## Что добавлено в этой версии

- Адаптация интерфейса под смартфоны: мобильная шапка, нижнее меню, компактные карточки, безопасные отступы.
- Демонстрация push-уведомлений на главной странице и странице подписок.
- Уведомления строятся из данных backend: ближайшее списание, рост цены, пробный период, редко используемая подписка.
- Сохранена структура страниц: `/`, `/subscriptions`, `/analytics`.

## Backend

```powershell
cd backend
composer install
copy .env.example .env
php artisan key:generate
New-Item database/database.sqlite -ItemType File -Force
php artisan migrate:fresh --seed
php artisan serve --host=0.0.0.0 --port=8000
```
Если возникает проблема с портами, то пробуем другой:

```powershell
php artisan serve --host=0.0.0.0 --port=8080
```
Проверка API:

```text
http://localhost:8000/api/health
http://localhost:8000/api/subscriptions
```

## Frontend

```powershell
cd frontend
copy .env.local.example .env.local
npm install
npm run dev
```

Открыть:

```text
http://localhost:3000
```

Для доступа с других устройств в одной Wi-Fi сети:

```powershell
npm run dev:host
```

И открыть:

```text
http://192.168.0.177:3000
```

В `frontend/.env.local` для доступа по сети укажи:

```env
NEXT_PUBLIC_API_URL=http://192.168.0.177:8000/api
```
