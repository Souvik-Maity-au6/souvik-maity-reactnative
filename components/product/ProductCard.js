/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useState, useEffect, useRef, Fragment} from 'react';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Constants from '../../global/Constants';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ProductCard = props => {
  const [tabList, setTabList] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const flatListRef = useRef(null);
  useEffect(() => {
    if (props.productList) {
      setTabList(props.productList);
    }
    if (props.dataUpdated) {
      setDataUpdated(props.dataUpdated);
    }
  }, [props.dataUpdated, props.productList]);

  const _onCardPress = item => {
    if (props.onProductPress) {
      props.onProductPress(item);
    }
  };

  return (
    <Fragment>
      {tabList.length ? (
        <View style={styles.container}>
          <FlatList
            ref={flatListRef}
            style={styles.tabList}
            extraData={dataUpdated}
            showsVerticalScrollIndicator={false}
            data={tabList}
            keyExtractor={(item, index) => item._id.toString()}
            numColumns={2}
            renderItem={({item, index}) => (
              <Pressable
                style={styles.tabMainView}
                onPress={() => {
                  _onCardPress(item);
                }}>
                <View style={{paddingLeft: 5}}>
                  <FastImage
                    style={{width: 140, height: 140}}
                    source={{
                      uri: item.avatar,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={styles.footer}>
                  <View>
                    <Text numberOfLines={1} style={styles.tabTitle}>
                      {item.name}
                    </Text>
                    <Text style={styles.tabTitle}>${item.price}</Text>
                  </View>
                  <MaterialIcons
                    name="edit"
                    size={20}
                    color={Constants.THEME.EDIT_ICON_COLOR}
                  />
                </View>
              </Pressable>
            )}
          />
        </View>
      ) : null}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.THEME.BACKGROUND_COLOR,
    height: height,
    paddingBottom: 100,
  },
  tabList: {
    width: width,
  },
  tabMainView: {
    borderRadius: 10,
    width: 150,
    backgroundColor: Constants.THEME.TEXT_COLOR,
    marginHorizontal: 10,
    marginVertical: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  tabTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Constants.THEME.TEXT_COLOR,
  },
  bottomLine: {
    height: 0.3,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Constants.THEME.CATEGORY_BACKGROUND,
    borderRadius: 6,
    padding: 5,
    marginTop: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});

export default ProductCard;
