import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Colors from '../../res/colors';

class TripItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {item} = this.props;
    return (
      <Pressable style={styles.container}>
        <Text style={styles.symbolText}>{item.user}</Text>
        <View style={styles.row}>
          <Text style={styles.nameText}>{item.from}</Text>
          <Text style={styles.nameText}>{item.to}</Text>
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
    height: 100,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: Colors.blackPearl,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: Colors.blackPearl,
    fontSize: 14,
    marginRight: 16,
  },
});

export default TripItem;
