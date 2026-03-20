# Настройка Cloudflare R2 для MamyVoice

Код уже готов (`src/lib/r2.ts`), нужно только создать bucket и передать 4 переменные.

## Шаг 1 — Создать R2 bucket

1. Войти в [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Слева в меню: **R2 Object Storage** → **Create bucket**
3. Имя бакета: `mamyvoice-audio`
4. Location: **Automatic** (или Europe если хочется ближе к пользователям)
5. Нажать **Create bucket**

## Шаг 2 — Создать API токен для R2

1. В разделе R2 → **Manage R2 API Tokens** (правый верхний угол)
2. **Create API token**
3. Настройки:
   - **Token name**: `mamyvoice-railway`
   - **Permissions**: **Object Read & Write**
   - **Specify bucket(s)**: выбрать `mamyvoice-audio`
   - TTL: оставить без ограничения (или по желанию)
4. Нажать **Create API Token**
5. **Сохранить** показанные значения (показываются один раз!):
   - **Access Key ID** — строка типа `a1b2c3d4e5f6...`
   - **Secret Access Key** — длинная строка

## Шаг 3 — Найти Account ID и Endpoint

1. В Cloudflare Dashboard → правая колонка или URL: `dash.cloudflare.com/<ACCOUNT_ID>/...`
2. Или: R2 → любой bucket → **Settings** → видно Account ID
3. Endpoint формируется так:
   ```
   https://<ACCOUNT_ID>.r2.cloudflarestorage.com
   ```

## Шаг 4 — Добавить переменные в Railway

В Railway → проект mamyvoice → **Variables** → добавить 4 штуки:

| Переменная | Значение | Пример |
|---|---|---|
| `R2_ENDPOINT` | `https://<ACCOUNT_ID>.r2.cloudflarestorage.com` | `https://abc123def456.r2.cloudflarestorage.com` |
| `R2_ACCESS_KEY_ID` | Access Key ID из шага 2 | `a1b2c3d4e5f6...` |
| `R2_SECRET_ACCESS_KEY` | Secret Access Key из шага 2 | длинная строка |
| `R2_BUCKET_NAME` | Имя бакета из шага 1 | `mamyvoice-audio` |

После добавления Railway автоматически задеплоит с новыми переменными.

## Проверка

После деплоя:
1. Записать голос → сгенерировать озвучку книги
2. Если аудио воспроизводится в плеере — R2 работает
3. В Cloudflare Dashboard → R2 → `mamyvoice-audio` → должны появиться файлы в папках `generations/` и `voice-samples/`

## Что хранится в R2

```
mamyvoice-audio/
├── generations/
│   └── <userId>/
│       └── <bookId>-<voiceId>.mp3    ← сгенерированные озвучки
└── voice-samples/
    └── <userId>/
        └── <voiceId>.webm            ← записи голоса (для будущего использования)
```

## CORS (если понадобится)

Если аудио не загружается в браузере, нужно добавить CORS правила на bucket:

R2 → `mamyvoice-audio` → **Settings** → **CORS Policy** → **Add CORS policy**:

```json
[
  {
    "AllowedOrigins": ["https://www.mamyvoice.com", "https://mamyvoice.com"],
    "AllowedMethods": ["GET"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 86400
  }
]
```

Но скорее всего CORS не нужен — аудио раздаётся через наш API route (`/api/audio`), а не напрямую из R2.
