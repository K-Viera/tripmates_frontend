import React, {Component} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Http from 'tripmates_frontend/src/libs/http';
class CoinsScreen extends Component {
  componentDidMount = async () => {
    const coins = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    console.log('coins: ', coins);
  };

  handlePress = () => {
    console.log('go to hola', this.props);
    this.props.navigation.navigate('CoinsDetails');
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Coins Screen</Text>
        <Pressable style={styles.btn} onPress={this.handlePress}>
          <Text style={styles.btnText}>ir a details</Text>
        </Pressable>
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
