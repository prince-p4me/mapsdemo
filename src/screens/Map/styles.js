import { StyleSheet } from "react-native";
import colors from "../../utilities/Colors";
import Colors from "../../utilities/Colors";

const styles = StyleSheet.create({
    marker: {
        width: 150, height: 50,
        padding: 10, alignItems: 'center',
        backgroundColor: colors.white,
    },
    container: {
        // backgroundColor: Colors.black,
        // ...StyleSheet.absoluteFillObject,
        flex: 1,
    },
    indicatorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapView: {
        // flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
    selectBtnContainer: {
        position: 'absolute',
        bottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 5,
    },

    cardLocationContainer: {
        position: 'absolute',
        top: 70,
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        borderRadius: 5,
        overflow: 'hidden',
        alignSelf: 'center',
        width: '80%',
        zIndex: 10,
        backgroundColor: colors.black
    },
    selectBtn: {
        borderRadius: 3,
        backgroundColor: colors.red,
        width: '60%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'

    },
    selectBtnText: {
        color: '#ffffff',
    },
    pickupLocationTouch: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',

    }
})

export default styles