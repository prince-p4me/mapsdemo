import React, { Component } from 'react';
import { StatusBar, View, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, findNodeHandle, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import Constants from '../utilities/Constants';
import NavigationService from '../Services/NavigationService';
import { connect } from 'react-redux'
import Colors from '../utilities/Colors';
import Images from '../utilities/Images';
import CommonHeader from '../components/CommonHeader';
import Globalstyles from "./style";
import Toast from 'react-native-simple-toast';
import { TextBold } from '../components/TextView';
import Sizes from '../utilities/Sizes';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.scroll = null;
  }


  componentDidMount = () => {
    // this.props.setAddress();
    console.log("LoginScreen");
  }

  inputFocused = (ref) => {
    this._scroll(ref, ref == "input1" ? 200 : 180);
  }

  _scroll = (ref, offset) => {
    setTimeout(() => {
      var scrollResponder = this.refs.myScrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[ref]),
        offset,
        true
      );
    }, 100);
  }

  render() {
    return (
      <View style={Globalstyles.safeArea}>
        <SafeAreaView style={{ backgroundColor: Colors.theme }}></SafeAreaView>
        <StatusBar backgroundColor={Colors.theme} barStyle="light-content" />
        <CommonHeader title="Login" />
        <ScrollView ref="myScrollView" contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps={'handled'} keyboardDismissMode='interactive'>
          <KeyboardAvoidingView style={[Globalstyles.container, { justifyContent: "center" }]} behavior="padding" enabled={true}>
            <View style={{ padding: 16, width: "100%" }}>
              <View style={styles.textInputBox}>
                <View style={styles.inputIconBox}>
                  <Image source={Images.user} style={{ width: 20, height: 20, resizeMode: "contain" }}></Image>
                </View>
                <TextInput style={styles.input}
                  value={this.state.username}
                  placeholder="Email Id or Mobile Number"
                  placeholderTextColor={Colors.textColor}
                  keyboardType={"default"}
                  onChangeText={(value) => this.setState({ username: value })}
                  returnKeyType={"next"}
                  autoCapitalize="none"
                  ref="input"
                  onFocus={this.inputFocused.bind(this, 'input')}
                >
                </TextInput>
              </View>
              <View style={styles.textInputBox}>
                <View style={styles.inputIconBox}>
                  <Image source={Images.password} style={{ width: 20, height: 20, resizeMode: "contain" }}></Image>
                </View>
                <TextInput style={styles.input}
                  value={this.state.password}
                  placeholder="Password"
                  secureTextEntry={true}
                  placeholderTextColor={Colors.textColor}
                  keyboardType={"default"}
                  onChangeText={(value) => this.setState({ password: value })}
                  returnKeyType={"done"}
                  autoCapitalize="none"
                  ref="input1"
                  onFocus={this.inputFocused.bind(this, 'input1')}
                // onSubmitEditing={() => this.login()}
                >
                </TextInput>
              </View>
              <TouchableOpacity style={styles.loginButton} activeOpacity={.7}>
                <TextBold title="LOGIN" style={styles.loginText}></TextBold>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
  loginText: { fontSize: Sizes.large, color: Colors.white },
  loginButton: {
    height: 40, width: "100%",
    backgroundColor: Colors.theme,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    flex: 1,
    paddingLeft: 7,
    color: Colors.textColor,
    height: 35,
    // backgroundColor: "red"
  },
  inputIconBox: {
    width: 35, height: 35,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "yellow"
  },
  textInputBox: {
    width: Constants.width - 32, height: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 14,
    // backgroundColor: Colors.black,
    borderBottomColor: Colors.textColor,
    borderBottomWidth: .3
  },
})