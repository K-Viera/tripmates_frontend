import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Button, Alert} from 'react-native';
import Colors from '../../res/colors';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

class AddTripScreen extends Component {
  state = {
    from: '',
    to: '',
    beginDate: '',
    finishDate: '',
    Interests: '',
    date: new Date(Date.now()),
    show: false,
    dateFinish: new Date(Date.now()),
  };

  addTrip = async () => {
    const url = 'https://still-shore-58656.herokuapp.com/api/trip/';
    const response = await axios.post(url, this.state);

    console.log(response.data);

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
    await this.setState({
      date: currentDate,
      show: showValue,
    });
  };
  showDatepicker = async () => {
    await this.setState({
      show: true,
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
        <Button onPress={this.showDatepicker} title="Show date picker!" />
        {this.state.show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={this.onChangeDatePicker}
          />
        )}
        {/* <TextInput
          onChangeText={text => this.setState({beginDate: text})}
          value={this.state.beginDate}
          placeholder="Nombre"
          style={styles.inputText}
        /> */}
        <Button onPress={this.showDatepicker} title="Show date picker!" />
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
