import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import WelcomeScreen from './screens/WelcomeScreen';
import { AppTabNavigator } from './components/AppTabNavigator'
import {AppDrawerNavigator} from './components/AppDrawerNavigator'
import BookDonateScreen from './screens/BookDonateScreen';
import RecieverScreen from './screens/RecieverScreen';

export default function App() {
  return (
    <AppContainer/>
  );
}


const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  DrawerTab:{screen: AppDrawerNavigator},
  BookDonateList:{screen:BookDonateScreen, navigationOptions:{headerShown:false}},
  RecieverDetails:{screen:RecieverScreen, navigationOptions:{headerShown:false}},
})

const AppContainer =  createAppContainer(switchNavigator);
