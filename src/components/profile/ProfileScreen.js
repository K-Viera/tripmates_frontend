import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Colors from '../../res/colors';
import storage from '../../libs/storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = props => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const {user} = props.route.params;

    const url = 'https://still-shore-58656.herokuapp.com/api/user/profile';
    const token = await storage.instance.get('access-token');

    const config = {
      method: 'get',
      url: url,
      headers: {
        'access-token': token,
        id: user,
      },
    };
    const res = await axios(config);
    console.log(res.data.data);
    setUser(res.data.data);
  };

  const addRating = user => {
    props.navigation.navigate('Comentar', {user});
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backgroundImage}>
        <Image style={styles.imageContainer} source={{uri: user.avatar}} />
        <Text style={styles.text}>{user.name}</Text>
      </View>
      <Text style={styles.textp}>Correo: {user.email}</Text>
      <Text style={styles.textp}>Teléfono: {user.phone}</Text>
      <Text style={styles.textp}>Origen: {user.city}</Text>
      <Text style={styles.buttonText} onPress={() => addRating(user._id)}>
        Agregar Comentario
      </Text>
      <View style={styles.chat} onPress={() => addRating(user._id)}>
        <Icon name="comments" size={20} style={{color: Colors.white}} />
        <Text style={styles.textc}>Chatear</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    //alignItems: 'center',
  },
  text: {
    color: Colors.blackPearl,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: Colors.whiteblue,
    marginTop: 20,
  },
  textp: {
    color: Colors.blackPearl,
    textAlign: 'center',
    fontSize: 15,
    backgroundColor: Colors.white,
    marginTop: 10,
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
    fontStyle: 'italic',
  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.zircon,
    borderRadius: 15,
    margin: 25,
    padding: 15,
  },
  imageContainer: {
    backgroundColor: Colors.lightblue,
    height: 310,
    width: 310,
    borderRadius: 10,
  },
  backgroundImage: {
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomEndRadius: 10,
    flex: 0,
    resizeMode: 'cover',
    padding: -5,
    backgroundColor: Colors.whiteblue,
  },
  chat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.zircon,
    textAlign: 'center',
    padding: 15,
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 15,
    justifyContent: 'center',
  },
  textc: {
    backgroundColor: Colors.zircon,
    color: Colors.white,
    marginLeft: 10,
  },
});

export default ProfileScreen;
