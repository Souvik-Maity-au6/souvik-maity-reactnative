/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Router, Scene} from 'react-native-router-flux';

//Screens
import Dashboard from './screens/Dashboard';
import ProductDeatails from './screens/ProductDetails';
import AddProduct from './screens/AddProduct';

//Includes
import Constants from './global/Constants';

const App = () => {
  return (
    <Router>
      <Scene key={Constants.ROUTES.ROOT} hideNavBar={true}>
        <Scene
          key={Constants.ROUTES.DASHBOARD}
          component={Dashboard}
          type={Constants.COMMON.REPLACE}
          initial
        />
        <Scene
          key={Constants.ROUTES.PRODUCT_DETAILS}
          component={ProductDeatails}
          type={Constants.COMMON.REPLACE}
        />
        <Scene
          key={Constants.ROUTES.ADD_PRODUCT}
          component={AddProduct}
          type={Constants.COMMON.REPLACE}
        />
      </Scene>
    </Router>
  );
};

export default App;
