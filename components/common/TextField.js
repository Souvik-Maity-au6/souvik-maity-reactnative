/* eslint-disable react-native/no-inline-styles */
import {View, Text, TextInput, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';

import Constants from '../../global/Constants';

const TextField = props => {
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState(props.value || '');

  const onChange = value => {
    setText(value);
    if (props.onInputChange) {
      props.onInputChange(value);
    }
  };
  return (
    <View style={styles.container}>
      {focus || text ? (
        <Text style={{fontSize: 16, marginBottom: 5}}>
          {props.label || 'Title'}
        </Text>
      ) : null}
      <TextInput
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        style={[
          styles.input,
          {
            borderColor: focus
              ? Constants.THEME.CATEGORY_BACKGROUND
              : Constants.THEME.TEXT_COLOR,
            height: props.multiline ? 80 : 40,
          },
        ]}
        onChangeText={onChange}
        value={text}
        placeholder={props.placeholder || 'Placeholder'}
        keyboardType={props.keyboardType || 'default'}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default TextField;
