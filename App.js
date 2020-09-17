import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createSwitchNavigator} from "react-navigation"
import LoginScreen from "./screens/Login"
import DonationScreen from './screens/Donation';
import RequestScreen from "./screens/Request"
import { createBottomTabNavigator } from 'react-navigation-tabs'

export default function App() {
  return (
    <View style={styles.container}>
      <AppContainer></AppContainer>
    </View>
  );
}

var AppContainer = createAppContainer(SwitchNavigator)

var SwitchNavigator = createSwitchNavigator({
  LoginScreen:{screen:LoginScreen},
  DonationScreen:{screen:DonationScreen},
  RequestScreen:{screen:RequestScreen},
})

const TabNavigator = createBottomTabNavigator({
  Request: {screen: RequestScreen},
  Donation: {screen: DonationScreen},
},
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
      console.log(routeName)
      if(routeName === "Donation"){
        return(
          <Image
          source={require("./assets/donation.jpg")}
          style={{width:40, height:40}}
        />
        )
        
      }
      else if(routeName === "Request"){
        return(
          <Image
          source={require("./assets/request.jpg")}
          style={{width:40, height:40}}
        />)
        
      }
    }
  })
}
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
