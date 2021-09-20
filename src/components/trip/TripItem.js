import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Colors from '../../res/colors';
import moment from 'moment';
import {Swipeable} from 'react-native-gesture-handler';

class TripItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {item, onPress} = this.props;

    return (
      <Pressable onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.nameText}>{item.from}</Text>
            <Text style={styles.nameText}>{item.to}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.nameText}>
              {moment(item.beginDate).format('MMMM DD YYYY')}
            </Text>
            <Text style={styles.nameText}>
              {moment(item.finishDate).format('MMMM DD YYYY')}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.orange,
    borderRadius: 20,
    margin: 8,
    marginTop: 15,
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
