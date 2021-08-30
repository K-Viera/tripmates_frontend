import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';
import Colors from '../../res/colors';
import axios from 'axios';
import UserItem from '../feed/UserItem';

class SearchScreen extends Component {
  state = {
    search: '',
    trips: [],
  };
  getTrips = async () => {
    const url = 'https://still-shore-58656.herokuapp.com/api/searchTrips';
    const config = {
      method: 'get',
      url: url,
      headers: {
        condicion: this.state.search,
      },
    };
    const res = await axios(config);
    this.trips = res.data.data;
    console.log(res.data.data);
  };
  searchChange = async value => {
    this.setState({
      search: value,
    });

    this.getTrips();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.linkText}>Search</Text>
        <TextInput
          onChangeText={this.searchChange}
          value={this.state.search}
          placeholder="Search"
          style={styles.inputText}
        />
        <Button
          title={'Buscar'}
          // onPress={login}
          style={styles.btn}
        />
        <FlatList
          data={this.state.trips}
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
      </View>
    );
  }
}

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
});

export default SearchScreen;
