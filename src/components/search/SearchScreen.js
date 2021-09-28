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
import ProfileItem from '../profile/ProfileItem';
import colors from '../../res/colors';
import SearchTripItem from './SearchTripItem';

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
    console.log('trips', res.data.data);
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
    console.log('users', res.data.data);
  };
  chooseComponents = async () => {
    if (this.state.activeTrips == true) {
      await this.getTrips();
    } else {
      await this.getUsers();
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
    this.chooseComponents();
  };

  handlePressTrip = trip => {
    this.props.navigation.navigate('Viaje', {trip});
  };

  handlePressProfile = user => {
    this.props.navigation.navigate('Perfil', {user});
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={value => this.searchChange(value)}
          value={this.state.search}
          placeholder="Search"
          style={styles.inputText}
        />
        <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            style={styles.btn}
            color={Colors.orange}
            onPress={() => this.setTrips()}
            title="Viajes"
          />
          <Button
            style={styles.btn}
            color={Colors.orange}
            onPress={() => this.setUser()}
            title="Usuarios"
          />
        </View>
        {this.state.activeTrips && (
          <FlatList
            data={this.state.trips}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <SearchTripItem
                item={item}
                onPress={() => this.handlePressTrip(item._id)}
              />
            )}
          />
        )}
        {!this.state.activeTrips && (
          <FlatList
            data={this.state.users}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <ProfileItem
                item={item}
                onPress={() => this.handlePressProfile(item._id)}
              />
            )}
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
    padding: 10,
    backgroundColor: Colors.whiteblue,
    margin: 10,
    borderRadius: 10,
  },
  btn: {
    padding: 8,
    color: Colors.white,
    borderRadius: 80,
    margin: 16,
  },
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
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
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default SearchScreen;
