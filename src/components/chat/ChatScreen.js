import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import Colors from '../../res/colors';
import storage from '../../libs/storage';
import axios from 'axios';
import ChatItem from './ChatItem';
import {useIsFocused} from '@react-navigation/native';

const ChatScreen = props => {
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState([]);
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getChats();
    getUser();
  }, [isFocused]);

  const getChats = async () => {
    setLoading(true);

    const url = 'https://still-shore-58656.herokuapp.com/api/chat/see';
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
    setChats(res.data.data);
    setLoading(false);
  };

  const getUser = async () => {
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

  const handlePress = (chatId, user) => {
    props.navigation.navigate('Chat', {chatId, user});
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={styles.loader}
          color={Colors.blackPearl}
          size="large"
        />
      ) : null}

      <FlatList
        data={chats}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <ChatItem
            item={item}
            user={user}
            onPress={() => handlePress(item._id, user)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.orange,
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
export default ChatScreen;
