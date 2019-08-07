/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { Container, Header, Title,Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
let config = require('./Config');
type Props = {};
export default class App extends Component<Props> {
    static navigationOptions = ({navigation}) => {
    return {
          title: navigation.getParam('headerTitle')
        };
      }; 
      constructor(props) {
        super(props)
    
        this.state = {
          id: this.props.navigation.getParam('id'),
          author: null,
        };
        
        this._load = this._load.bind(this);
        

      }

      componentDidMount() {
        this._load();
      }

      _load() {
        let url = config.settings.serverPath + '/api/authors/' + this.state.id;
    
        fetch(url)
        .then((response) => {
          if(!response.ok) {
            Alert.alert('Error', response.status.toString());
            throw Error('Error ' + response.status);
          }
    
          return response.json()
        })
        .then((author) => {
          this.setState({author});
        })
        .catch((error) => {
          console.error(error);
        });
      }
    
  render() {
    let author = this.state.author;

    return (
      <Container  >
          <Header>
              <Body><Title>{author ? author.name : ''}'s info</Title></Body>
              
          </Header>
           <Card style={styles.app}>
            <CardItem>
              <Left>
                <Body>
                  <Text>{author ? author.name : ''}</Text>
                  <Text note>{author ? author.city : ''}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {author ? author.intro : ''}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Text>Email:{author ? author.email : ''}</Text>
            </CardItem>
          </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  app:{
      margin:'3%'
  }
});
