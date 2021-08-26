import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Button, Alert} from 'react-native';
import Colors from '../../res/colors';
import axios from 'axios';

class RegisterScreen extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    phone: '',
    city: '',
  };

  registrar = async () => {
    console.log('Register');
    console.log(this.state);
    const url = 'https://still-shore-58656.herokuapp.com/api/user/';
    const response = await axios.post(url, this.state);

    console.log(response.status);

    Alert.alert('Registro', response.data.mensaje, [
      {
        text: 'Ok',
        onPress: () => this.login(),
      },
    ]);
  };

  login = () => {
    console.log('go to login');
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={text => this.setState({email: text})}
          value={this.state.email}
          placeholder="Correo Electronico"
          style={styles.inputText}
        />
        <TextInput
          onChangeText={text => this.setState({password: text})}
          value={this.state.password}
          placeholder="Contraseña"
          style={styles.inputText}
          secureTextEntry
        />
        <TextInput
          onChangeText={text => this.setState({name: text})}
          value={this.state.name}
          placeholder="Nombre"
          style={styles.inputText}
        />
        <TextInput
          onChangeText={text => this.setState({phone: text})}
          value={this.state.phone}
          placeholder="Telefono"
          style={styles.inputText}
        />
        <TextInput
          onChangeText={text => this.setState({city: text})}
          value={this.state.city}
          placeholder="Ciudad"
          style={styles.inputText}
        />

        <Button
          title={'Registrar'}
          onPress={this.registrar}
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

export default RegisterScreen;
