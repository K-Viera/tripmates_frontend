import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../res/colors';
import moment from 'moment';
import storage from '../../libs/storage';
import axios from 'axios';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {Swipeable} from 'react-native-gesture-handler';

class FavItem extends Component {
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
            <Text style={styles.symbolText}>{item.to}</Text>
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
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.orange,
    borderBottomWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 20,
    margin: 8,
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
  leftAction: {
    backgroundColor: Colors.green,
    justifyContent: 'space-between',
    width: '100%',
  },
  rightAction: {
    backgroundColor: Colors.carmine,
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default FavItem;
