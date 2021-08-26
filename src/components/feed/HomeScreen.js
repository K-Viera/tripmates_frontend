import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Colors from '../../res/colors';
import {useLogin} from '../../libs/LoginProvider';
import storage from '../../libs/storage';
import FeedSearch from '../search/FeedSearch';
import axios from 'axios';
import UserItem from './UserItem';
import {Swipeable} from 'react-native-gesture-handler';
const HomeScreen = props => {
  const {setIsLoggedIn} = useLogin();

  const [loading, setLoading] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
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
  };

  const handleLogout = () => {
    console.log('Logout');
    storage.instance.remove('access-token');
    setIsLoggedIn(false);
  };

  const handlePress = trip => {
    console.log(trip);
  };

  const LeftAction = item => {
    return (
      <View style={styles.leftAction}>
        <UserItem item={item} onPress={() => handlePress(item)} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FeedSearch />

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
          <Swipeable
            renderLeftActions={() => LeftAction(item)}
            onSwipeableLeftOpen={() => console.log('opening')}
            onPress={() => handlePress(item)}>
            <UserItem item={item} />
          </Swipeable>
        )}
      />
    </SafeAreaView>
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
  leftAction: {
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
    backgroundColor: Colors.carmine,
    width: '100%',
  },
});

export default HomeScreen;
