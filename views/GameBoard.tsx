import React from 'react';
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

export default function GameBoard(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Game Board</Text>
      <Separator />
      <Card name="Dragon" number={2} />
    </View>
  );
}
