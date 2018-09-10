import React from 'react';
import { StyleSheet, Text, View,Animated } from 'react-native';
import {createStackNavigator} from "react-navigation";
import HomeScreen from "./HomeScreen";
import HashTagCat from "./HashTagCat";
import AllTag from './AllTag';
import SplashScreen from "react-native-splash-screen";
import { 
  AdMobBanner, 
  AdMobInterstitial, 
  PublisherBanner,
  AdMobRewarded
} from 'react-native-admob'
export default class App extends React.Component {
componentDidMount(){
  SplashScreen.hide()
}

  render() {
    const MyApp = createStackNavigator({
      Home: { screen: HomeScreen },
     HashTag:{screen:HashTagCat},
     AllTag:{screen:AllTag}

    }, {
      initialRouteName: 'Home',
    }) 


    return (
      <View style={styles.container}>    
<AdMobBanner
  bannerSize="fullBanner"
  adUnitID="ca-app-pub-3431461315938838/6128104860"
  testDeviceID="EMULATOR"
  didFailToReceiveAdWithError={this.bannerError} />
 
      </View>
    );   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#3344C1',
  },
});
