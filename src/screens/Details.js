import React, { Component } from 'react';
import { StatusBar, View, SafeAreaView, Image, StyleSheet } from "react-native";
import { connect } from 'react-redux'
import Colors from '../utilities/Colors';
import CommonHeader from '../components/CommonHeader';
import Globalstyles from "./style";
import { TextSemiBold, TextRegular, TextMedium } from '../components/TextView';
import Sizes from '../utilities/Sizes';
import Images from '../utilities/Images';

export default class DetailsScreen extends Component {
  state = {
    item: {}
  }

  componentDidMount = () => {
    let { navigation } = this.props;
    let item = navigation.getParam("item", null);
    this.setState({ item });
    // this.props.setAddress();
    console.log("HomeScreen");
    // console.log(JSON.stringify(this.props));
  }

  renderItem = () => {
    let { item } = this.state;
    console.log(item);
    return (
      <View style={{ padding: 16, width: "100%", alignItems: "center" }}>
        <View style={styles.imgButton}>
          <Image source={item.imgUrl ? { uri: item.imgUrl } : Images.photo} style={{ width: "100%", height: "100%" }} resizeMode="contain"></Image>
        </View>
        <View style={styles.textInputBox}>
          <TextSemiBold title={item.name} style={{ fontSize: Sizes.regular }} />
        </View>
        <View style={[styles.textInputBox, { flexDirection: "row" }]}>
          <TextSemiBold title={"Price :- "} style={{ fontSize: Sizes.regular }} />
          <TextRegular title={item.price + " /-"} style={{ fontSize: Sizes.regular }} />
        </View>
        <View style={[styles.textInputBox, { height: 70, }]}>
          <TextSemiBold title="Description" style={{ fontSize: Sizes.regular }} />
          <TextRegular title={item.desc} style={{ fontSize: Sizes.regular }} numberOfLines={3} />
        </View>
      </View>
    )
  }

  keyExtractor = (item) => item.id.toString();

  render() {
    let { list } = this.props;
    // console.log("list:--" + list.length);
    return (
      <View style={Globalstyles.safeArea}>
        <SafeAreaView style={{ width: "100%", backgroundColor: Colors.theme }}></SafeAreaView>
        <StatusBar backgroundColor={Colors.theme} barStyle="light-content" />
        <CommonHeader title="Details" color={Colors.black} />
        {this.renderItem()}
        {/* <Text>Auth Screen</Text> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imgButton: {
    width: 80, height: 80,
    borderRadius: 40,
    borderWidth: 1,
    overflow: "hidden"
  },
  employee: {
    height: 80,
    width: Constants.width,
    paddingHorizontal: 14,
    paddingVertical: 7,
    flexDirection: "row",
    // justifyContent: "space-around"
  },
  loginText: { fontSize: Sizes.large, color: Colors.white },
  loginButton: {
    height: 40, width: Constants.width - 28,
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
    // flexDirection: "row",
    // justifyContent: "space-around",
    // alignItems: "center",
    marginVertical: 14,
    // backgroundColor: Colors.black,
    borderBottomColor: Colors.textColor,
    borderBottomWidth: .3
  },
})