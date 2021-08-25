import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Colors from '../../res/colors';
import moment from 'moment';
import {Swipeable} from 'react-native-gesture-handler';
import storage from '../../libs/storage';
import axios from 'axios';

class UserItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {item} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.symbolText}>{item.user.name}</Text>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
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

export default UserItem;
