import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Card from '../components/Card';

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

export default class GameBoard extends PureComponent {
  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <Text>Game Board</Text>
        <Separator />
        <Card left={100} top={100} name="Dragon" number={2} hue={1} />
      </View>
    );
  }
}
