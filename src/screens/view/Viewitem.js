
import React, { Component } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
} from 'react-native';

import {
  InputWithLabel,
  AppButton,
} from './UI';
import {Header,Container,Body,Title} from "native-base";
import moment from "moment";
import { FormInput, FormLabel, Button } from 'react-native-elements';


let SQLite = require('react-native-sqlite-storage');
type Props = {};
export default class Viewitem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      taskId: this.props.navigation.getParam('id'),
      task: null,
    };

    this._query = this._query.bind(this);

    this._delete = this._delete.bind(this);

    this.db = SQLite.openDatabase({ name: 'assignmentdb', createFromLocation: '~assignmentDb.sqlite' }, this.openDb, this.errorDb);
  }

  componentDidMount() {
    this._query();
  }

  _query() {
    this.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tasks WHERE id = ?', [this.state.taskId], (tx, results) => {
        if (results.rows.length) {
          this.setState({
            task: results.rows.item(0),
          })
          console.log(results.rows.item(0))
        }
      })
    });
  }

  _delete() {
    Alert.alert('Confirm Deletion', 'Delete `'+ this.state.task.title +'`?', [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'Yes',
        onPress: () => {
          this.db.transaction((tx) => {
            tx.executeSql('DELETE FROM tasks WHERE id = ?', [this.state.taskId])
          });

          this.props.navigation.getParam('refresh')();
          this.props.navigation.goBack();
        },
      },
    ], { cancelable: false });
  }

  openDb() {
    console.log('Database opened');
  }

  errorDb(err) {
    console.log('SQL Error: ' + err);
  }

  render() {
    let task = this.state.task;
    let theDate = new Date(task ? task.date : '')
    var displayDate = moment(theDate).format('LLL')
    return (
      <Container>
      <ScrollView>
         <Header>
          <Body>
            <Title>{task ? task.title:''}</Title>
          </Body>
        </Header>
        <InputWithLabel style={styles.output}
          label={'Title'}
          value={task ? task.title : ''}
          orientation={'vertical'}
          editable={false}
        />
        <InputWithLabel style={styles.output}
          label={'Type'}
          value={task ? task.type : ''}
          orientation={'vertical'}
          editable={false}
        />
        <InputWithLabel style={styles.output}
          label={'Date'}
          value={displayDate}
          orientation={'vertical'}
          editable={false}
        />

        <Button
          onPress={this._delete}
          backgroundColor='red'
          title={'Delete'}
        />

        <View style={styles.space}>

        </View>

        <Button
          backgroundColor='#3F51B5'
          onPress={() => this.props.navigation.navigate('Edit', {
          id: this.state.task ? this.state.task.id : 0,
          headerTitle: this.state.task ? this.state.title : '',
          refresh: this._load,
          indexRefresh: this.props.navigation.getParam('refresh'),
          })}
          title={'Update'}
          raised
      />

      </ScrollView>
      </Container>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000099',
  },
  output: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    color: '#00FFFF',
  },space: {
    margin: '3%',
  }

});
