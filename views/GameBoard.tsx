import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import StoryTextInput from '../components/StoryTextInput';
import { saveKey } from '../constants';

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
});

function Separator(): JSX.Element {
  return <View style={styles.separator} />;
}

export default function GameBoard(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Hello, Storyleaves! Testing GameBoard PRO</Text>
      <Separator />
      <StoryTextInput />
      <Separator />
      <Button title="Clear" onPress={(): Promise<void> => AsyncStorage.removeItem(saveKey)} />
    </View>
  );
}
