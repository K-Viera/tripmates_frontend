import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import Colors from '../../res/colors';
import storage from '../../libs/storage';
import TripItem from '../trip/TripItem';
import axios from 'axios';
const MyTripsScreen = props => {
  const [loading, setLoading] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getMyTrips();
  }, []);

  const getMyTrips = async () => {
    setLoading(true);

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
    setTrips(res.data.data);
    setLoading(false);
  };

  const handlePress = trip => {
    const mine = true;
    props.navigation.navigate('Viaje', {trip, mine});
  };

  const handleMyTrips = () => {
    props.navigation.navigate('Agregar Viaje');
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

      <Text style={styles.linkText} onPress={() => handleMyTrips()}>
        Crear Viaje
      </Text>

      <FlatList
        data={trips}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <TripItem item={item} onPress={() => handlePress(item._id)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  linkText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.zircon,
    borderRadius: 15,
    margin: 25,
    marginBottom: -5,
    padding: 15,
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
});

export default MyTripsScreen;
