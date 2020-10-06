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
    ScrollView} from 'react-native';

import MyHeader from '../components/MyHeader'
import db from '../config';
import firebase from 'firebase';

export default class SettingsScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            first_name:"",
            last_name:"",
            contact:'',
            adress:'',
            docID:'',
            emailId:'',
        }
    }

    componentDidMount() {
        this.updateUserDetails()
    }

    updateUserDetails() {
        var user = firebase.auth().currentUser;
        var email = user.email;

        db.collection('Users').where("emailID", "==", email).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                var data = doc.data()
            
            this.setState({
                first_name:data.firstName,
                last_name:data.lastName,
                contact:data.contact,
                adress:data.address,
                emailId:doc.emailId,
                docId:doc.id
            })

            alert("Profile Has Been Updated")
        })
        })
    }

    render() {
        return(
            <View style = {{flex:1}}>
                <MyHeader title = "Settings" navigation = {this.props.navigation}></MyHeader>
                <View>
                    <TextInput style = {styles.formTextInput} placeholder = "New Fist Name" maxLength = {8} onChangeText = {(text)=>{this.setState({
                        first_name:text,
                    })}} value = {this.state.first_name}></TextInput>

                    <TextInput style = {styles.formTextInput} placeholder = "New Last Name" maxLength = {8} onChangeText = {(text)=>{this.setState({
                        last_name:text,
                    })}} value = {this.state.last_name}></TextInput>

                    <TextInput style = {styles.formTextInput} placeholder = "New Contact" keyboardType = "numeric" onChangeText = {(text)=>{this.setState({
                        contact:text,
                    })}} value = {this.state.contact}></TextInput>

                    <TextInput style = {styles.formTextInput} placeholder = "Adress" multiline = {true} onChangeText = {(text)=>{this.setState({
                        adress:text,
                    })}} value = {this.state.adress}></TextInput>

                    <TouchableOpacity style = {styles.button} onPress = {this.updateUserDetails}><Text>Save</Text></TouchableOpacity>
                </View>    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },

      button:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
})