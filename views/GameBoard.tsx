import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, Alert, TouchableOpacity } from 'react-native';

import Card from '../components/Card';

import {
  DeckType,
  CardType,
  shuffleDeck,
  loadDeck,
  returnToDeck,
  getReshuffleCard,
  calculateReshuffles,
} from '../modules/cards';
import { DOUBLE_PRESS_DELAY, saveGameId } from '../constants';
import fantasyDeck from '../constants/fantasyDeck';

// TODO: calculate these or something...
const startLeft = 20;
const startTop = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
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

function Separator(): JSX.Element {
  return <View style={styles.separator} />;
}

interface GameBoardState {
  deck: DeckType;
  gameStarted: boolean;
}

export default class GameBoard extends PureComponent<{}, GameBoardState> {
  lastCardTap = {
    number: null,
    time: null,
  };

  constructor(props) {
    super(props);
    this.state = { deck: [], gameStarted: false };
  }

  componentDidMount(): void {
    this.loadGame().then((state): void => {
      if (state !== null) {
        // Load the saved state into the GameBoard
        this.setState(state);
      } else {
        // We don't have a saved game, so start a new one
        this.newGame();
      }
    });
  }

  newGame = (): void => {
    const deck = shuffleDeck(loadDeck(fantasyDeck, startLeft, startTop));
    this.setState({ deck, gameStarted: false });
  };

  reshuffle = (): void => {
    const { deck } = this.state;
    const newDeck = shuffleDeck(returnToDeck(deck, startLeft, startTop));
    this.setState({ deck: newDeck });
  };

  saveGame = (): void => {
    AsyncStorage.setItem(saveGameId, JSON.stringify(this.state));
  };

  loadGame = async (): Promise<GameBoardState> => {
    const saveData = await AsyncStorage.getItem(saveGameId);
    return JSON.parse(saveData);
  };

  clearSave = (): void => {
    AsyncStorage.removeItem(saveGameId);
  };

  newGamePrompt = (): void => {
    Alert.alert('New Game?', 'Would you like to start a new game?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: (): void => {
          this.clearSave();
          this.newGame();
        },
      },
    ]);
  };

  startGame = (): void => {
    const { deck } = this.state;
    const newDeck = returnToDeck(deck, startLeft, startTop);

    const reshuffles = calculateReshuffles(newDeck.length);
    for (let i = 0; i < reshuffles; i += 1) {
      newDeck.push(getReshuffleCard(startLeft, startTop));
    }

    this.setState({ deck: shuffleDeck(newDeck), gameStarted: true });
  };

  /**
   * When a card is focused, re-order the deck so that the focused
   * card is rendered on top of all of the other cards.
   * Also flip it if it's not face-side up.
   *
   * If a double tap is detected on the card, it will toggle if the card is marked.
   *
   * @param number The number of the Card to draw on top of all other cards
   * @param left The current left position of the Card
   * @param top The current top position of the Card
   */
  focusCard = (number: number, left: number, top: number): void => {
    const { deck } = this.state;
    const now = Date.now();
    const doubleTapped = this.lastCardTap.number === number && now - this.lastCardTap.time < DOUBLE_PRESS_DELAY;

    const focusedCard = deck.find((card) => card.number === number);
    focusedCard.flipped = false;
    focusedCard.left = left;
    focusedCard.top = top;

    if (doubleTapped) {
      focusedCard.marked = !focusedCard.marked;
    } else {
      this.lastCardTap = { number, time: now };
    }

    this.setState({ deck: [...deck.filter((card) => card.number !== number), focusedCard] });
  };

  moveEnd = (number: number, left: number, top: number): void => {
    const { deck } = this.state;
    const focusedCard = deck.find((card) => card.number === number);
    focusedCard.left = left;
    focusedCard.top = top;
    this.saveGame();
  };

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

  render(): JSX.Element {
    const { deck, gameStarted } = this.state;
    return (
      <View style={styles.container}>
        <Text>Storyleaves</Text>
        <Text>Double-Tap a card to mark it (*) so it stays on the board</Text>
        <TouchableOpacity onLongPress={this.newGamePrompt}>
          <Text>Long press here to restart game</Text>
        </TouchableOpacity>
        <Separator />
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
