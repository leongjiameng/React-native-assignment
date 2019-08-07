import React, { Component } from 'react';
import {
  Container,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  CheckBox,
  Text,
  Left,
  Right,
  List,
  Body,
  Separator,
  View,
  Header
} from "native-base";
import{StyleSheet , TouchableHighlight} from 'react-native';
import moment from 'moment';
export default class CheckBoxExample extends Component {
  
  render() {
    
    return (
      <Container>
          <Header>
          <Body>
            <Title> About</Title>
          </Body>
        </Header>
         <List>
             <ListItem
             onPress={() => {this.props.navigation.navigate('FAQ')}}
             >
             <Text> FAQ</Text>
             </ListItem>
             <ListItem
             onPress={() => {this.props.navigation.navigate('AboutUs')}}>
             <Text> About us</Text>
             </ListItem>
             <ListItem
             onPress={() => {this.props.navigation.navigate('ContactUs')}}>
             <Text> Contact us</Text>
             </ListItem>
             
         </List>
        




      </Container>
    );
  }
}


const styles = StyleSheet.create({
  space:{
    margin:'3%',
  },
  itemSubtitle: {
    fontSize: 18,
  },
});