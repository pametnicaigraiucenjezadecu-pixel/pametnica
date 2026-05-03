# Pametnica — Edukativna aplikacija za djecu

Interaktivna web aplikacija za učenje srpskog pisma.  
Namijenjena djeci uzrasta **5 godina**.

---

## Šta je Pametnica?

Pametnica je edukativna igra koja pomaže djeci da uče:

- **Srpsku azbuku** — sva 30 slova ćirilice (А–Ш)
- **Pamćenje** — igra okretanja karata (sparivanje parova)
- **Igra senki** — prepoznavanje silueta predmeta

Sve je na srpskom jeziku. Nema engleskog. Nema instalacije.

---

## Kome je namijenjena?

| | |
|---|---|
| **Uzrast** | 5 godina (predškolski uzrast) |
| **Jezik** | Srpski (ekavica) |
| **Pismo** | Ćirilica (podrazumijevano) + latinica (prebacivo) |
| **Uređaj** | Mobilni telefon, tablet, računar |

---

## Kako se koristi — korak po korak

**1. Pokreni aplikaciju**
```
npm install
npm run dev
```
Otvori: `http://localhost:5173`

**2. Unesi ime i izaberi avatar**
- Dijete upiše svoje ime
- Izabere omiljeni avatar (mačka, pas, zec...)
- Pritisne "Igraj!"

**3. Izaberi igru**

| Igra | Opis |
|------|------|
| 🧠 Igra pamćenja | Okreni kartice, pronađi par |
| 🔡 Azbuka | Uči slova ćirilice, čuj izgovor |
| 🌑 Igra senki | Pronađi pravu siluetu |

**4. Skupljaj zvjezdice ⭐ i značke 🏆**

---

## Azbuka — 30 slova

```
А Б В Г Д Ђ Е Ж З И Ј К Л Љ М Н Њ О П Р С Т Ћ У Ф Х Ц Ч Џ Ш
```

Svako slovo ima:
- Primjer riječi (Avion, Buba, Voz...)
- Odgovarajući emoji
- Izgovor (Web Speech API)

Prekidač **Ћир / Lat** mijenja pismo za cijelu aplikaciju.

---

## Zvuk i govor

- Zvučni efekti — Web Audio API (bez audio fajlova)
- Govor — Web Speech API, srpski glas (sr-RS)
- Dugme 🔊/🔇 isključuje/uključuje zvuk

---

## Čuvanje podataka

Sve se čuva automatski u browseru (localStorage).  
Nema servera, radi bez interneta.

| Ključ | Sadržaj |
|-------|---------|
| `kidlearn_profile` | Ime + avatar |
| `kidlearn_progress` | Zvjezdice, značke, naučena slova |
| `pametnica_saved_game` | Prekinuta igra (za nastavak) |
| `kidlearn_sound` | Zvuk uključen/isključen |

---

## Tehnologije

| Alat | Verzija | Namjena |
|------|---------|---------|
| React | 19 | UI framework |
| TypeScript | 6 | Tipska sigurnost |
| Vite | 8 | Build + dev server |
| Web Speech API | ugrađen | Izgovor srpskih riječi |
| Web Audio API | ugrađen | Zvučni efekti |
| localStorage | ugrađen | Čuvanje napretka |

> Nema vanjskih UI biblioteka.  
> Nema audio fajlova — zvuk se generiše programski.  
> Nema slika — koriste se emoji.

---

## Build za produkciju (Vercel)

```
npm run build
```

Folder `dist/` je spreman za deploy.  
`.npmrc` sadrži `legacy-peer-deps=true` (potrebno za Vite 8 + PWA plugin).

---

## Struktura projekta

```
src/
├── data/           ← Sadržaj igara (slova, kartice, siluete)
├── modules/        ← Igre (alphabet, memory, shadow)
├── screens/        ← Ekrani (Home, Menu, Progress, SessionEnd)
├── services/       ← Audio, govor, storage, sesije
├── context/        ← AppContext (globalno stanje)
├── components/     ← UI komponente (Button, Modal, StarDisplay)
├── hooks/          ← useScript, useTimer, useAudio
└── types/          ← TypeScript interfejsi
```
