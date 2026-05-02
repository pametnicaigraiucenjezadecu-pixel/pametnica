import type { ShadowLevel } from '../types';

export const SHADOW_LEVELS: ShadowLevel[] = [
  {
    level: 1,
    target:  { id: 'cat',    emoji: '🐱', name: 'Mačka' },
    options: [
      { id: 'cat',    emoji: '🐱', name: 'Mačka' },
      { id: 'fish',   emoji: '🐟', name: 'Riba' },
      { id: 'ball',   emoji: '⚽', name: 'Lopta' },
    ],
  },
  {
    level: 2,
    target:  { id: 'star',   emoji: '⭐', name: 'Zvezda' },
    options: [
      { id: 'circle', emoji: '🔵', name: 'Krug' },
      { id: 'star',   emoji: '⭐', name: 'Zvezda' },
      { id: 'heart',  emoji: '❤️', name: 'Srce' },
    ],
  },
  {
    level: 3,
    target:  { id: 'rocket', emoji: '🚀', name: 'Raketa' },
    options: [
      { id: 'car',    emoji: '🚗', name: 'Auto' },
      { id: 'rocket', emoji: '🚀', name: 'Raketa' },
      { id: 'boat',   emoji: '⛵', name: 'Čamac' },
    ],
  },
  {
    level: 4,
    target:  { id: 'elephant', emoji: '🐘', name: 'Slon' },
    options: [
      { id: 'pig',      emoji: '🐷', name: 'Svinja' },
      { id: 'elephant', emoji: '🐘', name: 'Slon' },
      { id: 'cow',      emoji: '🐮', name: 'Krava' },
      { id: 'horse',    emoji: '🐴', name: 'Konj' },
    ],
  },
  {
    level: 5,
    target:  { id: 'tree',  emoji: '🌳', name: 'Drvo' },
    options: [
      { id: 'tree',    emoji: '🌳', name: 'Drvo' },
      { id: 'cactus',  emoji: '🌵', name: 'Kaktus' },
      { id: 'flower',  emoji: '🌸', name: 'Cvet' },
      { id: 'mushroom',emoji: '🍄', name: 'Pečurka' },
    ],
  },
  {
    level: 6,
    target:  { id: 'banana', emoji: '🍌', name: 'Banana' },
    options: [
      { id: 'apple',  emoji: '🍎', name: 'Jabuka' },
      { id: 'grapes', emoji: '🍇', name: 'Grožđe' },
      { id: 'banana', emoji: '🍌', name: 'Banana' },
      { id: 'cherry', emoji: '🍒', name: 'Trešnja' },
    ],
  },
  {
    level: 7,
    target:  { id: 'penguin', emoji: '🐧', name: 'Pingvin' },
    options: [
      { id: 'penguin', emoji: '🐧', name: 'Pingvin' },
      { id: 'owl',     emoji: '🦉', name: 'Sova' },
      { id: 'duck',    emoji: '🦆', name: 'Patka' },
      { id: 'chick',   emoji: '🐥', name: 'Pilić' },
    ],
  },
  {
    level: 8,
    target:  { id: 'train', emoji: '🚂', name: 'Voz' },
    options: [
      { id: 'bus',   emoji: '🚌', name: 'Autobus' },
      { id: 'car',   emoji: '🚗', name: 'Auto' },
      { id: 'train', emoji: '🚂', name: 'Voz' },
      { id: 'tram',  emoji: '🚋', name: 'Tramvaj' },
    ],
  },
  {
    level: 9,
    target:  { id: 'lion', emoji: '🦁', name: 'Lav' },
    options: [
      { id: 'lion',    emoji: '🦁', name: 'Lav' },
      { id: 'tiger',   emoji: '🐯', name: 'Tigar' },
      { id: 'leopard', emoji: '🐆', name: 'Leopard' },
      { id: 'bear',    emoji: '🐻', name: 'Medved' },
    ],
  },
];
