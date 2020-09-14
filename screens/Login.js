import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Button } from 'react-native';
import db from "../config"
import firebase from "firebase"
import SantaAnim from '../santa'

export default class LoginScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            logPassword: '',
            isModalVisible: "false",
            firstName: "",
            lastName: "",
            address: "",
            mobile: "",
            regEmail: "",
            username:"",
            confirmPassword:"",
            regPassword:"",
        }
    }

    showModal = ()=>{
        return(
            <Modal animationType = "fade" transparent = {true} visible = {this.state.isModalVisible} >
                <View style = {styles.ModalContainer}>
                    <ScrollView style = {{width:"100%",}}>
                        <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
                            <Text style = {styles.ModalTitle}>Registration Form</Text>

                            <TextInput style = {styles.TextInput} placeholder = {"First Name"} maxLength = {12} onChangeText = {(text)=>{
                                this.setState({
                                    firstName:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Last Name"} maxLength = {12} onChangeText = {(text)=>{
                                this.setState({
                                    lastName:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Adress"} maxLength = {30} onChangeText = {(text)=>{
                                this.setState({
                                    address:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Mobile Number"} maxLength = {12} onChangeText = {(text)=>{
                                this.setState({
                                    mobile:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Display Name"} maxLength = {12} onChangeText = {(text)=>{
                                this.setState({
                                    username:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Email"} maxLength = {25} onChangeText = {(text)=>{
                                this.setState({
                                    regEmail:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Password"}  onChangeText = {(text)=>{
                                this.setState({
                                    regPassword:text
                                })
                            }}></TextInput>

                            <TextInput style = {styles.TextInput} placeholder = {"Confirm Password"} onChangeText = {(text)=>{
                                this.setState({
                                    confirmPassword:text
                                })
                            }}></TextInput>

                            <Button title = "Submit" style = {{backgroundColor: "green"}} 
                            onPress = {() => {this.signUp(this.state.regEmail, this.state.regPassword)}}></Button>

                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }
    
    login = async (email, logPassword)=> {
        firebase.auth().signInWithEmailAndPassword(email, logPassword).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode)
          });
    }

    signUp = async (email, logPassword)=> {

        if (regPassword == confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(email, logPassword).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorCode + " " + errorMessage)
            });
            alert("User Added")
        }

        else {
            alert("Passwords do not match")
        }
        
    }

    changeModalVisibility(arg) {
        if (arg) {
            this.setState({isModalVisible:"true"})
        }

        else {
            this.setState({isModalVisible:"false"})
        }
        
    }


    render() {
        return(
            <View>

                {this.showModal}

                <Text style = {{alignSelf:"center", fontSize:20, fontFamily:"comic sans", backgroundColor:"cyan"}}>BOOK SANTA APP!</Text>
                

                <TextInput style  = {{borderRadius: 5, borderwidth:3, width:200, height:50, marginTop: 50}} 
                placeholder = "Email" keyboardType = "email-address" onChangeText = {(text)=>{this.setState({email:text,})}}></TextInput>

                <TextInput style  = {{borderRadius: 5, borderwidth:3, width:200, height:50, marginTop: 10}} placeholder = "Password" 
                keyboardType = "default" secureTextEntry = {true} onChangeText = {(text)=>{this.setState({logPassword:text,})
                }}></TextInput>

                <TouchableOpacity style = {{borderRadius: 10, width: 200, height: 70, marginTop:20, borderWidth:10}} 
                onPress = {()=>{this.login(this.state.email, this.state.logPassword)}}><Text style = {{fontSize: 40, paddingLeft:30, 
                backgroundColor: "green"}}>LOGIN</Text></TouchableOpacity>

                <TouchableOpacity style = {{borderRadius: 10, width: 200, height: 70, marginTop:20, borderWidth:10}} 
                onPress = {()=>{this.changeModalVisibility(true)}}><Text style = {{fontSize: 35, paddingLeft:30, 
                backgroundColor: "green"}}>SIGN UP</Text></TouchableOpacity>


                <TouchableOpacity style = {{borderRadius: 10, width: 200, height: 70, marginTop:40, borderWidth:10}} 
                onPress = {()=>{this.setState({isModalVisible: "false",})}}
                ><Text style = {{fontSize: 40, paddingLeft: 45}}>Back</Text></TouchableOpacity>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    TextInput: {
        borderRadius: 5, borderwidth:3, width:200, height:50, marginTop: 50
    },

    ModalContainer: {
        alignItems:'center'
    },

    KeyboardAvoidingView: {
        alignItems:'center',
        borderWidth:10,
        borderRadius:10,
    }
})