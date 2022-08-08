import {View, StyleSheet, Dimensions, StatusBar} from 'react-native';
import React, {Fragment, useState, useEffect} from 'react';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
//components
import HorizontalTab from '../components/common/HorizontalTab';
import Header from '../components/common/Header';
import Constants from '../global/Constants';
import ProductCard from '../components/product/ProductCard';
import FloatingButton from '../components/dashboard/FloatingButton';
import ApiCall from '../global/ApiCall';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Dashboard = () => {
  const [dataUpdated, setDataUpdated] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [originalCategoryList, setOriginalCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [filterProductList, setFilterProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProductList();
    getCategoryList();
  }, []);

  const getProductList = async () => {
    setIsLoading(true);
    await ApiCall.GetAllProductLIst(
      '',
      data => {
        if (data.message === 'Success') {
          setProductList(data.products);
          setFilterProductList(data.products);
        }
        setIsLoading(false);
      },
      err => {
        setIsLoading(false);
        console.error(err);
        Toast.show(err.message);
      },
    );
  };

  const getCategoryList = async () => {
    setIsLoading(true);
    await ApiCall.GetAllCategoryList(
      '',
      data => {
        if (data.message === 'Success') {
          let categories = [
            {_id: '62e81e2a49ad2578fbb6b57z', name: 'All', isSelected: true},
          ];
          data.categories.forEach(category => {
            categories.push({...category, isSelected: false});
          });
          setCategoryList(categories);
          setOriginalCategoryList(data.categories);
        }
        setIsLoading(false);
      },
      err => {
        setIsLoading(false);
        console.error(err);
        Toast.show(err.message);
      },
    );
  };

  const onSetList = (listData, item) => {
    setDataUpdated(!dataUpdated);
    setCategoryList(listData);
    let allProduct = [...productList];
    if (item.name === 'All') {
      setFilterProductList(allProduct);
    } else {
      let filterData = allProduct.filter(
        product => product.category === item.name,
      );
      setFilterProductList(filterData);
    }
  };
  const onProductPress = item => {
    console.log(item);
    Actions.push(Constants.ROUTES.PRODUCT_DETAILS, {product: item});
  };
  const onAddPress = () => {
    Actions.push(Constants.ROUTES.ADD_PRODUCT, {
      categoryList: originalCategoryList,
      getProductList: getProductList,
      getCategoryList: getCategoryList,
    });
  };
  return (
    <Fragment>
      <StatusBar
        backgroundColor={Constants.THEME.BACKGROUND_COLOR}
        barStyle={'light-content'}
      />
      <View style={styles.container}>
        <Header title="Upayments Store" isSearch={true} />
        <HorizontalTab
          tabList={categoryList}
          dataUpdated={dataUpdated}
          onUpdateList={onSetList}
          activeTab={true}
        />
        <ProductCard
          productList={filterProductList}
          dataUpdated={dataUpdated}
          onProductPress={onProductPress}
        />
      </View>
      <FloatingButton onPress={onAddPress} />
      <Spinner
        visible={isLoading}
        textStyle={{color: Constants.THEME.TEXT_COLOR}}
        textContent={'Loading...'}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    height: height,
    width: width,
    backgroundColor: Constants.THEME.BACKGROUND_COLOR,
  },
});

export default Dashboard;
