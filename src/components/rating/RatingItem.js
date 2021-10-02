import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../res/colors';
import moment from 'moment';

class RatingItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {item} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.symbolText}>{item.user.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.nameText}>{item.comment}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.symbolText}>{item.rating}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.nameText}>
            {moment(item.date).format('MMMM DD YYYY')}
          </Text>
        </View>
      </View>
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

export default RatingItem;
