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


export default class CreateScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Add Task',
  };

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      type: 'Personal',
      isDateTimePickerVisible: false,
      date: moment()
    };

    this._insert = this._insert.bind(this);

    this.db = SQLite.openDatabase({ 
      name: 'assignmentdb', 
      createFromLocation: '~assignmentDb.sqlite' }, 
      this.openDb, this.errorDb);
  }
  _insert() {
    var displayTime=moment(this.state.date).format('LT');
    console.log(displayTime)
    this.db.transaction((tx) => {
      tx.executeSql('INSERT INTO tasks (title,type,date,displayTime) VALUES(?,?,?,?)', [
        this.state.title,
        this.state.type,
        this.state.date.getTime(),
        displayTime,
      ],);
    });
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
    return 'Pick a reminder time';
  }

  _checkIfButtonSubmitDisabled() {
    if(this.state.title.length>4&&this.state.date>moment()){
      return false;
    }
    return true;
  }
  _changeTitle = title => this.setState({ title })
  render() {
    console.log(this.state)
    return (
      <Container>

        <Header>
          <Body>
            <Title> Add Task</Title>
          </Body>
        </Header>

        <View>
          <View style={styles.theContent}>
            <View style={styles.item}>
              <FormLabel>Title</FormLabel>
              <FormInput
                onChangeText={this._changeTitle}
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
                title="Create a reminder"
                onPress={() => this._insert()}
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

