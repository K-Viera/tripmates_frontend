import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import Colors from '../../res/colors';
import storage from '../../libs/storage';
import axios from 'axios';
import RatingItem from './RatingItem';
import {useIsFocused} from '@react-navigation/native';
const RatingsScreen = props => {
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    getMyRatings();
  }, [isFocused]);

  const getMyRatings = async () => {
    const {user} = props.route.params;
    setLoading(true);

    const url = 'https://still-shore-58656.herokuapp.com/api/rate/';
    const token = await storage.instance.get('access-token');

    const config = {
      method: 'get',
      url: url,
      headers: {
        'access-token': token,
        user: user,
      },
    };
    const res = await axios(config);
    console.log(res.data.data[0].Rating[0]);
    setRatings(res.data.data[0].Rating);
    setLoading(false);
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
        data={ratings}
        keyExtractor={item => item._id}
        renderItem={({item}) => <RatingItem item={item} />}
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

export default RatingsScreen;
