import React, {useState, useEffect, useRef, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native';
import Constants from '../../global/Constants';

const width = Dimensions.get('window').width;

const HorizontalTab = props => {
  const [tabList, setTabList] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (props.tabList && props.tabList.length > 0) {
      setTabList(props.tabList);
      if (props.activeTab) {
        _onTabPress(props.tabList[0]);
      }
    }
  }, [props.tabList, props.activeTab]);

  useEffect(() => {
    if (props.dataUpdated) {
      setDataUpdated(props.dataUpdated);
    }
  }, [props.dataUpdated]);

  const _onTabPress = item => {
    let tabData = props.tabList;
    let selectedIndex = 0;
    tabData.forEach((element, index) => {
      if (element._id === item._id) {
        element.isSelected = true;
        selectedIndex = index;
      } else {
        element.isSelected = false;
      }
    });
    if (props.onUpdateList) {
      props.onUpdateList(tabData, item);
    }
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({animated: true, index: selectedIndex});
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
            horizontal
            showsHorizontalScrollIndicator={false}
            data={tabList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <Pressable
                style={[
                  styles.tabMainView,
                  {
                    backgroundColor:
                      item.isSelected === true
                        ? Constants.THEME.CATEGORY_BACKGROUND
                        : Constants.THEME.TEXT_COLOR,
                  },
                ]}
                onPress={() => {
                  _onTabPress(item);
                }}>
                <Text
                  style={[
                    styles.tabTitle,
                    {
                      color:
                        item.isSelected === true
                          ? Constants.THEME.TEXT_COLOR
                          : Constants.THEME.CATEGORY_BACKGROUND,
                    },
                  ]}>
                  {item.name}
                </Text>
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
  },
  tabList: {
    width: width,
  },
  tabMainView: {
    padding: 5,
    borderRadius: 6,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  tabTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomLine: {
    height: 0.3,
  },
});

export default HorizontalTab;
