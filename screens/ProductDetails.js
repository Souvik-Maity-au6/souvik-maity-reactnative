/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, StatusBar, Dimensions} from 'react-native';
import React, {Fragment} from 'react';
import FastImage from 'react-native-fast-image';

import Constants from '../global/Constants';
import Header from '../components/common/Header';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ProductDetails = props => {
  const {product} = props;
  return (
    <Fragment>
      <StatusBar
        backgroundColor={Constants.THEME.BACKGROUND_COLOR}
        barStyle={'light-content'}
      />
      <Header title={''} isBack={true} />
      <View style={styles.container}>
        <View style={{marginTop: 5}}>
          <FastImage
            style={{width: width, height: height / 3}}
            source={{
              uri: product.avatar,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={styles.footer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.tabTitle}>{product.name}</Text>
            <Text style={styles.tabTitle}>${product.price}</Text>
          </View>
          <Text style={styles.tabDescription}>{product.description}</Text>
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    height: height,
    width: width,
    backgroundColor: Constants.THEME.BACKGROUND_COLOR,
  },
  tabTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Constants.THEME.TEXT_COLOR,
  },
  tabDescription: {
    margin: 5,
    fontSize: 14,
    fontWeight: '600',
    color: Constants.THEME.TEXT_COLOR,
  },
  footer: {
    backgroundColor: Constants.THEME.CATEGORY_BACKGROUND,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 5,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    height: height / 2,
    marginTop: height / 6,
  },
});

export default ProductDetails;
