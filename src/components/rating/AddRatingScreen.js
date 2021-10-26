import React, {Component} from 'react';
import {View, StyleSheet, TextInput, Button, Alert, Text} from 'react-native';
import Colors from '../../res/colors';
import axios from 'axios';
import colors from '../../res/colors';
import storage from '../../libs/storage';

class AddRatingScreen extends Component {
  state = {
    rating: '',
    comment: '',
    user: '',
  };

  registrar = async () => {
    const url = 'https://still-shore-58656.herokuapp.com/api/rate/';
    const token = await storage.instance.get('access-token');
    const {user} = this.props.route.params;
    const config = {
      method: 'put',
      url,
      headers: {
        'access-token': token,
        user: user,
      },
      data: {
        comment: this.state.comment,
        rating: this.state.rating,
      },
    };
    const response = await axios(config);
    console.log(response.data.data);

    Alert.alert('Agregar Comentario', response.data.data, [
      {
        text: 'Ok',
      },
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tittle}>Deja tu Comentario</Text>

        <TextInput
          onChangeText={text => this.setState({comment: text})}
          value={this.state.comment}
          placeholder="Comentario"
          style={styles.inputText}
        />
        <TextInput
          onChangeText={text => this.setState({rating: text})}
          value={this.state.rating}
          placeholder="Calificación"
          style={styles.inputText}
          keyboardType="numeric"
        />
        <Button
          title={'Registrar Rating'}
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
  tittle: {
    textAlign: 'center',
    marginBottom: 25,
    fontSize: 30,
    color: colors.white,
    fontWeight: 'bold',
  },
  imageContainer: {
    backgroundColor: '#fe5b29',
    height: 200,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default AddRatingScreen;
