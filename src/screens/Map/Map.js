import React, { Component } from 'react'
import { StyleSheet, Image, PermissionsAndroid, StatusBar, Platform, SafeAreaView, TouchableOpacity, View } from 'react-native'
import Geocoder from 'react-native-geocoding'
import Geolocation from '@react-native-community/geolocation';
// import Geolocation from 'react-native-geolocation-service'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import Images from '../../utilities/Images'
import { TextBold } from '../../components/TextView'
import styles from './styles'
import Constants from "../../utilities/Constants";
import colors from "../../utilities/Colors";
import Sizes from '../../utilities/Sizes';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Fonts from '../../utilities/Fonts';
const GEO_API_KEY = Constants.GOOGLE_API_KEY;
// navigator.geolocation = Geolocation
import { decode } from "@mapbox/polyline";
import CommonHeader from '../../components/CommonHeader';

const INITIAL_COORDINATES = {
    latitude: 28.6184134,
    longitude: 76.9885328,
    latitudeDelta: Platform.OS === 'android' ? 0.5 * (Constants.width / Constants.height) : 0,
    longitudeDelta: Platform.OS === 'android' ? 0.5 * (Constants.width / Constants.height) : 0,
}

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            pickupCoordinate: {},
            dropoffCoordinate: null,
            pickupAddress: null,
            dropoffAddress: null,
            polylineList: [],
            selectedPin: 1,
            listViewDisplayed: "auto"
        }

    }

    componentDidMount() {
        console.log("Map");
        this.setState({ pickupCoordinate: INITIAL_COORDINATES }, () => {
            this.getCurrentPosition()
            // this.getAddressFromLocation(INITIAL_COORDINATES);
        })
    }

    completeBooking() {
        this.setState({
            loading: true,
            pickupCoordinate: {
                ...DEFAULT_DELTA,
                ...INITIAL_COORDINATES
            },
            dropoffCoordinate: null,
            pickupAddress: null,
            dropoffAddress: null,
            polylineList: [],
            selectedPin: 1,
        })
    }

    getPolylineList() {
        const { pickupCoordinate, dropoffCoordinate } = this.state
        if (pickupCoordinate && dropoffCoordinate) {

            const mode = 'driving'; // 'walking';
            const origin = pickupCoordinate.latitude + "," + pickupCoordinate.longitude;
            const destination = dropoffCoordinate.latitude + "," + dropoffCoordinate.longitude;
            const APIKEY = GEO_API_KEY;
            const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
            console.log(url)
            fetch(url)
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.routes.length) {
                        this.setState({
                            polylineList: decode(responseJson.routes[0].overview_polyline.points) // definition below
                        }, () => {
                            console.log("pollyline list:--" + JSON.stringify(this.state.polylineList))
                        });
                    }
                }).catch(e => { console.warn(e) });
        }
    }

    centerCameraOnMap = (latitude, longitude) => {
        // console.log("LOCATION-" + latitude + ' - ' + longitude)
        let camera = {
            center: {
                latitude: latitude,
                longitude: longitude,
            },
            zoom: 16,
        }
        this.mapView.animateCamera(camera, 500)
    }

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted')
                this._getCurrentLocation()
            } else {
                console.log('Location permission denied')
            }
        } catch (err) {
            console.warn(err)
        }
    }

    _getCurrentLocation = () => {
        // alert(navigator)
        Geolocation.getCurrentPosition(
            (position) => {
                console.log("Position : ", position)
                // this.setPosition(position.coords)
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: Platform.OS === 'android' ? 0.5 * (Constants.width / Constants.height) : 0,
                    longitudeDelta: Platform.OS === 'android' ? 0.5 * (Constants.width / Constants.height) : 0,
                })
                this.centerCameraOnMap(position.coords.latitude, position.coords.longitude)
                this.getAddressFromLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            },
            (error) => {
                this.setState({ error: error.message })
            },
            // { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
        )
    }

    getCurrentPosition = async () => {
        if (Platform.OS == 'android') {
            this.requestLocationPermission()
        } else {
            this._getCurrentLocation()
        }
    }

    getAddressFromLocation = (region) => {

        Geocoder.init(GEO_API_KEY)
        Geocoder.from({ latitude: region.latitude, longitude: region.longitude })
            .then(json => {
                // console.log("ADDRESS:", JSON.stringify(json))

                // console.log("\nADD:", JSON.stringify(addressComponent))

                var formattedAddress = json.results[0].formatted_address;
                this.state.selectedPin == 1 ?
                    this.setState({
                        pickupAddress: formattedAddress,
                        selectedPin: 2
                    }) :
                    this.setState({
                        dropoffAddress: formattedAddress,
                    }, () => this.getPolylineList())
            })
            .catch(error =>
                console.warn(error),
                // this.setState({ address: '', addressForAutoSearch: strings.search_location,city:'' })
            );
    }

    renderLocationSearch = () => {
        return (
            <GooglePlacesAutocomplete
                minLength={2}
                autoFocus={true}
                returnKeyType={'search'}
                fetchDetails={true}
                placeholder={"Search Your Location . . ."}
                placeholderTextColor={colors.black}
                nearbyPlacesAPI='GooglePlacesSearch'
                enableHighAccuracyLocation={true}
                enablePoweredByContainer={false}
                listViewDisplayed="auto"
                enablesReturnKeyAutomatically={true}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: Constants.GOOGLE_API_KEY,
                    language: 'en', // language of the results
                    // types: 'geocode'
                }}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    console.log('DATA ' + JSON.stringify(data.description));
                    console.log('DETAILS ' + JSON.stringify(details.geometry.location));
                    let region = {
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: Platform.OS === 'android' ? 0.5 * (Constants.width / Constants.height) : 0,
                        longitudeDelta: Platform.OS === 'android' ? 0.5 * (Constants.width / Constants.height) : 0,
                    };
                    this.setState({
                        selectedPin: 2,
                        dropoffCoordinate: region
                        // listViewDisplayed: false
                    }, () => {
                        this.getAddressFromLocation(region);
                    });
                }}
                styles={placeSearch}
                currentLocation={false}
            />
        )
    }

    renderMap = () => {
        const { pickupCoordinate, polylineList, pickupAddress, dropoffAddress, dropoffCoordinate } = this.state
        return (
            <MapView
                ref={(ref) => this.mapView = ref}
                style={styles.mapView}
                provider={PROVIDER_GOOGLE}
                region={pickupCoordinate}
                initialRegion={pickupCoordinate}
                showsUserLocation={true}
                minZoomLevel={2}
            >
                {pickupCoordinate && <Marker
                    coordinate={pickupCoordinate}
                >
                    <View style={{ alignItems: "center" }}>
                        <View style={styles.marker}>
                            <TextBold title={pickupAddress} style={{ fontSize: Sizes.regular }} numberOfLines={2} />
                        </View>
                        <Image source={Images.ic_pickup} style={{ width: 22, height: 22, marginTop: 10, resizeMode: 'contain' }} />
                    </View>
                </Marker>}

                {dropoffCoordinate && <Marker
                    coordinate={dropoffCoordinate}
                >
                    <View style={{ alignItems: "center" }}>
                        <View style={styles.marker}>
                            <TextBold title={dropoffAddress} style={{ fontSize: Sizes.regular }} numberOfLines={2} />
                        </View>
                        <Image source={Images.ic_drop_off} style={{ width: 22, height: 22, resizeMode: 'contain' }} />
                    </View>
                </Marker>}
                {polylineList.length > 0 &&
                    <MapView.Polyline
                        coordinates={polylineList}
                        strokeWidth={5}
                        strokeColor={colors.black} />
                }
            </MapView>

        )
    }
    render() {

        return (<View style={styles.container}>
            <SafeAreaView style={{ width: "100%", backgroundColor: colors.theme }}></SafeAreaView>
            <StatusBar backgroundColor={colors.theme} barStyle="light-content" />
            {this.renderMap()}
            <CommonHeader title="Map Navigation" />
            <View style={{
                flex: 1, padding: 16,
                justifyContent: "space-between",
            }}>
                {this.renderLocationSearch()}
                <View style={{ width: "100%", alignItems: "flex-end" }}>
                    <TouchableOpacity style={{
                        alignItems: 'center', justifyContent: 'center',
                        height: 40, width: 40,
                        borderRadius: 20, overflow: 'hidden',
                        backgroundColor: colors.black
                    }}
                        onPress={() => {
                            this.getCurrentPosition();
                        }}>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain', }} source={Images.ic_gps} />

                    </TouchableOpacity>
                </View>
            </View>
        </View>
        )
    }
}

export default Map

const placeSearch = StyleSheet.create({
    textInputContainer: {
        borderTopWidth: 0,
        borderBottomWidth: 1,
        backgroundColor: colors.grey,
        justifyContent: "flex-start"
    },
    textInput: {
        height: 45,
        // position: "absolute",
        // top: 0,
        width: Constants.width,
        color: colors.black,
        fontSize: Sizes.large,
        backgroundColor: colors.white,
        borderRadius: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        fontFamily: Fonts.regular,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 2, width: 2 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 3, //IOS
        elevation: 5, //Android
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftColor: "transparent",
        borderLeftWidth: 0
    },
    predefinedPlacesDescription: {
        color: colors.white,
        fontFamily: Fonts.regular
    },
    listView: {
        borderTopWidth: 1,
        borderColor: colors.grey
    },
    row: {
        backgroundColor: colors.white
    }
})
