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
import {ListItem, Card, Icon} from 'react-native-elements'
import MyHeader from '../components/MyHeader'
import db from '../config';
import firebase from 'firebase';

export default class MyDonations extends React.Component {
    constructor() {
        super()
        this.state = {
            userID: firebase.auth().currentUser.email,
            allDonations:[],
        }
        this.requestRef = null;
    }

    keyExtractor = (item, index) => index.toString()
    renderItem = ({item, i}) => {
      return(
        <ListItem key = {i} title = {item.BookName} subtitle = {"Requested by: " + item.RecieverName + "\nStatus: " + item.RequestStatus} titleStyle = 
        {{color:"black", fontWeight: "bold"}} leftElement = {<Icon name = "Book" type = "font-awesome" color = "blue"></Icon>} rightElement = {
          <TouchableOpacity style = {styles.button} onPress = {()=>{this.props.navigation.navigate(
            "RecieverDetails", {'details':item}
          )}}><Text>View Content</Text></TouchableOpacity>
        } bottomDivider></ListItem>
      )
    }

    getAllDonations = () => {
        this.requestRef = db.collection('Donations').where("DonorID", "==", this.state.userID).onSnapshot((snapshot)=>{
            var allDonations = snapshot.docs.map(document=>document.data())
            this.setState({
                allDonations:allDonations
            })
        })
    }

    componentDidMount() {
        this.getAllDonations()
    }

    render() {
        return(
            <View style = {{flex:1}}>
                <MyHeader navigation = {this.props.navigation} title = "My Donations"></MyHeader>

                <View style = {{flex:1}}>
                    {this.state.allDonations.length===0?(<Text>You dont have any outgoing donations.</Text>):(<FlatList keyExtractor = {this.keyExtractor}
                        data = {this.allDonations} renderItem = {this.renderItem}
                    ></FlatList>)}
                </View>

            </View>
        )
    }
}