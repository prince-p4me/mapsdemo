import React, { Component } from 'react';
import { StatusBar, View, SafeAreaView, Text, ImageBackground, Image, FlatList, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import ImagePicker from "react-native-image-picker";
import Colors from '../utilities/Colors';
import CommonHeader from '../components/CommonHeader';
import Globalstyles from "./style";
import { TextSemiBold, TextRegular, TextMedium } from '../components/TextView';
import Sizes from '../utilities/Sizes';
import Images from '../utilities/Images';
import NavigationService from '../Services/NavigationService';
import { TextBold } from '../components/TextView';
import Constants from '../utilities/Constants';
import * as Actions from "../redux/action";
import Toast from 'react-native-simple-toast';
import ViewPager from '@react-native-community/viewpager';
import NetInfo from "@react-native-community/netinfo";
import CachedImage from 'react-native-image-cache-wrapper';

class HomeScreen extends Component {
  state = {
    // list: []
  }

  componentDidMount = async () => {
    // this.props.setAddress();
    let { list } = this.props;
    console.log("HomeScreen");
    let internet = await NetInfo.fetch();
    console.log("Is connected?", internet.isConnected);
    if (!internet.isConnected || list.length) return;
    this.props.setLoading(true);
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/photos", { method: "GET" })
      let responseJson = await response.json();
      this.props.setLoading(false);
      console.log("responseJson");
      console.log(responseJson);
      // this.props.setItems(responseJson);
      this.props.setItems(responseJson.slice(0, 100));
    } catch (error) {
      this.props.setLoading(false);
    }
  }

  renderItem = item => {
    // console.log("rendering");
    return (
      <TouchableOpacity style={styles.item} activeOpacity={.7}
        onPress={() => NavigationService.navigate("Details", { item })}>
        <View style={{ width: 50, height: "100%" }}>
          <Image source={item.imgUrl ? { uri: item.imgUrl } : Images.photo} style={{ width: "100%", height: "100%" }} resizeMode="contain"></Image>
        </View>
        <View style={{ flex: 1, height: "100%", justifyContent: "space-around", padding: 10 }}>
          <TextSemiBold title={item.name} style={{ fontSize: Sizes.regular }} />
          <TextRegular title={"Price :- " + item.price} style={{ fontSize: Sizes.small }} />
          <TextRegular title={item.desc} style={{ fontSize: Sizes.small }} />
        </View>
      </TouchableOpacity>
    )
  }

  keyExtractor = (item, index) => index.toString();

  addItem = () => {
    let { name, price, desc, imgUrl } = this.state;
    if (!name) {
      Toast.showWithGravity("Please enter item  item name", Toast.LONG, Toast.BOTTOM);
      return;
    }
    if (!price) {
      Toast.showWithGravity("Please enter your  item price", Toast.LONG, Toast.BOTTOM);
      return;
    }
    if (!desc) {
      Toast.showWithGravity("Please enter your item description", Toast.LONG, Toast.BOTTOM);
      return;
    }
    this.props.setItem({ name, price, desc, imgUrl });
  }

  render() {
    let { list } = this.props;
    // console.log("list:--" + list.length);
    return (
      <View style={Globalstyles.safeArea}>
        <SafeAreaView style={{ width: "100%", backgroundColor: Colors.theme }}></SafeAreaView>
        <StatusBar backgroundColor={Colors.theme} barStyle="light-content" />
        {/* <View style={styles.viewPager}> */}
        <CommonHeader title={"Home"} noBack={true} rightImg={Images.navigation} rightPress={() => {
          NavigationService.navigate("Map")
        }} />
        <ViewPager style={styles.viewPager}
          transitionStyle="curl" initialPage={0}>
          {
            list.map((item, index) => (
              <CachedImage source={{ uri: item.url }} style={{ flex: 1, alignItems: "center" }}
                key={index.toString()} resizeMode="cover">
                <View style={{ width: "100%", padding: 10 }}>
                  <TextSemiBold title={item.title} style={{ textAlign: "center", textTransform: "capitalize" }} />
                </View>
                <CachedImage source={{ uri: item.thumbnailUrl }} style={{
                  width: Constants.width - 100,
                  height: 100, borderWidth: .5
                }}></CachedImage>
              </CachedImage>
            ))
          }
        </ViewPager>
        {/* </View> */}
        {/* <Text>Auth Screen</Text> */}
      </View >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.items,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (data) => dispatch(Actions.setLoading(data)),
    setItems: (data) => dispatch(Actions.setItemList(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    height: Constants.height,
    width: Constants.width,
    // backgroundColor: "red"
  },
});