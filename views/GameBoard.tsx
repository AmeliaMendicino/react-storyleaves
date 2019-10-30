import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Card from '../components/Card';

import { DeckType, shuffleDeck, loadDeck } from '../modules/cards';
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
});

function Separator(): JSX.Element {
  return <View style={styles.separator} />;
}

interface GameBoardState {
  deck: DeckType;
}

export default class GameBoard extends PureComponent<{}, GameBoardState> {
  constructor(props) {
    super(props);
    const deck = shuffleDeck(loadDeck(fantasyDeck));
    this.state = { deck };
  }

  /**
   * When a card is focused, re-order the deck so that the focused
   * card is rendered on top of all of the other cards.
   * Also flip it if it's not face-side up.
   *
   * @param number The number of the Card to draw on top of all other cards
   */
  focusCard = (number: number): void => {
    const { deck } = this.state;
    const focusedCard = deck.find((card) => card.number === number);
    focusedCard.flipped = false;
    this.setState({
      deck: [...deck.filter((card) => card.number !== number), focusedCard],
    });
  };

  render(): JSX.Element {
    const { deck } = this.state;
    return (
      <View style={styles.container}>
        <Text>Storyleaves</Text>
        <Separator />
        {deck.map(({ name, number, left, top, hue, upsideDown, flipped }) => (
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
          />
        ))}
      </View>
    );
  }
}
