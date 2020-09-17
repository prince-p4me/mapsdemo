import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../utilities/Colors';
import Fonts from '../utilities/Fonts';
import { useSelector } from "react-redux";

const Loader = (props) => {
  const loading = useSelector(state => state.isLoading);
  return (
    <Spinner size="large"
      visible={loading}
      color={Colors.theme}
      textContent={'Please wait . . .'}
      textStyle={{ color: Constants.white, fontFamily: Fonts.bold }}
    />
  )
}

export default Loader;