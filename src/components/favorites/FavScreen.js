import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Colors from '../../res/colors';
import storage from '../../libs/storage';
import axios from 'axios';
import FavItem from './FavItem';

const FavScreen = props => {
  const [loading, setLoading] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    setLoading(true);

    const url = 'https://still-shore-58656.herokuapp.com/api/like';
    const token = await storage.instance.get('access-token');

    const config = {
      method: 'get',
      url: url,
      headers: {
        'access-token': token,
      },
    };
    const res = await axios(config);
    console.log(res.data.data.Likes);
    setTrips(res.data.data.Likes);
    setLoading(false);
  };

  const handlePress = trip => {
    props.navigation.navigate('Perfil');
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
          <FavItem item={item} onPress={() => handlePress(item)} />
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
  leftAction: {
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.green,
    borderBottomWidth: 1,
    backgroundColor: Colors.green,
    width: '100%',
  },
  rightAction: {
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.green,
    borderBottomWidth: 1,
    backgroundColor: Colors.carmine,
    width: '100%',
  },
});

export default FavScreen;