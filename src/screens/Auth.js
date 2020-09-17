import React, { Component } from 'react';
import { StatusBar, View } from "react-native";
import Constants from '../utilities/Constants';
import NavigationService from '../Services/NavigationService';
import { connect } from 'react-redux'
import Colors from '../utilities/Colors';

class AuthScreen extends Component {
  componentDidMount = () => {
    // this.props.setAddress();
    console.log("AuthScreen");

    let { token, user } = this.props;
    // setTimeout(async () => {
    //   if (token && user) {
    //     NavigationService.navigate("MainStack");
    //   } else {
    //     NavigationService.navigate("LoginStack");
    //   }
    // }, 2000);
  }

  render() {
    return (
      <View style={{
        flex: 1, backgroundColor: Colors.red,
        alignItems: "center"
      }}>
        <StatusBar backgroundColor={Colors.theme} barStyle="light-content" />
        <View style={{
          flex: 1, backgroundColor: "red"
        }}></View>
        {/* <Text>Auth Screen</Text> */}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, null)(AuthScreen)