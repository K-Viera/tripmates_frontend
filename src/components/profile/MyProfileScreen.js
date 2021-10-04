import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Colors from '../../res/colors';
import storage from '../../libs/storage';
import axios from 'axios';
import {useLogin} from '../../libs/LoginProvider';

const MyProfileScreen = props => {
  const {setIsLoggedIn} = useLogin();

  const [user, setUser] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const url = 'https://still-shore-58656.herokuapp.com/api/user/mine';
    const token = await storage.instance.get('access-token');

    const config = {
      method: 'get',
      url: url,
      headers: {
        'access-token': token,
      },
    };
    const res = await axios(config);
    console.log(res.data.data);
    setUser(res.data.data);
  };

  const handleLogout = () => {
    console.log('Logout');
    storage.instance.remove('access-token');
    setIsLoggedIn(false);
  };

  const handleMyTrips = () => {
    props.navigation.navigate('Mis Viajes');
  };

  const handleMyRatings = () => {
    props.navigation.navigate('Mis Ratings');
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
      <Text style={styles.linkText} onPress={() => handleMyTrips()}>
        Ver Mis Viajes
      </Text>
      <Text style={styles.linkText} onPress={() => handleMyRatings()}>
        Ver Mis Comentarios
      </Text>
      <Text style={styles.linkTextLogout} onPress={() => handleLogout()}>
        Cerrar Sesion
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  text: {
    color: Colors.blackPearl,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    backgroundColor: Colors.white,
    marginTop: 20,
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
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.zircon,
    borderRadius: 15,
    margin: 25,
    marginBottom: -5,
    padding: 15,
  },
  linkTextLogout: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.blackPearl,
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
  textp: {
    color: Colors.blackPearl,
    textAlign: 'center',
    fontSize: 15,
    backgroundColor: Colors.white,
    marginTop: 10,
  },
});

export default MyProfileScreen;
