import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import Colors from '../../res/colors';
import Http from '../../libs/http';
import axios from 'axios';
class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
  };

  handleEmail = email => {
    this.setState({email});
  };

  handlePwd = password => {
    this.setState({password});
  };

  login = async () => {
    console.log('Login');
    const url = 'https://still-shore-58656.herokuapp.com/api/user/login';

    const response = await axios.post(url, this.state);

    console.log(response.data.mensaje);


  };

  handlePress = () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={this.handleEmail}
          value={this.state.email}
          placeholder="Correo Electronico"
          style={styles.inputText}
        />

        <TextInput
          onChangeText={this.handlePwd}
          value={this.state.password}
          placeholder="Contraseña"
          style={styles.inputText}
        />

        <Button title={'Ingresar'} onPress={this.login} style={styles.btn} />

        <Text style={styles.linkText} onPress={this.handlePress}>
          Registrate Ahora!!
        </Text>
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
  linkText: {
    opacity: 0.9,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontStyle: 'italic',
  },
});

export default LoginScreen;
