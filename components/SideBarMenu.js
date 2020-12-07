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
import {ListItem, Avatar} from 'react-native-elements'
import MyHeader from '../components/MyHeader'
import db from '../config';
import firebase from 'firebase';

import * as ImagePicker from "expo-image-picker"

import {DrawerItems} from 'react-navigation-drawer'

export class SideBar extends React.Component {

    constructor() {
        this.state = {
            image:'',
            userID: firebase.auth().currentUserEmail,
            name: '',
            docid:'',
        }
        super()
    }

    selectPicture = async () =>{
        const {cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing: true ,
            aspect: [4,3],
            quality: 1,
        })

        if (!cancelled) {
            this.setState({image: uri})
            this.uploadImage(uri, this.state.userID)
        }
    }

    uploadImage = async (uri, imageName)=> {
        var response = await fetch(uri);
        var blob = await response.blob();
        var ref = firebase.storage().ref().child("userProfiles/" + imageName)
        return ref.put(blob).then((response)=>{this.fetchImage(imageName)})
    }

    fetchImage = (imageName)=>{
        var storageRef = firebase.storage().ref().child("userProfiles/" + imageName)
        storageRef.getDownloadURL().then((url)=>{this.setState({image:url})}).catch((error)=>{
            this.setState({image:"#"})
        })
    }

    getUserProfile() {
        db.collection('Users').where("emailID", "==", this.state.userID)
        .onSnapshot((querySnapshot)=>{querySnapshot.forEach((doc)=>{
            this.setState({name: doc.data().firstName + " " + doc.data().lastName})
        })})
    }

    componentDidMount() {
        this.fetchImage(this.state.userID)
        this.getUserProfile();
    }

    render() {
        return(
            <View style = {{flex:1}}>

                <View style = {{flex:0.5, alignItems: 'center', backgroundColor:"gray"}}> 
                <Avatar
                    rounded

                    source={{
                        uri:
                        this.state.image,
                    }}

                    size = "medium"

                    onPress = {()=>{this.selectPicture}}

                    containerStyle = {styles.imageContainer}

                    showEditButton
                    >
                </Avatar>
                <Text style = {{fontSize: 20, paddingTop: 10, alignSelf: 'center'}}>{this.state.name}</Text>
                </View>

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