import React, { Component } from 'react';

import {
  StyleSheet,
  TextInput,
  ScrollView,
  DatePickerAndroid,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  TextField,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Form,
  Text,
} from "native-base";

import { FormInput, FormLabel, Button } from 'react-native-elements';

import { Picker } from 'react-native-picker-dropdown'

import DateTimePicker from 'react-native-modal-datetime-picker';

import moment from "moment";

let SQLite = require('react-native-sqlite-storage');


export default class EditScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Edit Task',
  };

  constructor(props) {
    super(props)
    this.state = {
      taskId: this.props.navigation.getParam('id'),
      title: '',
      type: '',
      isDateTimePickerVisible: false,
      date: '',
      displayTime:''
    };


    this._query = this._query.bind(this);
    this._update = this._update.bind(this);

 
    this.db = SQLite.openDatabase({ 
      name: 'assignmentdb', 
      createFromLocation: '~assignmentDb.sqlite' }, 
      this.openDb, this.errorDb);
  }

  componentDidMount() {
    this._query();
  }



  _query() {
    this.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tasks WHERE id = ?', [this.state.taskId], (tx, results) => {
        if(results.rows.length) {
          this.setState({
            title: results.rows.item(0).title,
            type: results.rows.item(0).type,
            date: results.rows.item(0).date,
            displayTime: results.rows.item(0).displayTime
          })
        }
      })
    });
  }


  _update() {
    this.db.transaction((tx) => {
      tx.executeSql('UPDATE tasks SET title=?,type=?,date=?,displayTime=? WHERE id=?', [
        this.state.title,
        this.state.type,
        moment(this.state.date).unix,
        this.state.displayTime,
        this.state.taskId,
      ]);
    });

    this.props.navigation.getParam('refresh')();
    this.props.navigation.getParam('homeRefresh')();
    this.props.navigation.goBack();
  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })


  _handleDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  _handleDatePicked = date => {
    this.setState({ date });
    this._handleDateTimePicker();
  }

  _checkTitle() {
    const { date } = this.state;
    if (date > moment()) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
  }

  _checkIfButtonSubmitDisabled() {
    if(this.state.title.length>4){
      return false;
    }
    return true;
  }
  render() {
    console.log(this.state)
    return (
      <Container>

        <Header>
          <Body>
            <Title>Edit Task</Title>
          </Body>
        </Header>

        <View>
          <View style={styles.theContent}>
            <View style={styles.item}>
              <FormLabel>Title</FormLabel>
              <FormInput
                onChangeText={(title) => {this.setState({title})}}
                value={this.state.title}
              />
            </View>
            <View style={styles.item}>
              <FormLabel>Type</FormLabel>
              <Picker style={styles.picker}
                selectedValue={this.state.type}
                onValueChange={(type) => { this.setState({ type }) }}
                mode="dialog"
                textStyle={styles.pickerText}
              >
                <Picker.Item label="Personal" value="Personal" />
                <Picker.Item label="Work" value="Work" />
                <Picker.Item label="Grocery" value="Grocery" />
              </Picker>
            </View>
            <View style={styles.item}>
              <FormLabel>Reminder Time</FormLabel>
              <Button
                backgroundColor='black'
                onPress={() => this._showDateTimePicker()}
                title={this._checkTitle()}
                raised
              />
            </View>
            <View style={styles.buttonCreate}>
              <Button
                title="Update a reminder"
                onPress={() => this._update()}
                backgroundColor="#33a5ff"
                raised
                disabled={this._checkIfButtonSubmitDisabled()}
              />
            </View>
          </View>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._handleDateTimePicker}
            mode="datetime"
            is24Hour={false}
          />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({

  input: {
    fontSize: 16,
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
  picker: {
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    marginLeft: 7
  },
  pickerText: {
    color: 'black',
  },
  theContent: {
    margin: '2%',
  },
  item: {
    marginVertical: '2%',
  },
  buttonCreate: {
    position: 'relative',
    marginTop: '20%'

  }
});