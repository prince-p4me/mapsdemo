/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar, BackHandler } from 'react-native';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./src/redux/store";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Toast from "react-native-simple-toast";
import { connect } from 'react-redux'

import NavigationService from "./src/Services/NavigationService";

//utilities
import Colors from "./src/utilities/Colors";
import Loader from "./src/components/Loader";

//screens
import AuthScreen from './src/screens/Auth';
import LoginScreen from './src/screens/Login';
import HomeScreen from './src/screens/Home';

//navigators
// const StoreStack = createStackNavigator({
// 	Category: StoreCategory,
// 	SubCategory: StoreSubCategory,
// 	NearStores: NearStoresScreen,
// 	Store: StoreScreen
// })

const Navigations = createAppContainer(
  createSwitchNavigator({
    Auth: AuthScreen,
    Login: LoginScreen,
    DashBoard: HomeScreen
  }, {
    initialRouteName: "Auth"
  })
);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.lastBackButtonPress = null;
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.lastBackButtonPress + 2000 >= new Date().getTime()) {
        BackHandler.exitApp();
        return true;
      }
      else {
        Toast.showWithGravity("Press back again to exit", Toast.SHORT, Toast.BOTTOM);
        this.lastBackButtonPress = new Date().getTime();
        return true;
      }
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor={Colors.theme} />
          <Navigations
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }} />
          <Loader />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;