import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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
import { DOUBLE_PRESS_DELAY } from '../constants';
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
}

export default class GameBoard extends PureComponent<{}, GameBoardState> {
  gameStarted = false;

  lastCardTap = {
    number: null,
    time: null,
  };

  constructor(props) {
    super(props);
    const deck = shuffleDeck(loadDeck(fantasyDeck, startLeft, startTop));
    this.state = { deck };
  }

  reshuffle = (): void => {
    const { deck } = this.state;
    const newDeck = shuffleDeck(returnToDeck(deck, startLeft, startTop));
    this.setState({ deck: newDeck });
  };

  startGame = (): void => {
    const { deck } = this.state;
    const newDeck = returnToDeck(deck, startLeft, startTop);

    const reshuffles = calculateReshuffles(newDeck.length);
    for (let i = 0; i < reshuffles; i += 1) {
      newDeck.push(getReshuffleCard(startLeft, startTop));
    }

    this.gameStarted = true;
    this.setState({ deck: shuffleDeck(newDeck) });
  };

  renderCard = ({ name, number, left, top, hue, upsideDown, flipped, marked }: CardType): JSX.Element => (
    <Card
      key={number}
      left={left}
      top={top}
      name={name}
      number={number}
      hue={hue}
      focus={this.focusCard}
      upsideDown={upsideDown}
      flipped={flipped}
      marked={marked}
    />
  );

  /**
   * When a card is focused, re-order the deck so that the focused
   * card is rendered on top of all of the other cards.
   * Also flip it if it's not face-side up.
   *
   * If a double tap is detected on the card, it will toggle if the card is marked.
   *
   * @param number The number of the Card to draw on top of all other cards
   * @param position The current position of the Card
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

  render(): JSX.Element {
    const { deck } = this.state;
    return (
      <View style={styles.container}>
        <Text>Storyleaves</Text>
        <Text>Double-Tap a card to mark it (*) so it stays on the board</Text>
        <Separator />
        {deck.map(this.renderCard)}
        <View style={styles.startButton}>
          {!this.gameStarted ? (
            <Button title="Start Game" onPress={this.startGame} />
          ) : (
            <Button title="Reshuffle" onPress={this.reshuffle} />
          )}
        </View>
      </View>
    );
  }
}
