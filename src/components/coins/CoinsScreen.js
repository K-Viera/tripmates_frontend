import React, {Component} from 'react';
import {View, Text, Pressable, StyleSheet, FlatList} from 'react-native';
import Http from 'tripmates_frontend/src/libs/http';
class CoinsScreen extends Component {
  state = {
    coins: [],
  };

  componentDidMount = async () => {
    const coins = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    this.setState({coins: coins.data});
  };

  handlePress = () => {
    console.log('go to hola', this.props);
    this.props.navigation.navigate('CoinsDetails');
  };

  render() {
    const {coins} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={coins}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'red'},
  btn: {padding: 8, backgroundColor: 'blue', borderRadius: 8, margin: 16},
  btnText: {color: '#fff', textAlign: 'center'},
});
export default CoinsScreen;
