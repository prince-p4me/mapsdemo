import { Dimensions, Platform, View, TouchableOpacity, Text, Image, } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import Images from "../utilities/Images";
import Fonts from "../utilities/Fonts";
import NavigationServices from "../Services/NavigationService";
import Constants from "../utilities/Constants";
import { TextSemiBold } from "./TextView";
import Sizes from "../utilities/Sizes";
import Colors from "../utilities/Colors";

export default class CommonHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  onBackClick = () => {
    if (this.props.backToHome) {
      NavigationServices.navigate("MainStack");
    } else NavigationServices.goBack();
  }

  renderBackButton() {
    let { color } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.6}
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          // backgroundColor: "red"
        }}
        onPress={() => this.onBackClick()}>
        <Image source={Images.back} style={{
          width: 15, height: 15,
          resizeMode: "contain",
          tintColor: Colors.white
        }}
        ></Image>
        {/* <Text style={styles.backBtnText}> Back</Text> */}
      </TouchableOpacity>
    )
  }

  renderToolbar() {
    let { isTransparent, noBack, titleView, title, rightPress, rightImg, color } = this.props;
    return (
      <View style={isTransparent ? styles.transparentToolbar : styles.toolbar}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          paddingHorizontal: 12,
          height: "100%",
          // backgroundColor: "red"
        }}>
          <View style={{
            // flex: 1.5,
            width: 80,
            alignItems: 'flex-start',
            justifyContent: 'center',
            // paddingLeft: 10,
            // backgroundColor: "red"
          }}>
            {noBack ? null : this.renderBackButton()}
          </View>
          <View style={{
            flex: 7, justifyContent: "center",
            alignItems: 'center',
            // backgroundColor: "blue"
          }}>
            {titleView ? titleView() :
              <View style={{ flex: 1, justifyContent: "center" }}>
                <TextSemiBold style={{
                  fontSize: Sizes.large,
                  textAlign: "center",
                  color: color ? color : Colors.black
                }} title={title} numberOfLines={2}></TextSemiBold>
              </View>}
          </View>
          <View style={styles.rightButton}>
            {rightImg ?
              <TouchableOpacity style={styles.headerButton} onPress={() => rightPress()}>
                <Image source={rightImg ? rightImg : null} style={{ width: 20, height: 20, resizeMode: "contain" }}></Image>
              </TouchableOpacity> : null
            }
          </View>
        </View>
      </View >
    )
  }

  render() {
    let { fireEvent } = this.props;
    return (
      this.renderToolbar()
    )
  }
}

const styles = StyleSheet.create({
  rightButton: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: 80,
  },
  toolbar: {
    height: (Platform.OS === 'ios') ? 44 : 56,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: Constants.white,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 3,
    shadowRadius: 0,
  },
  transparentToolbar: {
    height: (Platform.OS === 'ios') ? 44 : 56,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    // backgroundColor: "red"
  },
  headerRowDevider: {
    height: 12, width: 1.5,
    backgroundColor: Constants.white,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 5
  },
  headerContentRowText: {
    color: Constants.white,
    fontSize: 12,
    fontFamily: Fonts.medium,
    lineHeight: 20
  },
  headerContentIcon: {
    width: 20, height: 20,
    resizeMode: "contain",
    marginLeft: 10,
    marginRight: 10
  },
  headerStnName: {
    color: Constants.white,
    fontSize: 17,
    fontFamily: Fonts.semiBold
  },
  headerContentRow: { width: "100%", flexDirection: "row", justifyContent: "center" },
  headerContent: {
    height: "100%",
    alignItems: 'center',
    width: Constants.width - 120,
    padding: 8,
    justifyContent: "center"
  },
  backBtnText: {
    color: Constants.white,
    fontFamily: Fonts.semiBold
  },
  container: {
    flex: 1,
    backgroundColor: Constants.backgroundPageColor
  },
  header: {
    height: 70,
    width: Constants.width,
    backgroundColor: Constants.theme,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12
  },
  headerBackButton: {
    width: 60,
    // backgroundColor: "red",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  headerButton: {
    height: (Platform.OS === 'ios') ? 44 : 56,
    width: "50%",
    // backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center"
  },
})