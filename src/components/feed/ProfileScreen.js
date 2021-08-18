import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import Colors from '../../res/colors';

class ProfileScreen extends Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.linkText}>My Profile</Text>
      </View>
    );
  }
}

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

export default ProfileScreen;
