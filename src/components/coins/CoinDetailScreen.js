import React, {Component} from 'react';
import {View, Text} from 'react-native';

class CoinDetailScreen extends Component {
  state = {
    coin: {},
  };
  componentDidMount() {
    const {coin} = this.props.route.params;
    this.props.navigation.setOptions({title: coin.symbol});
    this.setState({coin});
  }
  render() {
    const {coin} = this.state;
    return (
      <View>
        <View>
          <Text>{coin.name}</Text>
        </View>
      </View>
    );
  }
}
export default CoinDetailScreen;
