import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import StoryTextInput from '../components/StoryTextInput';
import PanResponderExample from '../components/PanResponderExample';

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
      <PanResponderExample left={28} top={48} color="red" />
      <PanResponderExample left={38} top={58} color="orange" />
      <PanResponderExample left={48} top={68} color="yellow" />
      <PanResponderExample left={58} top={78} color="green" />
      <PanResponderExample left={68} top={88} color="blue" />
      <PanResponderExample left={78} top={98} color="pink" />
      <Text>Hello, Storyleaves! Testing GameBoard PRO</Text>
      <Separator />
      <StoryTextInput />
      <Separator />
      <Button title="Clear" onPress={(): Promise<void> => AsyncStorage.removeItem(saveKey)} />
    </View>
  );
}
