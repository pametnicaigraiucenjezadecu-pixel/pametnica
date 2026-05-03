// ─── KidLearn — Serbian (ekavica) translations ────────────────────────────────

export const t = {
  // ── App
  appName: 'Pametnica',

  // ── Home / Welcome
  homeTagline: 'Učenje je zabavno!',
  homeStart: '🚀 Hajde da počnemo!',
  setupTitle: 'Ko si ti? 🌈',
  setupLabelName: 'Tvoje ime',
  setupPlaceholder: 'Upiši svoje ime...',
  setupLabelAvatar: 'Izaberi avatar!',
  btnPlay: 'Igraj!',
  errorNameShort: 'Upiši bar 2 slova!',
  errorNameLong: 'Ime je predugačko!',

  // ── Navigation
  btnBack: '← Nazad',
  btnMenu: '🏠 Meni',
  btnPlayAgain: 'Igraj ponovo',

  // ── World map
  worldMapTitle: 'Izaberi svet!',
  btnProgress: '🏆 Moj napredak',
  btnEndSession: '📊 Završi igranje',
  streak: (n: number) => `🔥 ${n} ${n === 1 ? 'dan' : 'dana'} zaredom!`,

  // ── Memory game
  memoryTitle: '🧠 Igra pamćenja',
  selectDifficulty: 'Izaberi težinu:',
  memoryWinTitle: 'Bravo!',
  memoryMoves: (n: number) => `👆 ${n} poteza`,

  // ── Alphabet
  alphabetTitle: '🔡 Azbuka',
  alphabetProgress: (n: number) => `${n} / 30 slova naučeno ⭐`,
  btnHear: '🔊 Čuj slovo!',
  btnLearned: '✅ Naučio/la sam!',
  learnedBadge: '🌟 Naučeno! +1 ⭐',
  alphabetComplete: '🎉 Sjajno! Znaš sva 30 slova azbuke! 🎉',
  toastLearned: (letter: string) => `🌟 Naučio/la si slovo ${letter}! +1 zvezda!`,
  letterPhrase: (phoneme: string, word: string) => `${phoneme}. Reč je ${word}`,

  // ── Shadow match
  shadowTitle: '🌑 Igra senki',
  shadowLevel: (n: number, total: number) => `Nivo ${n} od ${total}`,
  shadowInstruction: 'Pronađi pravu senku! 👇',
  shadowCorrect: '✅ Tačno!',
  shadowWrong: '❌ Pokušaj ponovo!',
  shadowDoneTitle: 'Sve urađeno!',
  shadowAccuracy: (n: number) => `Tačnost: ${n}%`,
  shadowSpeakCorrect: (name: string) => `Bravo! ${name}!`,
  shadowSpeakWrong: (name: string) => `Pokušaj ponovo! Traži ${name}`,

  // ── Progress screen
  progressTitle: '🏆 Moj napredak',
  progressTotalStars: 'Ukupno zvezda',
  progressAlphabet: 'Slova',
  progressMemory: 'Igra pamćenja',
  progressShadow: 'Igra senki',
  progressLetters: (n: number) => `${n} / 30 slova`,
  progressGames: (n: number) => `${n} ${n === 1 ? 'igra' : 'igara'} odigrana`,
  progressLevels: (n: number) => `${n} nivoa završeno`,
  progressBest: 'Najbolje:',
  badgesTitle: '🎖 Značke',

  // ── Session end
  sessionTitle: (name: string) => `Sjajno, ${name}!`,
  sessionSub: 'Evo šta si uradio/la danas:',
  sessionStarsLabel: 'Zvezde danas',
  sessionTimeLabel: 'Vreme igranja',
  sessionWorldsLabel: 'Svetovi',
  sessionRating: 'Ocena sesije:',
  sessionStreak: (n: number) => `🔥 ${n} dana zaredom! Nastavi tako!`,
  sessionTotal: (n: number) => `Ukupno zvezda: ⭐ ${n}`,
  btnKeepPlaying: 'Nastavi igru!',
  btnChangePlayer: 'Promeni igrača',

  // ── Module chips (session end)
  moduleMemory: '🧠 Svet pamćenja',
  moduleAlphabet: '🔤 Svet slova',
  moduleShadow: '🌑 Svet senki',

  // ── Difficulty labels
  difficultyEasy: 'Lako',
  difficultyMedium: 'Srednje',
  difficultyHard: 'Teško',

  // ── Notifications
  notifWorldTitle: (name: string) => `${name} otključan!`,
  notifWorldMsg: (name: string) => `Možeš da igraš ${name}!`,
  notifBadgeTitle: 'Nova značka!',

  // ── Sound toggle
  soundOn: '🔊',
  soundOff: '🔇',
};
