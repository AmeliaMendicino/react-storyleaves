import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert, AsyncStorage } from 'react-native';

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

function UselessTextInput(): JSX.Element {
  const [value, onChangeText] = React.useState('Storyleaves Textbox Test');

  React.useEffect(() => {
    async function getStoryData(): Promise<void> {
      try {
        const storyText = await AsyncStorage.getItem('@Storyleaves:storyText');
        if (storyText !== null) {
          onChangeText(storyText);
        }
      } catch (error) {
        Alert.alert('Error loading story data');
      }
    }
    getStoryData();
  });

  return (
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(text): void => {
        onChangeText(text);
        AsyncStorage.setItem('@Storyleaves:storyText', text);
      }}
      value={value}
    />
  );
}

function Separator(): JSX.Element {
  return <View style={styles.separator} />;
}

export default function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Hello, Storyleaves! Testing Storage</Text>
      <Separator />
      <UselessTextInput />
      <Separator />
      <Button title="Clear" onPress={(): Promise<void> => AsyncStorage.removeItem('@Storyleaves:storyText')} />
    </View>
  );
}
