import React, { Component } from 'react';
import { StatusBar, View, SafeAreaView } from "react-native";
import Constants from '../utilities/Constants';
import NavigationService from '../Services/NavigationService';
import { connect } from 'react-redux'
import Colors from '../utilities/Colors';

class HomeScreen extends Component {
  componentDidMount = () => {
    // this.props.setAddress();
    console.log("LoginScreen");
  }

  render() {
    return (
      <SafeAreaView style={{
        flex: 1, backgroundColor: Colors.gold,
        alignItems: "center"
      }}>
        <StatusBar backgroundColor={Colors.theme} barStyle="light-content" />
        <View style={{
          flex: 1, backgroundColor: "red"
        }}></View>
        {/* <Text>Auth Screen</Text> */}
      </SafeAreaView>
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
    setAddress: (data) => dispatch(Actions.setAddress(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)