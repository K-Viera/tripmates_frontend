import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../res/colors';
import storage from '../../libs/storage';
import axios from 'axios';
import {useLogin} from '../../libs/LoginProvider';

const EditProfileScreen = () => {
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

  const editProfile = async user => {
    const url = 'https://still-shore-58656.herokuapp.com/api/user/';
    const token = await storage.instance.get('access-token');

    const config = {
      method: 'put',
      url: url,
      headers: {
        'access-token': token,
      },
      body: {
        user,
      },
    };
    const res = await axios(config);
  };

  const handleLogout = () => {
    console.log('Logout');
    storage.instance.remove('access-token');
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <image></image>
      <Text style={styles.text}>{user.name}</Text>
      <view style={styles.contlogout}>
        <Text style={styles.linkText} onPress={() => handleLogout()}>
          Cerrar Sesion
        </Text>
      </view>
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
  contlogout: {
    backgroundColor: Colors.orange,
    padding: 5,
  },
});

export default EditProfileScreen;
