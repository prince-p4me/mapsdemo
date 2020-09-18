import React, { Component } from 'react';
import { StatusBar, View, SafeAreaView, TextInput, Image, FlatList, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from "react-native";
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

class HomeScreen extends Component {
  state = {
    name: "",
    price: "",
    imgUrl: "",
    desc: ""
  }

  componentDidMount = () => {
    // this.props.setAddress();
    console.log("HomeScreen");
    // console.log(JSON.stringify(this.props));
  }

  showImagePicker() {
    // this.setState({ loading: true });
    const options = {
      rotation: 360,
      allowsEditing: true,
      noData: true,
      mediaType: "photo",
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true
      }
    }
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      // this.setState({ loading: false });
      if (response.didCancel) {
        //   console.log(JSON.stringify(source));
        console.warn('User cancelled image picker');
      } else if (response.error) {
        //  console.log(JSON.stringify(source));
        console.warn('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        //  console.log('User tapped custom button: ', response.customButton);
      } else {
        delete response.data;
        // let user = this.state.user;
        // user.picture = response.uri;
        // const source = { uri: response.uri };
        this.setState({ imgUrl: response.uri }, () => {
          console.log("Image captured");
        });
        // console.warn(source);
      }
    });
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

  renderHeader = () => {
    let { name, price, desc, imgUrl } = this.state;
    return (
      <View style={{ padding: 16, width: "100%", alignItems: "center" }}>
        <TouchableOpacity style={styles.imgButton} activeOpacity={.7} onPress={() => this.showImagePicker()}>
          <Image source={imgUrl ? { uri: imgUrl } : Images.photo} style={{ width: "100%", height: "100%" }} resizeMode="contain"></Image>
        </TouchableOpacity>
        <View style={styles.textInputBox}>
          <TextInput style={styles.input}
            value={name}
            placeholder="Name"
            placeholderTextColor={Colors.textColor}
            keyboardType="default"
            onChangeText={(name) => this.setState({ name })}
            returnKeyType={"next"}
            autoCapitalize="none"
          >
          </TextInput>
        </View>
        <View style={styles.textInputBox}>
          <TextInput style={styles.input}
            value={price}
            placeholder="Price"
            placeholderTextColor={Colors.textColor}
            keyboardType="number-pad"
            onChangeText={(price) => this.setState({ price })}
            returnKeyType={"done"}
            autoCapitalize="none"
          >
          </TextInput>
        </View>
        <View style={[styles.textInputBox, { height: 70 }]}>
          <TextInput style={[styles.input, { height: 70 }]}
            value={desc}
            placeholder="Description"
            secureTextEntry={true}
            placeholderTextColor={Colors.textColor}
            keyboardType={"default"}
            onChangeText={(desc) => this.setState({ desc })}
            returnKeyType={"done"}
            autoCapitalize="none"
            multiline={true}
          >
          </TextInput>
        </View>
        <TouchableOpacity style={styles.loginButton} activeOpacity={.7}
          onPress={() => this.addItem()}>
          <TextBold title="ADD ITEM" style={styles.loginText}></TextBold>
        </TouchableOpacity>
      </View>
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
        <CommonHeader title="Dashboard" noBack={true} />
        <KeyboardAvoidingView style={[Globalstyles.container, { justifyContent: "center" }]} behavior="padding" enabled={true}>
          {this.renderHeader()}
          <FlatList contentContainerStyle={{ flexGrow: 1, }}
            showsVerticalScrollIndicator={false}
            data={list}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            keyExtractor={this.keyExtractor}
            // ListHeaderComponent={() => this.renderHeader()}
            ListFooterComponent={() => (
              <View style={{ height: 30 }}></View>
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, width: "100%", backgroundColor: Colors.grey }}></View>
            )} />
        </KeyboardAvoidingView>
        {/* <Text>Auth Screen</Text> */}
      </View>
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
    setItem: (data) => dispatch(Actions.setItemList(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
  imgButton: {
    width: 80, height: 80,
    borderRadius: 40,
    borderWidth: 1,
    overflow: "hidden"
  },
  item: {
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 14,
    // backgroundColor: Colors.black,
    borderBottomColor: Colors.textColor,
    borderBottomWidth: .3
  },
})