import React, { Component } from 'react';
import { StatusBar, View, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { connect } from 'react-redux'
import Colors from '../utilities/Colors';
import CommonHeader from '../components/CommonHeader';
import Globalstyles from "./style";
import { TextSemiBold, TextRegular, TextMedium } from '../components/TextView';
import Sizes from '../utilities/Sizes';

class HomeScreen extends Component {
  componentDidMount = () => {
    // this.props.setAddress();
    console.log("HomeScreen");
    console.log(JSON.stringify(this.props));
  }

  renderItem = item => {
    console.log("rendering");
    return (
      <View style={styles.employee}>
        <TextSemiBold title={item.name} style={{ fontSize: Sizes.regular }} />
        <TextRegular title={item.email} style={{ fontSize: Sizes.small }} />
        <TextRegular title={item.phoneNo} style={{ fontSize: Sizes.small }} />
        <View style={{ width: "100%", flexDirection: "row", }}>
          <View style={{ width: "50%", flexDirection: "row", }}>
            <TextMedium title="Age :- " style={{ fontSize: Sizes.small }} />
            <TextRegular title={item.age} style={{ fontSize: Sizes.small }} />
          </View>
          <View style={{ width: "50%", flexDirection: "row", }}>
            <TextMedium title="Gender :- " style={{ fontSize: Sizes.small }} />
            <TextRegular title={item.gender} style={{ fontSize: Sizes.small }} />
          </View>
        </View>
      </View>
    )
  }

  keyExtractor = (item) => item.id.toString();

  render() {
    let { list } = this.props;
    console.log("list:--" + list.length);
    return (
      <View style={Globalstyles.safeArea}>
        <SafeAreaView style={{ width: "100%", backgroundColor: Colors.theme }}></SafeAreaView>
        <StatusBar backgroundColor={Colors.theme} barStyle="light-content" />
        <CommonHeader title="Dashboard" />
        <FlatList contentContainerStyle={{ flexGrow: 1, }}
          showsVerticalScrollIndicator={false}
          data={list}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={this.keyExtractor}
          ListFooterComponent={() => (
            <View style={{ height: 30 }}></View>
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, width: "100%", backgroundColor: Colors.grey }}></View>
          )} />
        {/* <Text>Auth Screen</Text> */}
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.employees,
  }
}

export default connect(mapStateToProps, null)(HomeScreen)

const styles = StyleSheet.create({
  employee: {
    height: 80,
    width: Constants.width,
    paddingHorizontal: 14,
    paddingVertical: 7,
    justifyContent: "space-around"
  }
})