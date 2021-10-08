import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Text,
} from 'react-native';
import Colors from '../../res/colors';
import {useLogin} from '../../libs/LoginProvider';
import storage from '../../libs/storage';
import FeedSearch from '../search/FeedSearch';
import axios from 'axios';
import UserItem from './UserItem';
import {Swipeable} from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const HomeScreen = props => {
  const {setIsLoggedIn} = useLogin();

  const [loading, setLoading] = useState([]);
  const [trips, setTrips] = useState([]);
  const [myTrips, setMyTrips] = useState([]);

  useEffect(() => {
    getMyTrips();
    getFeed();
  }, []);

  const getFeed = async () => {
    if (myTrips !== undefined && myTrips.length > 0) {
      setLoading(true);

      const url = 'https://still-shore-58656.herokuapp.com/api/feed';
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
      setTrips(res.data.data);
      setLoading(false);
    } else {
      props.navigation.navigate('Agrega Tu Primer Viaje');
    }

  };

  const handlePress = user => {
    props.navigation.navigate('Perfil', {user});
  };

  const getMyTrips = async () => {
    const url = 'https://still-shore-58656.herokuapp.com/api/trip/mines';
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
    setMyTrips(res.data.data);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={styles.loader}
          color={Colors.blackPearl}
          size="large"
        />
      ) : null}

      <FlatList
        data={trips}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <UserItem item={item} onPress={() => handlePress(item.user._id)} />
        )}
      />
    </SafeAreaView>
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

export default HomeScreen;
