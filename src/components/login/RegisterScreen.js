import React, {Component} from 'react';
import { View, StyleSheet, TextInput, Button, Alert, Text } from "react-native";
import Colors from '../../res/colors';
import axios from 'axios';
import colors from "../../res/colors";

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

    console.log(response.data);

    Alert.alert('Registro', response.data.message, [
      {
        text: 'Ok',
        onPress: () =>
          response.status == 200 ? this.login : console.log('Error'),
      },
    ]);
  };

  login = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tittle}>Crea una cuenta</Text>

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
    backgroundColor: Colors.orange,
    padding: 50,
  },
  inputText: {
    color: Colors.blackPearl,
    textAlign: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 15,
  },
  btn: {
    padding: 8,
    backgroundColor: Colors.picton,
    borderRadius: 10,
  },
  btnText: {
    color: Colors.blackPearl,
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
  tittle: {
    textAlign: 'center',
    marginBottom: 25,
    fontSize: 30,
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
