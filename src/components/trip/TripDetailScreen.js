import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from '../../res/colors';
import storage from '../../libs/storage';
import axios from 'axios';
import moment from "moment";

const TripDetailScreen = props => {
  const [trip, setTrip] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    getTrip();
    getProfile();
  }, []);

  const getTrip = async () => {
    const {trip} = props.route.params;

    const url = 'https://still-shore-58656.herokuapp.com/api/trip/especific';
    const token = await storage.instance.get('access-token');

    const config = {
      method: 'get',
      url: url,
      headers: {
        'access-token': token,
        trip: trip,
      },
    };
    const res = await axios(config);
    console.log(res.data.data);
    setTrip(res.data.data);
  };

  const deleteTrip = async () => {
    const url = 'https://still-shore-58656.herokuapp.com/api/trip/';
    const token = await storage.instance.get('access-token');

    const config = {
      method: 'delete',
      url: url,
      headers: {
        'access-token': token,
        trip: trip._id,
      },
    };

    const res = await axios(config);
    console.log(res.data.data);

    props.navigation.navigate('Mis Viajes');
  };

  const getProfile = async () => {
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

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <Image style={styles.imageContainer} source={{uri: trip.user.avatar}} />
        <Text style={styles.textn}>{trip.user.name}</Text>
      </View>
      <Text style={styles.text}>Desde: {trip.from}</Text>
      <Text style={styles.text}>Hacia: {trip.to}</Text>
      <Text style={styles.text}>Fecha Salida: {moment(trip.beginDate).format('MMMM DD YYYY')}</Text>
      <Text style={styles.text}>Fecha regreso: {moment(trip.finishDate).format('MMMM DD YYYY')}</Text>
      {user._id === trip.user && (
        <Text style={styles.btnText} onPress={() => deleteTrip()}>
          Eliminar Viaje
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  btn: {
    padding: 8,
    backgroundColor: Colors.picton,
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.zircon,
    borderRadius: 15,
    margin: 25,
    marginBottom: -5,
    padding: 15,
  },
  loader: {
    marginTop: 60,
  },
  linkText: {
    opacity: 0.9,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  imageContainer: {
    backgroundColor: Colors.lightblue,
    height: 310,
    width: 310,
    borderRadius: 10,
  },
  backgroundImage: {
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomEndRadius: 10,
    flex: 0,
    resizeMode: 'cover',
    padding: -5,
    backgroundColor: Colors.whiteblue,
  },
  textn: {
    color: Colors.blackPearl,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 28,
    backgroundColor: Colors.whiteblue,
    marginTop: 20,
  },
  text: {
    color: Colors.blackPearl,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    backgroundColor: Colors.white,
    marginTop: 20,
  },
});

export default TripDetailScreen;
