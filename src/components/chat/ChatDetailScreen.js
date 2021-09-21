import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../res/colors';
import storage from '../../libs/storage';
import axios from 'axios';

const ChatDetailScreen = () => {
  const [chat, setChat] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const {chat} = this.props.route.params;

    const url = 'https://still-shore-58656.herokuapp.com/api/chat/';
    const token = await storage.instance.get('access-token');

    const config = {
      method: 'get',
      url: url,
      headers: {
        'access-token': token,
        chat: chat,
      },
    };
    const res = await axios(config);
    console.log(res.data.data);
    setChat(res.data.data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{chat.user1}</Text>
      <Text style={styles.linkText}>{chat.user2}</Text>
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

export default ChatDetailScreen;
