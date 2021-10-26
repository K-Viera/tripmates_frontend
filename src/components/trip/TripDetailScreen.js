import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  VirtualizedList,
} from 'react-native';
import Colors from '../../res/colors';
import storage from '../../libs/storage';
import axios from 'axios';
import moment from 'moment';
import RatingItem from '../rating/RatingItem';

const TripDetailScreen = props => {
  const [viaje, setViaje] = useState({});
  const [user, setUser] = useState({});

  const {mine} = props.route.params;

  useEffect(() => {
    getTrip();
    getProfile();
  }, []);

  const getTrip = async () => {
    const {trip} = props.route.params;
    console.log('Consultar Viaje');

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
    setViaje(res.data.data);
  };

  const deleteTrip = async () => {
    const url = 'https://still-shore-58656.herokuapp.com/api/trip/';
    const token = await storage.instance.get('access-token');

    const config = {
      method: 'delete',
      url: url,
      headers: {
        'access-token': token,
        trip: viaje._id,
      },
    };

    const res = await axios(config);
    console.log(res.data.data);

    props.navigation.navigate('Mis Viajes');
  };

  const editTrip = async trip => {
    props.navigation.navigate('Editar Viaje', {trip});
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

  const goProfile = user => {
    props.navigation.navigate('Perfil', {user});
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backgroundImage}>
        <Image
          style={styles.imageContainer}
          source={{uri: viaje.user !== undefined ? viaje.user.avatar : null}}
        />
        <Text style={styles.textn}>
          {viaje.user !== undefined ? viaje.user.name : ''}
        </Text>
      </View>
      <Text style={styles.text}>Desde: {viaje.from}</Text>
      <Text style={styles.text}>Hacia: {viaje.to}</Text>
      <Text style={styles.text}>
        Fecha Salida: {moment(viaje.beginDate).format('MMMM DD YYYY')}
      </Text>
      <Text style={styles.text}>
        Fecha regreso: {moment(viaje.finishDate).format('MMMM DD YYYY')}
      </Text>

      <Text style={styles.text}>Intereses</Text>
      <View style={styles.view}>
        <FlatList
          horizontal={true}
          data={viaje.Interests}
          keyExtractor={item => item}
          renderItem={({item}) => <Text style={styles.linkText}>{item}      </Text>}
        />
      </View>

      <Text style={styles.btnText} onPress={() => goProfile(viaje.user._id)}>
        Ver Perfil
      </Text>
      {mine !== undefined && mine === true && (
        <View>
          <Text style={styles.btnText} onPress={() => editTrip(viaje._id)}>
            Editar Viaje
          </Text>
          <Text style={styles.btnText} onPress={() => deleteTrip()}>
            Eliminar Viaje
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 15,
  },
  loader: {
    marginTop: 60,
  },
  linkText: {
    opacity: 0.9,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 20,
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
