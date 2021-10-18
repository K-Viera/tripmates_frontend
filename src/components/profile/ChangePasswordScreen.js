import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Alert, Text, Platform} from 'react-native';
import Colors from '../../res/colors';
import storage from '../../libs/storage';

class ChangePasswordScreen extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };
  cambiar = async () => {
    if (this.state.newPassword == this.state.confirmNewPassword) {
      console.log('send change password');
      const url =
        'https://still-shore-58656.herokuapp.com/api/user/changePassword';
      const token = await storage.instance.get('access-token');
      const config = {
        method: 'put',
        url,
        headers: {
          'access-token': token,
        },
        data: this.state,
      };
      const response = await axios(config);
      console.log(response.status);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tittle}>Cambiar Contraseña</Text>
        <TextInput
          onChangeText={text => this.setState({oldPassword: text})}
          value={this.state.oldPassword}
          placeholder="Contraseña Actual"
          style={styles.inputText}
        />
        <TextInput
          onChangeText={text => this.setState({newPassword: text})}
          value={this.state.newPassword}
          placeholder="Nueva Contraseña"
          style={styles.inputText}
        />
        <TextInput
          onChangeText={text => this.setState({confirmNewPassword: text})}
          value={this.state.confirmNewPassword}
          placeholder="Confirmar Nueva Contraseña"
          style={styles.inputText}
        />
        <Text onPress={this.cambiar} style={styles.linkTextR}>
          Cambiar
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.orange,
    paddingHorizontal: 50,
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
  linkText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.zircon,
    borderRadius: 15,
    margin: 25,
    marginBottom: -5,
    padding: 15,
  },
  linkTextR: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.zircon,
    borderRadius: 15,
    margin: 25,
    marginBottom: 20,
    padding: 15,
  },
  tittle: {
    textAlign: 'center',
    marginBottom: 25,
    fontSize: 30,
    color: Colors.white,
    fontWeight: 'bold',
  },
  imageContainer: {
    backgroundColor: '#fe5b29',
    height: 310,
    width: 310,
    borderRadius: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});
export default ChangePasswordScreen;
