import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import Colors from '../../res/colors';
import axios from 'axios';
import storage from '../../libs/storage';
import {useLogin} from '../../libs/LoginProvider';
import colors from '../../res/colors';

const LoginScreen = props => {
  const {setIsLoggedIn} = useLogin();
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
      console.log('Login');
    } else {
    }
  };

  const handlePress = () => {
    props.navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>TripMates</Text>

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
        required
      />

      <Button title={'Ingresar'} onPress={login} style={styles.btn} />

      <Text style={styles.linkText} onPress={handlePress}>
        ¿Olvidaste tu contraseña?
      </Text>

      <Text style={styles.linkText} onPress={handlePress}>
        Crear una cuenta
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.orange,
    padding: 50,
  },
  inputText: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 20,
    color: Colors.blackPearl,
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: Colors.white,
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
    marginTop: 25,
    opacity: 0.9,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.zircon,
    fontSize: 17,
  },
  tittle: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 50,
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
