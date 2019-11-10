/**
 * A clichéd deck to create your own anime/manga stories.
 */
const animeDeck = [
  { number: 1, name: 'High schooler', type: 'Character' },
  { number: 2, name: 'Secret Identity', type: 'Aspect' },
  { number: 3, name: 'Alter Ego', type: 'Aspect' },
  { number: 4, name: 'Transform', type: 'Aspect' },
  { number: 5, name: 'Confession', type: 'Event' },
  { number: 6, name: 'Battle', type: 'Event' },
  { number: 7, name: 'Giant', type: 'Aspect' },
  { number: 8, name: 'Gender Bender', type: 'Aspect' }, // { number: 8, name: 'Kaiju', type: 'Character' },
  { number: 9, name: 'Amnesia', type: 'Aspect' },
  { number: 10, name: 'Animal Aspect', type: 'Aspect' },
  { number: 11, name: 'Yōkai', type: 'Character' },
  { number: 12, name: 'Kaitou', type: 'Character' },
  { number: 13, name: 'Detective', type: 'Character' },
  { number: 14, name: 'Alien', type: 'Character' },
  { number: 15, name: 'Ghost', type: 'Character' },
  { number: 16, name: 'Robot', type: 'Character' },
  { number: 17, name: 'ESPer', type: 'Character' },
  { number: 18, name: 'Senpai', type: 'Aspect' },
  { number: 19, name: 'ゴゴゴゴゴ', type: 'Detail' },
  { number: 20, name: 'Heist', type: 'Event' },
  { number: 21, name: '-dere', type: 'Aspect' },
  { number: 22, name: 'Yankee', type: 'Character' },
  { number: 23, name: 'Date', type: 'Event' },
  { number: 24, name: 'Ninja', type: 'Character' },
  { number: 25, name: 'Samurai', type: 'Character' },
  { number: 26, name: 'Omiai', type: 'Event' },
  { number: 27, name: 'Idol', type: 'Character' },
  { number: 28, name: 'Sensei', type: 'Character' },
  { number: 29, name: 'Highschool', type: 'Place' },
  { number: 30, name: 'Cherry Blossoms', type: 'Detail' },
  { number: 31, name: 'Shoujo Sparkles', type: 'Detail' },
  { number: 32, name: 'Salaryman', type: 'Character' },
  { number: 33, name: 'Office Lady', type: 'Character' },
  { number: 34, name: 'Gaijin', type: 'Character' },
  { number: 35, name: 'Otaku', type: 'Character' },
  { number: 36, name: 'Katana', type: 'Item' },
  { number: 37, name: 'Train Station', type: 'Place' },
  { number: 38, name: 'Beach', type: 'Place' },
  { number: 39, name: 'The City', type: 'Place' },
  { number: 40, name: 'Fabulous', type: 'Detail' },
  { number: 41, name: 'Sailor Fuku', type: 'Item' },
  { number: 42, name: 'Pantsu', type: 'Item' },
  { number: 43, name: 'Magatama', type: 'Item' },
  { number: 44, name: 'Cell phone', type: 'Item' },
  { number: 45, name: '「Food」', type: 'Item' },
  { number: 46, name: 'Crowds', type: 'Detail' },
  { number: 47, name: 'Onsen', type: 'Place' },
  { number: 48, name: 'Park', type: 'Place' },
  { number: 49, name: 'Nostalgia', type: 'Detail' },
  { number: 50, name: 'Mt. Fuji', type: 'Detail' },
];

const deckMeta = {
  name: 'Anime Deck',
  description: 'A clichéd deck to create your own anime/manga stories.',
  cards: animeDeck,
};

export default deckMeta;
