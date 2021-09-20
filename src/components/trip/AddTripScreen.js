import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Button, Alert, Text} from 'react-native';
import Colors from '../../res/colors';
import axios from 'axios';
import storage from '../../libs/storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

class AddTripScreen extends Component {
  state = {
    from: '',
    to: '',
    Interests: '',
    dateEnum: '',
    show: false,
    beginDate: '',
    finishDate: '',
  };

  addTrip = async () => {
    const url = 'https://still-shore-58656.herokuapp.com/api/trip/';
    const token = await storage.instance.get('access-token');
    const config = {
      method: 'post',
      url,
      headers: {
        'access-token': token,
      },
      body: {
        from: this.state.from,
        to: this.state.to,
        beginDate: this.state.beginDate,
        finishDate: this.state.finishDate,
      },
    };
    const response = await axios(config);
    console.log(response.data.data);

    Alert.alert('Viaje', response.data.message, [
      {
        text: 'Ok',
        onPress: () =>
          response.status == 200 ? this.login : console.log('Error'),
      },
    ]);
  };

  login = () => {
    this.props.navigation.navigate('My Trips');
  };
  onChangeDatePicker = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const showValue = Platform.OS === 'ios';
    if (this.state.dateEnum == 1) {
      await this.setState({
        beginDate: currentDate,
      });
      console.log(this.state.beginDate);
    } else if (this.state.dateEnum == 2) {
      await this.setState({
        finishDate: currentDate,
      });
    }
    await this.setState({
      show: showValue,
    });
  };
  showDatepickerInit = async () => {
    await this.setState({
      show: true,
      dateEnum: 1,
    });
  };
  showDatepickerFinish = async () => {
    await this.setState({
      show: true,
      dateEnum: 2,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={text => this.setState({from: text})}
          value={this.state.from}
          placeholder="From"
          style={styles.inputText}
        />
        <TextInput
          onChangeText={text => this.setState({to: text})}
          value={this.state.to}
          placeholder="to"
          style={styles.inputText}
        />
        <Text>
          Begin at :
          {this.state.beginDate != ''
            ? moment(this.state.beginDate).format('YYYY-MM-DD')
            : ''}{' '}
        </Text>
        <Button
          onPress={this.showDatepickerInit}
          title="Show begin date picker!"
        />

        <Text>
          Finish at :
          {this.state.finishDate != ''
            ? moment(this.state.finishDate).format('YYYY-MM-DD')
            : ''}{' '}
        </Text>
        <Button
          onPress={this.showDatepickerFinish}
          title="Show finish date picker!"
        />
        {/* <TextInput
          onChangeText={text => this.setState({finishDate: text})}
          value={this.state.finishDate}
          placeholder="Telefono"
          style={styles.inputText}
        /> */}
        {/* <TextInput
          onChangeText={text => this.setState({Interests: text})}
          value={this.state.Interests}
          placeholder="intereses"
          style={styles.inputText}
        /> */}

        <Button
          title={'Guardar Viaje'}
          onPress={this.addTrip}
          style={styles.btn}
        />
        {this.state.show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(Date.now())}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={this.onChangeDatePicker}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputText: {
    color: Colors.blackPearl,
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: Colors.picton,
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: Colors.blackPearl,
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});

export default AddTripScreen;
