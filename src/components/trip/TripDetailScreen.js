import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../res/colors';
import storage from '../../libs/storage';
import axios from 'axios';
import {useLogin} from '../../libs/LoginProvider';

const TripDetailScreen = () => {
  const [trip, setTrip] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const url = 'https://still-shore-58656.herokuapp.com/api/trip/especific';
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
    setTrip(res.data.data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{trip}</Text>
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
});

export default TripDetailScreen;
