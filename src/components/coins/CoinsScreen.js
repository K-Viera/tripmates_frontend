import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet, FlatList} from 'react-native';
import Http from 'tripmates_frontend/src/libs/http';
import Colors from '../../res/colors';
import CoinsItem from './CoinsItem';

class CoinsScreen extends Component {
  state = {
    coins: [],
    loading: false,
  };

  componentDidMount = async () => {
    this.setState({loading: true});
    const coins = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    this.setState({coins: coins.data, loading: false});
  };

  handlePress = () => {
    console.log('go to hola', this.props);
    this.props.navigation.navigate('CoinsDetails');
  };

  render() {
    const {coins, loading} = this.state;
    return (
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator color="black" size="large" style={styles.loader} />
        ) : null}
        <FlatList
          data={coins}
          renderItem={({item}) => <CoinsItem item={item} />}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.charade},
  btn: {padding: 8, backgroundColor: 'blue', borderRadius: 8, margin: 16},
  btnText: {color: '#fff', textAlign: 'center'},
  loader: {marginTop: 60},
});
export default CoinsScreen;
