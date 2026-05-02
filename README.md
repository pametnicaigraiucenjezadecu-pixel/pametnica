# KidLearn — Educational Game Platform for Children (5–7)

Interactive educational app built with React 19 + Vite 8 + TypeScript 6.
Teaches letters, memory, and visual perception through game-based learning.

---

## ⚡ Quick Start (Windows)

**Option A — double-click (easiest):**
```
Double-click  start.bat
```

**Option B — terminal (Command Prompt or PowerShell):**
```bat
cd "C:\Users\PC\Desktop\Interaktivna aplikacija za decu\edu-kids"
npm install
npm run dev
```

Then open: **http://localhost:5173**

> ⚠️ IMPORTANT: Always run commands from inside the `edu-kids\` folder.
> If you get `ENOENT: package.json not found`, you are in the wrong folder.

---

## 📦 Commands

| Command | What it does |
|---------|--------------|
| `npm install` | Install dependencies (run once) |
| `npm run dev` | Dev server at http://localhost:5173 |
| `npm run build` | Production bundle → `dist/` |
| `npm run preview` | Preview production build |

---

## 🏗 Architecture

```
edu-kids/
├── src/
│   │
│   ├── core/                  ← Business logic (framework-independent)
│   │   ├── GameStore.tsx      ← Single source of truth (React Context)
│   │   ├── ProgressEngine.ts  ← Badge unlock rules (pure functions)
│   │   ├── UnlockEngine.ts    ← World progression rules (pure functions)
│   │   ├── SessionEngine.ts   ← Play session + daily streak
│   │   ├── StorageService.ts  ← localStorage I/O
│   │   └── index.ts           ← Public barrel: import from '@core'
│   │
│   ├── modules/               ← Self-contained game modules
│   │   ├── alphabet/          ← AlphabetModule — A to Z with speech
│   │   │   ├── AlphabetModule.tsx
│   │   │   └── LetterCard.tsx
│   │   ├── memory/            ← MemoryGame — 3D card matching
│   │   │   ├── MemoryGame.tsx
│   │   │   └── MemoryCard.tsx
│   │   ├── shadow/            ← ShadowMatch — silhouette recognition
│   │   │   └── ShadowMatch.tsx
│   │   └── index.ts           ← Public barrel: import from '@modules'
│   │
│   ├── ui/                    ← Presentation layer
│   │   ├── components/        ← Button, Modal, StarDisplay
│   │   │   └── index.ts       ← import from '@ui/components'
│   │   └── screens/           ← HomeScreen, WorldMapScreen, etc.
│   │       └── index.ts       ← import from '@ui/screens'
│   │
│   ├── data/                  ← Static game content
│   │   ├── alphabet.ts        ← 26 letters with emoji + phonemes
│   │   ├── memoryCards.ts     ← Card sets + difficulty config
│   │   └── shadowItems.ts     ← 9 shadow matching levels
│   │
│   ├── hooks/                 ← Custom React hooks
│   │   ├── useAudio.ts
│   │   └── useTimer.ts
│   │
│   ├── services/              ← External API wrappers
│   │   ├── audio.ts           ← Web Speech API + Web Audio API
│   │   ├── storage.ts         ← localStorage implementation
│   │   ├── worlds.ts          ← World unlock computation
│   │   └── session.ts         ← Session/streak implementation
│   │
│   ├── types/index.ts         ← All TypeScript interfaces
│   ├── App.tsx                ← Root + state-based router
│   ├── main.tsx               ← React entry point
│   └── index.css              ← Global design system + animations
│
├── dist/                      ← Production build (copy anywhere)
├── start.bat                  ← Windows one-click launcher
├── build.bat                  ← Windows one-click build
└── package.json
```

---

## 🎮 Game Modules

### 🧠 Memory World
- 3D CSS card flip animation
- 3 difficulty levels: Easy (4 pairs), Medium (6 pairs), Hard (8 pairs)
- Move counter + live timer
- 1–3 star scoring based on moves

### 🔤 Letter Land
- Full A–Z grid (26 letters)
- Click any letter → focus card with emoji illustration
- 🔊 Web Speech API pronunciation (no audio files needed)
- Track learned letters — earn 1 star per letter

### 🌑 Shadow Realm
- 9 progressive difficulty levels
- CSS `filter: brightness(0)` creates silhouettes (no image files!)
- Accuracy-based 1–3 star rating

---

## 🔓 Progression & Unlock System

| World | Status |
|-------|--------|
| 🧠 Memory World | Always available |
| 🔤 Letter Land | Unlocks after completing 1 Memory game |
| 🌑 Shadow Realm | Unlocks after learning 5 letters |

Badges (9 total): Memory Master, ABC Hero, Shadow Hunter, Star Collector,
Superstar, Perfect Match, 3-Day Streak, Explorer, Shadow Walker.

---

## 💾 Data Storage

All data saved in browser `localStorage` — no backend, works offline.

| Key | Contents |
|-----|---------|
| `kidlearn_profile` | Child name + avatar index |
| `kidlearn_progress` | Stars, badges, scores, sessions, streak |

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Vite | 8 | Build tool + HMR dev server |
| Web Speech API | browser built-in | Word pronunciation |
| Web Audio API | browser built-in | Game sound effects |
| localStorage | browser built-in | Data persistence |

> Zero external UI libraries. Zero audio files. Zero image files.
> All visuals are emoji — fully portable, works offline immediately.

---

## 🔧 Path Aliases

Use these in new code instead of long relative paths:

```typescript
import { useGameStore }  from '@core';
import { Button }        from '@ui/components';
import { MemoryGame }    from '@modules';
import { ALPHABET_DATA } from '@data/alphabet';
import { useTimer }      from '@hooks/useTimer';
```

Aliases are configured in `vite.config.ts` and `tsconfig.app.json`.

---

## 📦 Portable Deployment

The `dist/` folder is fully self-contained:

1. `npm run build`
2. Copy `dist/` anywhere — USB drive, web server, ZIP, GitHub Pages
3. Open `dist/index.html` in Chrome/Edge/Firefox
