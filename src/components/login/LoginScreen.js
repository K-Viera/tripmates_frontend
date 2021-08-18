import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import Colors from '../../res/colors';
import axios from 'axios';
import storage from '../../libs/storage';
import {useLogin} from '../../libs/LoginProvider';

const LoginScreen = ({props}) => {
  const {setIsLoggedIn, setProfile} = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    console.log('Login');
    const url = 'https://still-shore-58656.herokuapp.com/api/user/login';

    const response = await axios.post(url, {email, password});

    console.log(response.data.mensaje);

    if (response.status === 200) {
      await storage.instance.store('access-token', response.data.token);
      setIsLoggedIn(true);
    } else {
    }
  };

  const handlePress = () => {
    props.navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Correo Electronico"
        style={styles.inputText}
      />

      <TextInput
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Contraseña"
        style={styles.inputText}
        secureTextEntry
      />

      <Button title={'Ingresar'} onPress={login} style={styles.btn} />

      <Text style={styles.linkText} onPress={handlePress}>
        Registrate Ahora!!
      </Text>
    </View>
  );
};

/*class LoginScreen extends Component {
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

    if (response.status === 200) {
      await storage.instance.store('access-token', response.data.token);
    } else {
    }
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
          secureTextEntry
        />

        <Button title={'Ingresar'} onPress={this.login} style={styles.btn} />

        <Text style={styles.linkText} onPress={this.handlePress}>
          Registrate Ahora!!
        </Text>
      </View>
    );
  }
}*/

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
