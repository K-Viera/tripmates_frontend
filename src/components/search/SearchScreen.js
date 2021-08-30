import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import Colors from '../../res/colors';
import axios from 'axios';
import UserItem from '../feed/UserItem';

class SearchScreen extends Component {
  state = {
    search: '',
    trips: [],
    users: [],
    activeTrips: true,
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
    await this.setState({
      trips: res.data.data,
    });
  };
  getUsers = async () => {
    const url = 'https://still-shore-58656.herokuapp.com/api/searchUsers';
    const config = {
      method: 'get',
      url: url,
      headers: {
        condicion: this.state.search,
      },
    };
    const res = await axios(config);
    await this.setState({
      users: res.data.data,
    });
  };
  chooseComponents = async () => {
    if (this.state.activeTrips == true) {
      this.getTrips();
    } else {
      this.getUsers();
    }
    console.log(this.state.activeTrips);
  };

  componentDidMount = async () => {
    this.getTrips();
  };

  setTrips = async () => {
    await this.setState({
      activeTrips: true,
    });
    this.chooseComponents();
  };
  setUser = async () => {
    await this.setState({
      activeTrips: false,
    });
    this.chooseComponents();
  };

  searchChange = async value => {
    await this.setState({
      search: value,
    });
    this.getTrips();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.linkText}>Search</Text>
        <TextInput
          onChangeText={value => this.searchChange(value)}
          value={this.state.search}
          placeholder="Search"
          style={styles.inputText}
        />
        <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            style={styles.btn}
            onPress={() => this.setTrips()}
            title="Viajes"
          />
          <Button
            style={styles.btn}
            onPress={() => this.setUser()}
            title="Usuarios"
          />
        </View>
        {this.state.activeTrips && (
          <FlatList
            data={this.state.trips}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <Swipeable
              // renderLeftActions={() => LeftAction(item)}
              // onSwipeableLeftOpen={() => console.log('opening')}
              // onPress={() => handlePress(item)}
              >
                <UserItem item={item} />
              </Swipeable>
            )}
          />
        )}
        {!this.state.activeTrips && (
          <FlatList
            data={this.state.users}
            keyExtractor={item => item._id}
            renderItem={({item}) => <Text>hola</Text>}
          />
        )}
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
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
