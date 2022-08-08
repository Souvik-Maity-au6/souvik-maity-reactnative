import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';

const Header = props => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {props.isBack ? (
          <FontAwesomeIcon
            name="long-arrow-left"
            size={30}
            color="#900"
            onPress={() => {
              Actions.pop();
            }}
          />
        ) : null}
        <Text style={styles.headerText}>{props.title}</Text>
      </View>
      {props.isSearch ? (
        <FontAwesomeIcon name="search" size={30} color="#900" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  miniContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

export default Header;
