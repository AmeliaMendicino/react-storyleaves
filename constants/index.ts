import animeDeck from './animeDeck';
import fantasyDeck from './fantasyDeck';

export type CardObject = { number: number; name: string; type: string };
export type DeckObject = { name: string; description: string; cards: CardObject[] };
/**
 * An array of hard-coded decks to play with
 */
export const decks: DeckObject[] = [animeDeck, fantasyDeck];

/**
 * The key to be used for AsyncStorage
 */
export const saveGameId = 'Storyleaves:GameBoard';

/**
 * The number of milliseconds to count for a double tap
 */
export const DOUBLE_PRESS_DELAY = 300;
