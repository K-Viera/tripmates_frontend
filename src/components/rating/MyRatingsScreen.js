import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import Colors from '../../res/colors';
import storage from '../../libs/storage';
import axios from 'axios';
import RatingItem from './RatingItem';
const MyRatingsScreen = () => {
  const [loading, setLoading] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    getMyRatings();
  }, []);

  const getMyRatings = async () => {
    setLoading(true);

    const url = 'https://still-shore-58656.herokuapp.com/api/rate/mine';
    const token = await storage.instance.get('access-token');

    const config = {
      method: 'get',
      url: url,
      headers: {
        'access-token': token,
      },
    };
    const res = await axios(config);
    console.log(res.data.data.Rating);
    setRatings(res.data.data.Rating);
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

export default MyRatingsScreen;
