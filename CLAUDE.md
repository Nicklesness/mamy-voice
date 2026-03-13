# CLAUDE.md — mamy-voice

## Описание

Мобильное веб-приложение для озвучки детских книг голосом матери. Мама записывает 2 минуты своего голоса, выбирает книгу — приложение генерирует аудиоверсию книги клонированным голосом через ElevenLabs API.

## Стек

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS 4
- **Voice cloning**: ElevenLabs API (Voice Cloning + Text-to-Speech)
- **Deploy**: Vercel
- **State**: React hooks + Context (без Redux, приложение простое)

## Архитектура

### Маршруты (App Router)

```
src/app/
├── page.tsx                    # Лендинг / вход
├── layout.tsx                  # Root layout (шрифты, metadata)
├── onboarding/
│   └── page.tsx                # Онбординг — зачем это важно для ребёнка
├── tutorial/
│   └── page.tsx                # Обучалка по приложению
├── record/
│   └── page.tsx                # Запись голоса мамы (2 мин)
├── books/
│   ├── page.tsx                # Каталог книг
│   └── [bookId]/
│       └── page.tsx            # Страница книги (превью, генерация)
├── generate/
│   └── [bookId]/
│       └── page.tsx            # Прогресс генерации (таймер, пуш)
├── player/
│   └── [bookId]/
│       └── page.tsx            # Аудиоплеер для ребёнка
└── api/
    ├── voice/
    │   ├── clone/route.ts      # POST: загрузка аудио → ElevenLabs clone
    │   └── status/route.ts     # GET: статус клонирования
    ├── generate/
    │   ├── route.ts            # POST: запуск генерации озвучки
    │   └── status/route.ts     # GET: статус генерации
    └── books/
        └── route.ts            # GET: список книг
```

### Ключевые модули

```
src/
├── components/
│   ├── ui/                     # Кнопки, карточки, прогресс-бары
│   ├── VoiceRecorder.tsx       # Компонент записи голоса (MediaRecorder API)
│   ├── AudioPlayer.tsx         # Детский плеер (крупные кнопки, яркий UI)
│   ├── BookCard.tsx            # Карточка книги в каталоге
│   └── OnboardingSlide.tsx     # Слайд онбординга
├── lib/
│   ├── elevenlabs.ts           # ElevenLabs API клиент (clone, tts, status)
│   ├── books.ts                # Каталог книг (текст, метаданные)
│   └── audio.ts                # Утилиты для работы с аудио (формат, валидация)
├── hooks/
│   ├── useVoiceRecorder.ts     # Хук записи голоса
│   └── useGenerationStatus.ts  # Polling статуса генерации
└── types/
    └── index.ts                # Общие типы (Book, Voice, Generation)
```

### ElevenLabs интеграция

1. **Voice Cloning** (`/api/voice/clone`): Instant Voice Cloning — загрузка аудиосэмпла, получение voice_id
2. **Text-to-Speech** (`/api/generate`): Генерация озвучки книги с клонированным голосом
3. **Статус** (`/api/generate/status`): Проверка готовности (polling с клиента)

### Хранение данных (MVP)

- **Voice samples**: временное хранение в `/tmp` или Vercel Blob
- **Generated audio**: Vercel Blob Storage
- **Книги**: статический JSON/TS файл (каталог из 5-10 книг для MVP)
- **User state**: localStorage (voice_id, выбранные книги, статус генерации)

## CJM (Customer Journey Map)

1. **Лендинг** → кнопка "Начать"
2. **Онбординг** → 3 слайда: зачем, как работает, что нужно
3. **Туториал** → пошаговая инструкция по записи голоса
4. **Запись голоса** → MediaRecorder, 2 минуты, советы по качеству (тихая комната, расстояние до микрофона)
5. **Каталог книг** → выбрать книгу для озвучки
6. **Генерация** → прогресс-бар, примерное время, уведомление когда готово
7. **Плеер** → крупные кнопки, яркий детский дизайн, авто-пауза

## Ключевые решения

- **Mobile-first**: весь UI оптимизирован под мобильные устройства (мама записывает с телефона)
- **Нет авторизации в MVP**: всё на localStorage + voice_id от ElevenLabs
- **Статический каталог книг**: не тратим время на CMS, 5-10 книг хардкодом
- **Polling вместо WebSocket**: для статуса генерации проще и надёжнее на Vercel
- **Детский плеер отдельный роут**: чтобы мама могла дать телефон ребёнку без доступа к остальному UI

## Команды

```bash
npm run dev      # Запуск dev-сервера (порт 3000)
npm run build    # Билд для продакшена
npm run lint     # ESLint
```

## Переменные окружения

```
ELEVENLABS_API_KEY=         # API ключ ElevenLabs
BLOB_READ_WRITE_TOKEN=      # Vercel Blob Storage (опционально для MVP)
```
