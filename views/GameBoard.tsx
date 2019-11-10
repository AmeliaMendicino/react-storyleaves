import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';

import Card from '../components/Card';

import { DeckType, CardType, shuffleDeck, loadDeck, getReshuffleCard, calculateReshuffles } from '../modules/cards';
import { DOUBLE_PRESS_DELAY, saveGameId, decks, DeckObject } from '../constants';

// TODO: calculate these or something...
const startLeft = 20;
const startTop = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  startButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

/**
 * A helper Component to give a bit of vertical whitespace
 */
function Separator(): JSX.Element {
  return <View style={styles.separator} />;
}

interface GameBoardState {
  /** The name of the game we're playing, typically the name of the deck we're using. */
  gameName: string;
  /** The deck of cards we'll be playing with. Each card holds its own position and data. */
  deck: DeckType;
  /** Indicates if the game has started and reshuffles have been added into the deck. */
  gameStarted: boolean;
  /** Indicates if we should should show the loading spinner while save data is loading. */
  loading: boolean;
}

/**
 * The Game Board Component that handles the Storyleaves game and Cards
 */
export default class GameBoard extends PureComponent<{}, GameBoardState> {
  /**
   * Used to determine if a card has been double tapped
   */
  lastCardTap = {
    number: null,
    time: null,
  };

  constructor(props) {
    super(props);
    this.state = { gameName: '', deck: [], gameStarted: false, loading: true };
  }

  componentDidMount(): void {
    // First check if we have any save data to load
    this.loadGame().then((state): void => {
      if (state !== null) {
        // Load the saved state into the GameBoard
        this.setState(state);
      } else {
        // We don't have a saved game, so start a new one randomly picked from the available decks
        const randomDeck = Math.floor(Math.random() * decks.length);
        this.newGame(decks[randomDeck]);
      }
      this.setState({ loading: false });
    });
  }

  /**
   * Starts a new game by loading and shuffling a deck of cards,
   * and then positioning them into the starting draw-deck location.
   *
   * @param gameDeck The deck of cards to start the new game with
   */
  newGame = (gameDeck: DeckObject): void => {
    const deck = shuffleDeck(loadDeck(gameDeck.cards, startLeft, startTop));
    this.setState({ gameName: gameDeck.name, deck, gameStarted: false }, this.saveGame);
  };

  /**
   * Saves the current state of the GameBoard into AsyncStorage
   * as a JSON object.
   */
  saveGame = (): void => {
    AsyncStorage.setItem(saveGameId, JSON.stringify(this.state));
  };

  /**
   * Loads a JSON GameBoard state from AsyncStorage and returns the
   * parsed object to be loaded into the GameBoard state.
   */
  loadGame = async (): Promise<GameBoardState> => {
    const saveData = await AsyncStorage.getItem(saveGameId);
    return JSON.parse(saveData);
  };

  /**
   * Clears out all the saved data
   */
  clearSave = (): void => {
    AsyncStorage.removeItem(saveGameId);
  };

  /**
   * Prompts the user if they want to start a new game with
   * one of the hard-coded decks available.
   */
  newGamePrompt = (): void => {
    // Create deck options from all available decks
    const deckOptions = decks.map((deck) => ({
      text: deck.name,
      onPress: (): void => {
        this.clearSave();
        this.newGame(deck);
      },
    }));
    Alert.alert('New Game?', 'Start a new game with one of the following decks?', [
      { text: 'Cancel', style: 'cancel' },
      ...deckOptions,
    ]);
  };

  /**
   * Starts a game by shuffling all of the unmarked cards back into
   * the draw deck position face down and adding the reshuffles into the deck.
   */
  startGame = (): void => {
    const { deck } = this.state;
    const markedCards = deck.filter((card) => card.marked);
    const unmarkedCards = deck
      .filter((card) => !card.marked)
      .map(
        (card): CardType => ({
          ...card,
          left: startLeft,
          top: startTop,
          flipped: true,
        }),
      );

    const reshuffles = calculateReshuffles(deck.length);
    for (let i = 0; i < reshuffles; i += 1) {
      unmarkedCards.push(getReshuffleCard(startLeft, startTop));
    }

    this.setState(
      {
        deck: [...shuffleDeck(unmarkedCards), ...markedCards],
        gameStarted: true,
      },
      this.saveGame,
    );
  };

  /**
   * Reshuffles all unmarked cards and moves them back
   * into the draw-deck position face down.
   */
  reshuffle = (): void => {
    const { deck } = this.state;
    const markedCards = deck.filter((card) => card.marked);
    const unmarkedCards = deck
      .filter((card) => !card.marked)
      .map(
        (card): CardType => ({
          ...card,
          left: startLeft,
          top: startTop,
          flipped: true,
        }),
      );
    this.setState({ deck: [...shuffleDeck(unmarkedCards), ...markedCards] }, this.saveGame);
  };

  /**
   * When a card is focused, re-order the deck so that the focused
   * card is rendered on top of all of the other cards.
   * Also flip it if it's not face-side up.
   *
   * If a double tap is detected on the card, it will toggle if the card is marked.
   *
   * @param number The number of the Card to draw on top of all other cards
   */
  focusCard = (number: number): void => {
    const { deck } = this.state;
    const now = Date.now();
    const doubleTapped = this.lastCardTap.number === number && now - this.lastCardTap.time < DOUBLE_PRESS_DELAY;

    const focusedCard = {
      ...deck.find((card) => card.number === number),
      flipped: false,
    };

    if (doubleTapped) {
      focusedCard.marked = !focusedCard.marked;
    } else {
      this.lastCardTap = { number, time: now };
    }

    this.setState({ deck: [...deck.filter((card) => card.number !== number), focusedCard] });
  };

  /**
   * Updates a card when it's finished moving by giving it its new coordinates
   * and then saving the Game Board state.
   */
  moveEnd = (number: number, left: number, top: number): void => {
    const { deck } = this.state;
    const focusedCard = {
      ...deck.find((card) => card.number === number),
      left,
      top,
    };
    this.setState({ deck: [...deck.filter((card) => card.number !== number), focusedCard] }, this.saveGame);
  };

  /**
   * A helper function to render a Card component
   */
  renderCard = ({ name, number, left, top, hue, upsideDown, flipped, marked }: CardType): JSX.Element => (
    <Card
      key={number}
      left={left}
      top={top}
      name={name}
      number={number}
      hue={hue}
      upsideDown={upsideDown}
      flipped={flipped}
      marked={marked}
      focus={this.focusCard}
      moveEnd={this.moveEnd}
    />
  );

  /**
   * The loading spinner used when we're retrieving save data
   */
  loading = (): JSX.Element => (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );

  render(): JSX.Element {
    const { gameName, deck, gameStarted, loading } = this.state;

    if (loading) {
      return this.loading();
    }

    return (
      <View style={styles.container}>
        <Text>{`Storyleaves: ${gameName}`}</Text>
        <Separator />
        <Text>Double-Tap a card to mark it (*) so it stays on the board</Text>
        <TouchableOpacity onLongPress={this.newGamePrompt}>
          <Text>Long press here to restart game</Text>
        </TouchableOpacity>
        {deck.map(this.renderCard)}
        <View style={styles.startButton}>
          {!gameStarted ? (
            <Button title="Start Game" onPress={this.startGame} />
          ) : (
            <Button title="Reshuffle" onPress={this.reshuffle} />
          )}
        </View>
      </View>
    );
  }
}
