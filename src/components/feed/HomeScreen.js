import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import Colors from '../../res/colors';
import axios from 'axios';
import {useLogin} from '../../libs/LoginProvider';

const HomeScreen = props => {
  const {setIsLoggedIn} = useLogin();

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.linkText}>Bienvenido</Text>
      <Text style={styles.linkText} onPress={handleLogout}>
        Cerrar Sesión
      </Text>
    </View>
  );
};

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
    fontStyle: 'italic',
  },
});

export default HomeScreen;
