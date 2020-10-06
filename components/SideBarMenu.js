import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    FlatList,
    ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader'
import db from '../config';
import firebase from 'firebase';

import {DrawerItems} from 'react-navigation-drawer'

export class SideBar extends React.Component {

    constructor() {
        super()
    }

    render() {
        return(
            <View style = {{flex:1}}>
                <Text>Navigation Menu</Text>

                <View style ={styles.drawerContainer}>
                    <DrawerItems {...this.props}></DrawerItems>
                </View>

                <View style = {styles.logOutContainer}>
                    <TouchableOpacity style = {styles.button} onPress = {()=>
                    {firebase.auth().signOut(); this.props.navigation.navigate("WelcomeScreen")}}><Text>Log Out</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    drawerContainer: {
        flex:0.8
    },
    button: {
        width:200,
       height:40,
       alignItems:'center',
       justifyContent:'center',
       borderWidth:1,
       borderRadius:10,
       marginTop:30
      }
})