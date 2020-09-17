import React, { Component } from 'react';
import { StatusBar, View } from "react-native";
import Constants from '../utilities/Constants';
import NavigationService from '../Services/NavigationService';
import { connect } from 'react-redux'
import Colors from '../utilities/Colors';
import { TextSemiBold } from '../components/TextView';
import * as Actions from "../redux/action";

class AuthScreen extends Component {
  componentDidMount = () => {
    console.log("AuthScreen");
    this.props.setLoading(true);
    let { user } = this.props;
    setTimeout(() => {
      if (user && user.username) {
        NavigationService.navigate("DashBoard");
      } else {
        NavigationService.navigate("Login");
      }
      this.props.setLoading(false);
    }, 1000)
  }

  render() {
    return (
      <View style={{
        flex: 1, backgroundColor: Colors.backgroundPageColor,
        alignItems: "center",
        justifyContent: "center"
      }}></View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (data) => dispatch(Actions.setLoading(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)