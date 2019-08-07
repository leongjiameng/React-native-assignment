
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Header,Body,Title, Container } from "native-base";


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <Container>
        <Header>
          <Body>
            <Title> Contact Us</Title>
          </Body>
        </Header>
      <View style={styles.container}>
       
        <Text style={styles.welcome}>
          Welcome to theTaskReminderApps!
        </Text>
        <Text style={styles.instructions}>
          To contact us, please email us at
        </Text>
        <Text style={styles.instructions}>
          {'leongjiameng@outlook.com'}
        </Text>
      </View>
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
});
