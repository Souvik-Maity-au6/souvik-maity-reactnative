/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  StatusBar,
} from 'react-native';
import React, {useState, Fragment} from 'react';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';

import Constants from '../global/Constants';
import TextField from '../components/common/TextField';
import HorizontalTab from '../components/common/HorizontalTab';
import Header from '../components/common/Header';
import {developerEmail} from '../global/env';
import ApiCall from '../global/ApiCall';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AddProduct = props => {
  const [dataUpdated, setDataUpdated] = useState(false);
  const [categoryList, setCategoryList] = useState(props.categoryList || []);
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    // 'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.',
    avatar: '',
    //'https://cdn.pixabay.com/photo/2015/01/20/12/51/mobile-605422_960_720.jpg',
    developerEmail: developerEmail,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSetList = (listData, item) => {
    setDataUpdated(!dataUpdated);
    setCategoryList(listData);
    setProductData({...productData, category: item.name});
  };

  const addNewProduct = async () => {
    setIsLoading(true);
    await ApiCall.AddProduct(
      productData,
      data => {
        if (data.message === 'Success') {
          setIsLoading(false);
          if (props.getProductList) {
            props.getProductList();
            props.getCategoryList();
          }
          Actions.pop();
        }
      },
      err => {
        setIsLoading(false);
        console.error(err);
        Toast.show(err.message);
      },
    );
  };
  return (
    <Fragment>
      <StatusBar
        backgroundColor={Constants.THEME.BACKGROUND_COLOR}
        barStyle={'light-content'}
      />
      <Header title={'Add'} isBack={true} />
      <View style={styles.container}>
        <TextField
          value={productData.name}
          onInputChange={text => {
            setProductData({...productData, name: text});
          }}
          placeholder="Product Title"
          label="Product Title"
        />
        <TextField
          value={productData.price}
          onInputChange={text => {
            setProductData({...productData, price: text});
          }}
          placeholder="Price"
          label="Price"
          keyboardType="numeric"
        />
        <TextField
          value={productData.description}
          onInputChange={text => {
            setProductData({...productData, description: text});
          }}
          placeholder="Description"
          label="Description"
          multiline
          textAlignVertical="top"
        />
        <TextField
          value={productData.avatar}
          onInputChange={text => {
            setProductData({...productData, avatar: text});
          }}
          placeholder="Image Link"
          label="Image Link"
        />
        <Text style={{fontSize: 16, margin: 10}}>
          Selected Category: {productData.category}
        </Text>
        <HorizontalTab
          tabList={categoryList}
          dataUpdated={dataUpdated}
          onUpdateList={onSetList}
        />
        <Pressable
          onPress={() => {
            console.log('productData', productData);
            if (
              !productData.name ||
              !productData.price ||
              !productData.category ||
              !productData.description ||
              !productData.avatar
            ) {
              Toast.show('Please fill all the details');
            } else {
              addNewProduct();
            }
          }}
          style={styles.addButton}>
          <Text style={{color: Constants.THEME.TEXT_COLOR}}>Add Product</Text>
        </Pressable>
      </View>
      <Spinner
        visible={isLoading}
        textStyle={{color: Constants.THEME.TEXT_COLOR}}
        textContent={'Adding...'}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: Constants.THEME.BACKGROUND_COLOR,
  },
  addButton: {
    backgroundColor: Constants.THEME.CATEGORY_BACKGROUND,
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    width: 100,
    position: 'absolute',
    bottom: 50,
    left: '40%',
  },
});

export default AddProduct;
