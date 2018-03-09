import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import BackgroundGeolocation from 'react-native-background-geolocation';
import SettingsService from './SettingsService'
const TRACKER_HOST = 'http://tracker.transistorsoft.com/locations/';
const STATIONARY_REGION_FILL_COLOR = "rgba(200,0,0,0.2)"
const STATIONARY_REGION_STROKE_COLOR = "rgba(200,0,0,0.2)"
const GEOFENCE_STROKE_COLOR = "rgba(17,183,0,0.5)"
const GEOFENCE_FILL_COLOR   ="rgba(17,183,0,0.2)"
const GEOFENCE_STROKE_COLOR_ACTIVATED = "rgba(127,127,127,0.5)";
const GEOFENCE_FILL_COLOR_ACTIVATED = "rgba(127,127,127, 0.2)";
const POLYLINE_STROKE_COLOR = "rgba(32,64,255,0.6)";


export default class App extends React.Component{
  constructor(props) {
    super(props);

    this.lastMotionChangeLocation = undefined;

  this.state = {
  region:null,
  result:"yo",
  pos:null,
  latitude:null,
  longitude:null,
  settings: {},
  enabled: false,
      isMoving: false,
      motionActivity: {activity: 'unknown', confidence: 100},
      odometer: 0,
      username:'',
      // ActionButton state
      isMainMenuOpen: true,
      isSyncing: false,
      isEmailingLog: false,
      isDestroyingLocations: false,
      // Map state
      centerCoordinate: {
        latitude: 0,
        longitude: 0
      },
      isPressingOnMap: false,
      mapScrollEnabled: false,
      showsUserLocation: false,
      followsUserLocation: false,
      stationaryLocation: {timestamp: '',latitude:0,longitude:0},
      stationaryRadius: 0,
      markers: [],
      stopZones: [],
      geofences: [],
      geofencesHit: [],
      geofencesHitEvents: [],
      coordinates: [],
      // Application settings
      settings: {},
      // BackgroundGeolocation state
      bgGeo: {}
    };

    this.settingsService = SettingsService.getInstance();
    this.settingsService.setUsername('bro');
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
           (position) => {
             console.log("wokeeey");
             console.log(position);
             this.setState({
               pos:position.coords,
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
               error: null,
             });
           },
           (error) => this.setState({ error: error.message }),
           { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
         );

  }

  render(){
    if (this.state.latitude==null)
    {return(
    // <Text>{JSON.stringify(this.state.locationResult)}</Text>
      null
    )

  }
  else {
    return (
      <MapView
          ref="map"
          style={styles.map}
          initialRegion={{
          latitude:this.state.latitude,
          longitude:this.state.longitude,
          latitudeDelta: 0.01,
            longitudeDelta: 0.0011
        }}
          showsUserLocation={true}
          followsUserLocation={false}
          // onLongPress={this.onLongPress.bind(this)}
          // onPanDrag={this.onMapPanDrag.bind(this)}
          scrollEnabled={true}
          showsMyLocationButton={false}
          showsPointsOfInterest={false}
          showsScale={false}
          showsTraffic={false}
          toolbarEnabled={false}>
          <MapView.Circle
            key="10"
            radius={200.25}
            fillColor={STATIONARY_REGION_FILL_COLOR}
            strokeColor={STATIONARY_REGION_STROKE_COLOR}
            strokeWidth={1}
            center={{latitude: this.state.pos.latitude, longitude: this.state.pos.longitude}}
          />
          </MapView>

          //Trying to invoke interface method iterator on null object
          // <MapView.Polyline
          //             key="polyline"
          //             coordinates={(!this.state.settings.hidePolyline) ? this.state.coordinates : []}
          //             geodesic={true}
          //             strokeColor='rgba(0,179,253, 0.6)'
          //             strokeWidth={6}
          //             zIndex={0}
          //           />

    )
  }
}

}


let { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: width,
    height: height,
  },
});
