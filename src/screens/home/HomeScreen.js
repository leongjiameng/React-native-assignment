import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Tabs,
  Tab,
  Right,
  Text,
  Left,
  Body,
  Content,
  Icon,
  ListItem,
  List,
  Separator,
  View
} from "native-base";

import { StyleSheet, TouchableHighlight } from 'react-native';

import moment from 'moment';


let SQLite = require('react-native-sqlite-storage');

export default class BasicTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todayPersonaltasks: [],
      todayWorktasks: [],
      todayGrocerytasks: [],
      tomorrowPersonaltasks: [],
      tomorrowWorktasks: [],
      tomorrowGrocerytasks: [],
      upcomingPersonaltasks: [],
      upcomingWorktasks: [],
      upcomingGrocerytasks: [],
    }

    this._today_query = this._today_query.bind(this);
    this._tomorrow_query = this._tomorrow_query.bind(this);
    this._upcoming_query = this._upcoming_query.bind(this);
    this.db = SQLite.openDatabase({
      name: 'assignmentdb',
      createFromLocation: '~assignmentDb.sqlite'
    },
      this.openDb, this.errorDb);
  }

  componentDidMount() {
    this._today_query();
    this._tomorrow_query();
    this._upcoming_query();
  }

  _today_query() {
    let today = moment().unix();
    let tomorrow = moment(new Date()).startOf('day').add(1, 'days').unix();
    this.db.transaction((tx) => {
      tx.executeSql('select * from tasks where date<? and date>=? and type = ? ', [
        tomorrow * 1000,
        today * 1000,
        'Personal'
      ], (tx, results) => {
        console.log(results.rows.raw())
        this.setState({
          todayPersonaltasks: results.rows.raw(),
        })
      });
      tx.executeSql('select * from tasks where date<? and date>=? and type = ? ', [
        tomorrow * 1000,
        today * 1000,
        'Work'
      ], (tx, results) => {
        console.log(results.rows.raw())
        this.setState({
          todayWorktasks: results.rows.raw(),
        })
      });
      tx.executeSql('select * from tasks where date<? and date>=? and type = ? ', [
        tomorrow * 1000,
        today * 1000,
        'Grocery'
      ], (tx, results) => {
        console.log(results.rows.raw())
        this.setState({
          todayGrocerytasks: results.rows.raw(),
        })
      });
    });
  }

  _tomorrow_query() {
    let minTime = moment(new Date()).startOf('day').add(1, 'days').unix();
    let maxTime = moment(new Date()).startOf('day').add(2, 'days').unix();
    this.db.transaction((tx) => {
      tx.executeSql('select * from tasks where date<? and date>=? and type = ? ', [
        maxTime * 1000,
        minTime * 1000,
        'Personal'
      ], (tx, results) => {
        console.log(results.rows.raw())
        this.setState({
          tomorrowPersonaltasks: results.rows.raw(),
        })
      });
      tx.executeSql('select * from tasks where date<? and date>=? and type = ? ', [
        maxTime * 1000,
        minTime * 1000,
        'Work'
      ], (tx, results) => {
        console.log(results.rows.raw())
        this.setState({
          tomorrowWorktasks: results.rows.raw(),
        })
      });
      tx.executeSql('select * from tasks where date<? and date>=? and type = ? ', [
        maxTime * 1000,
        minTime * 1000,
        'Grocery'
      ], (tx, results) => {
        console.log(results.rows.raw())
        this.setState({
          tomorrowGrocerytasks: results.rows.raw(),
        })
      });
    });
  }

  _upcoming_query() {
    let minTime = moment(new Date()).startOf('day').add(2, 'days').unix();
    this.db.transaction((tx) => {
      tx.executeSql('select * from tasks where date>=? and type = ? ', [
        minTime * 1000,
        'Personal'
      ], (tx, results) => {
        console.log(results.rows.raw())
        this.setState({
          upcomingPersonaltasks: results.rows.raw(),
        })
      });
      tx.executeSql('select * from tasks where date>=? and type = ? ', [
        minTime * 1000,
        'Work'
      ], (tx, results) => {
        console.log(results.rows.raw())
        this.setState({
          upcomingWorktasks: results.rows.raw(),
        })
      });
      tx.executeSql('select * from tasks where date>=? and type = ? ', [
        minTime * 1000,
        'Grocery'
      ], (tx, results) => {
        console.log(results.rows.raw())
        this.setState({
          upcomingGrocerytasks: results.rows.raw(),
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
        <Header hasTabs>
          <Body>
            <Title> Task Reminder</Title>
          </Body>
          <Right>
            <Button
              hasText
              transparent
              onPress={() => this.props.navigation.navigate('Create', {
                refresh: this._query,
              })
              }
            >
              <Text>Create</Text>
            </Button>
          </Right>
        </Header>

        <Tabs>
          <Tab heading="Today">
            <Container>
              <Content>
                <Separator bordered>
                  <Text>Personal</Text>
                </Separator>
                <List dataArray={this.state.todayPersonaltasks}
                  renderRow={(todayPersonaltask) =>
                    <ListItem
                      onPress={() => {
                        this.props.navigation.navigate('View', {
                          id: todayPersonaltask.id,
                          headerTitle: todayPersonaltask.title,
                          refresh: this._today_query,
                        })
                      }}
                    >
                      <Left><Text>{todayPersonaltask.title}</Text></Left>
                      <Right>
                        <Text note>{todayPersonaltask.displayTime}</Text>
                      </Right>
                    </ListItem>
                  }>
                </List>

                <View style={styles.space}></View>
                <Separator bordered>
                  <Text>Work</Text>
                </Separator>
                <List dataArray={this.state.todayWorktasks}
                  renderRow={(todayWorktask) =>
                    <ListItem
                      onPress={() => {
                        this.props.navigation.navigate('View', {
                          id: todayWorktask.id,
                          headerTitle: todayWorktask.title,
                          refresh: this._today_query,
                        })
                      }}
                    >
                      <Left>
                        <Text>{todayWorktask.title}</Text>
                      </Left>
                      <Right>
                        <Text note>{todayWorktask.displayTime}</Text>
                      </Right>
                    </ListItem>
                  }>
                </List>
                <View style={styles.space}></View>
                <Separator bordered>
                  <Text>Grocery List</Text>
                </Separator>
                <List dataArray={this.state.todayGrocerytasks}
                  renderRow={(todayGrocerytask) =>
                    <ListItem
                      onPress={() => {
                        this.props.navigation.navigate('View', {
                          id: todayGrocerytask.id,
                          headerTitle: todayGrocerytask.title,
                          refresh: this._today_query,
                        })
                      }}
                    >
                      <Left>
                        <Text>{todayGrocerytask.title}</Text>
                      </Left>
                      <Right>
                        <Text note>{todayGrocerytask.displayTime}</Text>
                      </Right>
                    </ListItem>
                  }>
                </List>
              </Content>
            </Container>
          </Tab>

          <Tab heading="Tomorrow">
            <Container>
              <Content>
                <Separator bordered>
                  <Text>Personal</Text>
                </Separator>
                <List dataArray={this.state.tomorrowPersonaltasks}
                  renderRow={(tomorrowPersonaltask) =>
                    <ListItem
                      onPress={() => {
                        this.props.navigation.navigate('View', {
                          id: tomorrowPersonaltask.id,
                          headerTitle: tomorrowPersonaltask.title,
                          refresh: this._tomorrow_query,
                        })
                      }}
                    >
                      <Left><Text>{tomorrowPersonaltask.title}</Text></Left>
                      <Right>
                        <Text note>{tomorrowPersonaltask.displayTime}</Text>
                      </Right>
                    </ListItem>
                  }>
                </List>
                <View style={styles.space}></View>
                <Separator bordered>
                  <Text>Work</Text>
                </Separator>
                <List dataArray={this.state.tomorrowWorktasks}
                  renderRow={(tomorrowWorktask) =>
                    <ListItem
                      onPress={() => {
                        this.props.navigation.navigate('View', {
                          id: tomorrowWorktask.id,
                          headerTitle: tomorrowWorktask.title,
                          refresh: this._tomorrow_query,
                        })
                      }}
                    >
                      <Left>
                        <Text>{tomorrowWorktask.title}</Text>
                      </Left>
                      <Right>
                        <Text note>{tomorrowWorktask.displayTime}</Text>
                      </Right>
                    </ListItem>
                  }>
                </List>
                <View style={styles.space}></View>
                <Separator bordered>
                  <Text>Grocery List</Text>
                </Separator>
                <List dataArray={this.state.tomorrowGrocerytasks}
                  renderRow={(tomorrowGrocerytask) =>
                    <ListItem
                      onPress={() => {
                        this.props.navigation.navigate('View', {
                          id: tomorrowGrocerytask.id,
                          headerTitle: tomorrowGrocerytask.title,
                          refresh: this._tomorrow_query,
                        })
                      }}
                    >
                      <Left>
                        <Text>{tomorrowGrocerytask.title}</Text>
                      </Left>
                      <Right>
                        <Text note>{tomorrowGrocerytask.displayTime}</Text>
                      </Right>
                    </ListItem>
                  }>
                </List>
              </Content>
            </Container>
          </Tab>
          <Tab heading="Upcoming">
            <Container>
              <Content>
                <Separator bordered>
                  <Text>Personal</Text>
                </Separator>
                <List dataArray={this.state.upcomingPersonaltasks}
                  renderRow={(upcomingPersonaltask) =>
                    <ListItem
                      onPress={() => {
                        this.props.navigation.navigate('View', {
                          id: upcomingPersonaltask.id,
                          headerTitle: upcomingPersonaltask.title,
                          refresh: this._upcoming_query,
                        })
                      }}
                    >
                      <Left><Text>{upcomingPersonaltask.title}</Text></Left>
                      <Right>
                        <Text note>{moment(upcomingPersonaltask.date).format('MMM Do YY')}</Text>
                      </Right>
                    </ListItem>
                  }>
                </List>
                <View style={styles.space}></View>
                <Separator bordered>
                  <Text>Work</Text>
                </Separator>
                <List dataArray={this.state.upcomingWorktasks}
                  renderRow={(upcomingWorktask) =>
                    <ListItem
                      onPress={() => {
                        this.props.navigation.navigate('View', {
                          id: upcomingWorktask.id,
                          headerTitle: upcomingWorktask.title,
                          refresh: this._upcoming_query,
                        })
                      }}
                    >
                      <Left>
                        <Text>{upcomingWorktask.title}</Text>
                      </Left>
                      <Right>
                        <Text note>{moment(upcomingWorktask.date).format('MMM Do YY')}</Text>

                      </Right>
                    </ListItem>
                  }>
                </List>
                <View style={styles.space}></View>
                <Separator bordered>
                  <Text>Grocery List</Text>
                </Separator>
                <List dataArray={this.state.upcomingGrocerytasks}
                  renderRow={(upcomingGrocerytask) =>
                    <ListItem
                      onPress={() => {
                        this.props.navigation.navigate('View', {
                          id: upcomingGrocerytask.id,
                          headerTitle: upcomingGrocerytask.title,
                          refresh: this._upcoming_query,
                        })
                      }}
                    >
                      <Left>
                        <Text>{upcomingGrocerytask.title}</Text>
                      </Left>
                      <Right>
                        <Text note>{moment(upcomingGrocerytasks.date).format('MMM Do YY')}</Text>

                      </Right>
                    </ListItem>
                  }>
                </List>
              </Content>
            </Container>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  space: {
    margin: '3%',
  },
  itemSubtitle: {
    fontSize: 18,
  },
});