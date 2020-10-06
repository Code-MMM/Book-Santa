import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'


export default class BookRequestScreen extends Component{

  constructor() {
    super()
    this.state = {
      UserID: firebase.auth().currentUser.email,
      BookName:"",
      Reason:"",
    }
  }


  publishRequest = () => {
    db.collection("Requests").add({
      UserID: this.state.UserID,
      BookName: this.state.BookName,
      Reason: this.state.Reason,
    })

    this.setState({
      BookName:"",
      Reason:"",
    })

    alert("Your Request Is Now Available To The Public.")
  }
  
 
  render(){
    return(
      <View style = {{flex:1}}>

        <MyHeader title = "Request Books"></MyHeader>
        <KeyboardAvoidingView style = {styles.KeyboardStyle}>
          <TextInput placeholder = "Book Name" style = {styles.textInput} onChangeText = {(text)=>{this.setState({
              BookName:text
          })  
          }} value = {this.state.BookName}></TextInput>

          <TextInput placeholder = "Reason" style = {styles.textInput} type = "multiline" numberOfLines = {8} onChangeText = {(text)=>{this.setState({
              Reason:text
          })  
          }} value = {this.state.Reason}></TextInput>
          
          <TouchableOpacity style = {styles.button} onPress = {this.publishRequest}>
            <Text>Request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      </View>
    )
  }
}

var styles = StyleSheet.create({
  KeyboardStyle: {
    flex:1,
   justifyContent:'center',
   alignItems:'center'
  },

  textInput: {
    width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
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
        