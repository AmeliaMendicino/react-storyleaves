import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Card from '../components/Card';

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
  deck: {
    name: string;
    number: number;
    left: number;
    top: number;
    hue: number;
  }[];
}

export default class GameBoard extends PureComponent<{}, GameBoardState> {
  constructor(props) {
    super(props);
    let pos = 0;
    this.state = {
      deck: fantasyDeck.map(({ number, name }) => {
        pos += 1;
        return {
          name,
          number,
          left: pos,
          top: pos * 4,
          hue: pos * 7,
        };
      }),
    };
  }

  /**
   * When a card is focused, re-order the deck so that the focused
   * card is rendered on top of all of the other cards.
   *
   * @param number The number of the Card to draw on top of all other cards
   */
  focusCard = (number: number): void => {
    const { deck } = this.state;
    this.setState({
      deck: [...deck.filter((card) => card.number !== number), deck.find((card) => card.number === number)],
    });
  };

  render(): JSX.Element {
    const { deck } = this.state;
    return (
      <View style={styles.container}>
        <Text>Game Board</Text>
        <Separator />
        {deck.map(({ name, number, left, top, hue }) => (
          <Card key={number} left={left} top={top} name={name} number={number} hue={hue} focus={this.focusCard} />
        ))}
      </View>
    );
  }
}
