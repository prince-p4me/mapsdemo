import { StyleSheet } from "react-native";
import Colors from '../utilities/Colors';
export default StyleSheet.create({
  safeArea: {
    flex: 1, backgroundColor: Colors.theme,
    alignItems: "center"
  },
  container: {
    flex: 1, backgroundColor: Colors.backgroundPageColor
  }
})