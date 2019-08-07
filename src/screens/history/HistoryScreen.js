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



let SQLite = require('react-native-sqlite-storage');


export default class CheckBoxExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
        pastTasks: [],
    }

    this._query = this._query.bind(this);

    this.db = SQLite.openDatabase({
      name: 'assignmentdb',
      createFromLocation: '~assignmentDb.sqlite'
    },
      this.openDb, this.errorDb);
  }


  componentDidMount() {
    this._query();
  }

  _query() {
    let minTime = moment().unix();
    this.db.transaction((tx) => {
      tx.executeSql('select * from tasks where date<? order by date DESC', [
        minTime * 1000,
      ], (tx, results) => {
        console.log(results.rows.raw())
        this.setState({
          pastTasks: results.rows.raw(),
        })
      });
    });
  }

  openDb() {
    console.log('Database opened');
  }

  errorDb(err) {
    console.log('SQL Error: ' + err);
  }
  render() {
    
    return (
      <Container>
          <Header>
          <Body>
            <Title> Past Reminder</Title>
          </Body>
        </Header>
        <Content>
          <List dataArray={this.state.pastTasks}
           renderRow={(pastTask) =>
            <ListItem
           onPress={() => {this.props.navigation.navigate('View', {
                  id: pastTask.id,
                  headerTitle: pastTask.title,
                  refresh: this._query,
                })
              }}
            >
              <Left><Text>{pastTask.title}</Text></Left>
              <Right>
               <Text note>{pastTask.type}</Text>
               </Right>
             </ListItem>
          }>
          </List>
          <View style={styles.space}></View>
 


        </Content>
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