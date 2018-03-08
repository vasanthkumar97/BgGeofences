import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView from 'react-native-maps';


export default class App extends React.Component{
  state = {
  region:null,
  result:"yo",
  pos:null,
  latitude:null,
  longitude:null,
  polygon : [
    { lat: 17.4222059, lng: 78.3818687 },
    { lat: 17.3222059, lng: 78.1818687 },
    { lat: 17.1222059,  lng: 77.8818687 },
    { lat: 16.8222059, lng: 78.6818687},
    { lat: 16.7222059, lng: 78.4818687 },
    { lat: 17.4222059, lng: 78.3818687 } // last point has to be same as first point
  ]
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
           (position) => {
             console.log("wokeeey");
             console.log(position);
             this.setState({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
               error: null,
             });
           },
           (error) => this.setState({ error: error.message }),
           { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
         );

  this._getLocationAsync();
  }

  _getLocationAsync = async () => {


  // let location = await Location.getCurrentPositionAsync({});
  // // console.log(location["coords"])
  // this.setState({ region: {latitude: location.coords.latitude,
  //           longitude: location.coords.longitude,
  //           latitudeDelta: 0.01,
  //           longitudeDelta: 0.0011 }});
  // console.log(this.state.region)
   };
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
        style={{flex:1}}
        initialRegion={{
          latitude:this.state.latitude,
          longitude:this.state.longitude,
          latitudeDelta: 0.01,
            longitudeDelta: 0.0011
        }}
    >
    <MapView.Marker coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}

              >

          </MapView.Marker>
        </MapView>
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
