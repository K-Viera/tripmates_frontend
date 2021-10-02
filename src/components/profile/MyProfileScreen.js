import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.text}>{user.name}</Text>
      <Text style={styles.linkText} onPress={() => handleMyTrips()}>
        Ver Mis Viajes
      </Text>
      <Text style={styles.linkText} onPress={() => handleMyRatings()}>
        Ver Mis Comentarios
      </Text>
      <Text style={styles.linkTextLogout} onPress={() => handleLogout()}>
        Cerrar Sesion
      </Text>
    </View>
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
});

export default MyProfileScreen;
