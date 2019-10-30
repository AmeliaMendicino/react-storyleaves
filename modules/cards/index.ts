export interface CardType {
  name: string;
  number: number;
  left: number;
  top: number;
  hue: number;
  upsideDown?: boolean;
}

export type DeckType = CardType[];

/**
 * A small helper function to determine if a card should be flipped
 * upsideDown or not.
 *
 * @return True if the card should be flipped upside-down
 */
function flipCard(): boolean {
  return Math.random() >= 0.5;
}

/**
 * Shuffles a deck of cards using the Knuth-Fisher-Yates shuffle algorithm.
 * Whenever we're switching cards, we'll also randomly decide if
 * one of them should be flipped upside-down.
 *
 * @todo Should we look into proper upside-down distribution in deck shuffling?
 * @param deck A deck of cards to shuffle
 * @return DeckType A copy of the deck with positions randomized and some cards flipped
 */
export function shuffleDeck(deck: DeckType): DeckType {
  const temp = [...deck];

  for (let i = temp.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    temp[i].upsideDown = flipCard();
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  return temp;
}

/**
 * Takes a saved set of cards and loads it into a Deck, assigning colors
 * based on type.
 */
export function loadDeck(cards): DeckType {
  const colors = [];

  const deck = cards.map(({ number, name, type }) => {
    // Check if we already have the color for the type of card
    if (!colors.includes(type)) {
      colors.push(type);
    }
    // Determine the hue of the card based on type
    const hue = 1 + colors.indexOf(type) * 30;
    return {
      name,
      number,
      left: 0,
      top: 0,
      hue,
    };
  });

  return deck;
}

export default { shuffleDeck, loadDeck };
