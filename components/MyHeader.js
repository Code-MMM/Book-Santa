import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';

export default class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    }
  }
}

const MyHeader = props => {
  return (
    <Header
      centerComponent={{ text: props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
      backgroundColor = "#eaf8fe"
      leftComponent = {<Icon name = "bars" type = "font-awesome" color = "#696969" onPress = {()=>{props.navigation.toggleDrawer()}}></Icon>}
      rightComponent = {<BellIconWithBadge {...props}></BellIconWithBadge>}
    />
  );
};

const BellIconWithBadge = props => {
  return(
    <View>
       <Icon name = "bell" type = "font-awesome" color = "#696969" size = {20} onPress = {()=>{props.navigation.navigate('Notifictions')}}></Icon>
       <Badge value = "1" containerStyle = {{position:"absolute", top:-4, right: -4}}></Badge>
    </View>
  )
}

export default MyHeader;
