import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Text,
  Platform,
} from 'react-native';
import Colors from '../../res/colors';
import axios from 'axios';
import storage from '../../libs/storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import SelectMultiple from 'react-native-select-multiple';

const intereses = [
  'Viajar',
  'Conocer',
  'Explorar',
  'Diversión',
  'Negocios',
  'Fiesta',
  'Clima',
  'Cultura',
];

class AddTripScreen extends Component {
  state = {
    from: '',
    to: '',
    Interests: [],
    intereses: [],
    dateEnum: '',
    show: false,
    beginDate: '',
    finishDate: '',
  };

  addTrip = async () => {
    await this.getInterests();
    console.log(this.state.Interests);
    const url = 'https://still-shore-58656.herokuapp.com/api/trip/';
    const token = await storage.instance.get('access-token');
    const config = {
      method: 'post',
      url,
      headers: {
        'access-token': token,
      },
      data: this.state,
    };
    const response = await axios(config);
    console.log(response.data.mensaje);

    Alert.alert('Viaje', response.data.mensaje, [
      {
        text: 'Ok',
        onPress: () => this.MyTrips(),
      },
    ]);
  };

  getInterests = () => {
    this.setState({
      Interests: Array.from(this.state.intereses, x => x.value),
    });
  };

  MyTrips = () => {
    this.props.navigation.navigate('Mis Viajes');
  };
  onChangeDatePicker = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const showValue = Platform.OS === 'ios';
    if (this.state.dateEnum === 1) {
      await this.setState({
        beginDate: currentDate,
      });
      console.log(this.state.beginDate);
    } else if (this.state.dateEnum === 2) {
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

  onSelectionsChange = intereses => {
    // selectedFruits is array of { label, value }
    this.setState({intereses});
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
        <Text style={styles.text}>
          Inicio del Viaje :
          {this.state.beginDate !== ''
            ? moment(this.state.beginDate).format('YYYY-MM-DD')
            : ''}{' '}
        </Text>
        <Text style={styles.buttonText} onPress={this.showDatepickerInit}>
          Fecha Inicio
        </Text>

        <Text style={styles.text}>
          Finalización Del Viaje :
          {this.state.finishDate !== ''
            ? moment(this.state.finishDate).format('YYYY-MM-DD')
            : ''}{' '}
        </Text>
        <Text style={styles.buttonText} onPress={this.showDatepickerFinish}>
          Fecha Regreso
        </Text>
        <SelectMultiple
          items={intereses}
          selectedItems={this.state.intereses}
          onSelectionsChange={this.onSelectionsChange}
        />
        <Text style={styles.buttonText} onPress={this.addTrip}>
          Guardar Viaje
        </Text>

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
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.zircon,
    borderRadius: 15,
    margin: 15,
    padding: 15,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AddTripScreen;
