import React, { PureComponent } from 'react';
import { TextInput, Alert, AsyncStorage, AppState } from 'react-native';
import { saveKey } from '../constants';

interface StoryTextInputState {
  storyText: string;
}

export default class StoryTextInput extends PureComponent<{}, StoryTextInputState> {
  constructor(props) {
    super(props);
    this.state = { storyText: '' };
  }

  componentDidMount(): void {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.recoverData();
  }

  componentWillUnmount(): void {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState): void => {
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      this.storeData();
    }
  };

  handleTextChange = (storyText): void => this.setState({ storyText });

  storeData = (): void => {
    const { storyText } = this.state;
    AsyncStorage.setItem(saveKey, storyText);
  };

  async recoverData(): Promise<void> {
    try {
      const storyText = await AsyncStorage.getItem(saveKey);
      if (storyText !== null) {
        this.setState({ storyText });
      }
    } catch (error) {
      Alert.alert('Error loading story data');
    }
  }

  render(): JSX.Element {
    const { storyText } = this.state;

    return (
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={this.handleTextChange}
        value={storyText}
      />
    );
  }
}
