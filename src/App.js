import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import {createMaterialBottomTabNavigator}from
'react-navigation-material-bottom-tabs';
import React, { Component } from "react";
import HomeScreen from './screens/home/HomeScreen';
import CreateScreen from './screens/create/CreateScreen';
import HistoryScreen from './screens/history/HistoryScreen';
import Viewitem from './screens/view/Viewitem';
import EditScreen from './screens/edit/EditScreen';
import AboutScreen from './screens/about/AboutScreen';
import AboutUsScreen from './screens/about/AboutUsScreen';
import AuthorScreen from './screens/about/AuthorScreen';
import FAQScreen from './screens/about/FAQScreen';
import ContactUsScreen from './screens/about/ContactUsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Container,
          Button,
          Footer,
          FooterTab,
          Text,
          Icon } from 'native-base';



export default class App extends Component {
  render() {
    return (
      <Container>
      <HomeScreenTabNavigator />
      
      </Container>
    );
  }
}

const AppStackNavigator=createStackNavigator({
  Home: {
    screen: HomeScreen,
  },

  Create: {
    screen: CreateScreen,
  },

  View: {
    screen: Viewitem,
  },
  Edit: {
    screen: EditScreen,
  },
  

},

 {
  initialRouteName: 'Home',
  headerMode: "none"    
});
const HistoryNavigator =createStackNavigator({
  History: {
    screen: HistoryScreen,
  },
  View:{
    screen:Viewitem,
  },
  Edit:{
    screen:EditScreen,
  },
},
  {
    initialRouteName: 'History',
  headerMode: "none"    });
const AboutNavigator =createStackNavigator({
  About: {
    screen: AboutScreen,
  },
  FAQ:{
    screen:FAQScreen,
  },
  AboutUs:{
    screen:AboutUsScreen,
  },
  Author:{
    screen:AuthorScreen
  },
  ContactUs:{
    screen:ContactUsScreen,
  },
},
  {
    initialRouteName: 'About',
  headerMode: "none"    });
const HomeScreenTabNavigator =createBottomTabNavigator({
  Home: {
      screen: AppStackNavigator,
      navigationOptions: {
          tabBarLabel: 'Home',
          tabBarIcon: () => (
              <Ionicons name="ios-home" size={24} />
          )
      }
  },
  History: {
      screen: HistoryNavigator,
      navigationOptions: {
          tabBarLabel: 'History',
          tabBarIcon: () => (
              <Ionicons name="ios-clipboard" size={24} />
          )
      }
  }, 
  About: {
    screen: AboutNavigator,
    navigationOptions: {
        tabBarLabel: 'About',
        tabBarIcon: () => (
            <Ionicons name="ios-information-circle-outline" size={24} />
        )
    }
}, 
});


