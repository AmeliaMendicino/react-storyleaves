import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Card from '../components/Card';

import { DeckType, CardType, shuffleDeck, loadDeck, returnToDeck } from '../modules/cards';
import { DOUBLE_PRESS_DELAY } from '../constants';
import fantasyDeck from '../constants/fantasyDeck';

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
  lastCardTap = {
    number: null,
    time: null,
  };

  constructor(props) {
    super(props);
    const deck = shuffleDeck(loadDeck(fantasyDeck));
    this.state = { deck };
  }

  startGame = (): void => {
    const { deck } = this.state;
    this.setState({ deck: shuffleDeck(returnToDeck(deck, 20, 40)) });
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
        <Separator />
        {deck.map(this.renderCard)}
        <View style={styles.startButton}>
          <Button title="Start Game" onPress={this.startGame} />
        </View>
      </View>
    );
  }
}
