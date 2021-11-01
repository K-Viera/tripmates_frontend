import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Text,
} from 'react-native';
import Colors from '../../res/colors';
import storage from '../../libs/storage';
import axios from 'axios';
import UserItem from './UserItem';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = props => {
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(false);
  const [feedTrips, setFeedTrips] = useState([]);

  useEffect(() => {
    getFeed();
  }, [isFocused]);

  const getFeed = async () => {
    const myTrips = await getMyTrips();

    if (myTrips.length === 0) {
      props.navigation.navigate('Agrega Tu Primer Viaje');
    } else {
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
      console.log('Feed Trips');
      console.log(res.data.data);
      setFeedTrips(res.data.data);
      setLoading(false);
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
    console.log('My Trips');
    console.log(res.data.data);
    return res.data.data;
  };

  return (
    <SafeAreaView style={styles.container}>
      {feedTrips.length > 0 ? (
        <SafeAreaView style={styles.container}>
          {loading ? (
            <ActivityIndicator
              style={styles.loader}
              color={Colors.blackPearl}
              size="large"
            />
          ) : null}

          <FlatList
            data={feedTrips}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <UserItem
                item={item}
                onPress={() => handlePress(item.user._id)}
              />
            )}
          />
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <Text style={styles.symbolText}>
            No tenemos viajes para mostrarte
          </Text>
          <Text style={styles.linkText}>
            Busca Nuevos Viajes o Agrega los tuyos
          </Text>
        </SafeAreaView>
      )}
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
    fontSize: 18,
  },
  symbolText: {
    color: Colors.blackPearl,
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
});

export default HomeScreen;
