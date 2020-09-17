import { Platform, Dimensions } from "react-native";

export default Constants = {
	appName: "Assignments",
	isIOs: Platform.OS == "ios",
	isAndroid: Platform.OS == "android",
	height: Dimensions.get("window").height,
	bgTransParent: "rgba(0,0,0,.6)",
	width: Dimensions.get("window").width,
	currency: "₹",
	version: "1.0.7",
	emailcontext: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
};