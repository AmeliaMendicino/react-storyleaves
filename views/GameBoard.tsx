import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import StoryTextInput from '../components/StoryTextInput';
import SavePanResponderExample from '../components/PanResponderExample';

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
      <SavePanResponderExample id="red" left={28} top={48} color="red" />
      <SavePanResponderExample id="orange" left={38} top={58} color="orange" />
      <SavePanResponderExample id="yellow" left={48} top={68} color="yellow" />
      <SavePanResponderExample id="green" left={58} top={78} color="green" />
      <SavePanResponderExample id="blue" left={68} top={88} color="blue" />
      <SavePanResponderExample id="pink" left={78} top={98} color="pink" />
      <Text>Hello, Storyleaves! Testing StoryTextInput Typescript</Text>
      <Separator />
      <StoryTextInput id="storyText" />
      <Separator />
      <Button
        title="Clear"
        onPress={(): Promise<void> => {
          return AsyncStorage.multiRemove(['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'storyText']);
        }}
      />
    </View>
  );
}
