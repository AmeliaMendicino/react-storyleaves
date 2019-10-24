import React from 'react';
import { TextInput } from 'react-native';
import withSave from './withSave';

interface StoryTextInputState {
  data: string;
  handleChange: (data: string) => void;
}

const StoryTextInput = ({ data: storyText, handleChange }: StoryTextInputState): JSX.Element => (
  <TextInput
    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
    onChangeText={handleChange}
    value={storyText}
  />
);

export default withSave()(StoryTextInput);
