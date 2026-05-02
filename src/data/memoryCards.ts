import type { MemoryCardData } from '../types';

export const ALL_MEMORY_CARDS: MemoryCardData[] = [
  // Voće
  { id: 'apple',      emoji: '🍎', name: 'Jabuka',     category: 'fruits' },
  { id: 'banana',     emoji: '🍌', name: 'Banana',     category: 'fruits' },
  { id: 'cherry',     emoji: '🍒', name: 'Trešnja',    category: 'fruits' },
  { id: 'grapes',     emoji: '🍇', name: 'Grožđe',     category: 'fruits' },
  { id: 'orange',     emoji: '🍊', name: 'Narandža',   category: 'fruits' },
  { id: 'strawberry', emoji: '🍓', name: 'Jagoda',     category: 'fruits' },
  { id: 'watermelon', emoji: '🍉', name: 'Lubenica',   category: 'fruits' },
  { id: 'pineapple',  emoji: '🍍', name: 'Ananas',     category: 'fruits' },

  // Životinje
  { id: 'cat',     emoji: '🐱', name: 'Mačka',    category: 'animals' },
  { id: 'dog',     emoji: '🐶', name: 'Pas',      category: 'animals' },
  { id: 'rabbit',  emoji: '🐰', name: 'Zec',      category: 'animals' },
  { id: 'fox',     emoji: '🦊', name: 'Lisica',   category: 'animals' },
  { id: 'bear',    emoji: '🐻', name: 'Medved',   category: 'animals' },
  { id: 'penguin', emoji: '🐧', name: 'Pingvin',  category: 'animals' },
  { id: 'lion',    emoji: '🦁', name: 'Lav',      category: 'animals' },
  { id: 'frog',    emoji: '🐸', name: 'Žaba',     category: 'animals' },

  // Vozila
  { id: 'car',        emoji: '🚗', name: 'Auto',       category: 'vehicles' },
  { id: 'bus',        emoji: '🚌', name: 'Autobus',    category: 'vehicles' },
  { id: 'rocket',     emoji: '🚀', name: 'Raketa',     category: 'vehicles' },
  { id: 'bicycle',    emoji: '🚲', name: 'Bicikl',     category: 'vehicles' },
  { id: 'airplane',   emoji: '✈️', name: 'Avion',      category: 'vehicles' },
  { id: 'boat',       emoji: '⛵', name: 'Čamac',      category: 'vehicles' },
  { id: 'train',      emoji: '🚂', name: 'Voz',        category: 'vehicles' },
  { id: 'helicopter', emoji: '🚁', name: 'Helikopter', category: 'vehicles' },
];

export const DIFFICULTY_CONFIG = {
  easy:   { pairs: 4,  cols: 4, label: 'Lako',    emoji: '⭐' },
  medium: { pairs: 6,  cols: 4, label: 'Srednje', emoji: '⭐⭐' },
  hard:   { pairs: 8,  cols: 4, label: 'Teško',   emoji: '⭐⭐⭐' },
};

export const STAR_THRESHOLDS = {
  easy:   { three: 10, two: 16 },
  medium: { three: 14, two: 22 },
  hard:   { three: 18, two: 28 },
};
