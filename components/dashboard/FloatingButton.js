/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Pressable, Text, Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//Includes

import Constants from '../../global/Constants';

const FloatingButton = props => {
  return (
    <View
      style={{...styles.summaryView, ...(props.disabled && {opacity: 0.5})}}>
      <Pressable
        disabled={props.disabled}
        style={[styles.icon]}
        onPress={() => {
          if (props.onPress) {
            props.onPress();
          }
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={[styles.icon, props.style]}>
            <MaterialIcons
              name="add"
              size={30}
              color={Constants.THEME.CATEGORY_BACKGROUND}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryView: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Constants.THEME.TEXT_COLOR,
    borderWidth: 2,
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginBottom: 20,
    marginRight: 10,
    borderRadius: 50,
  },
});

export default FloatingButton;
