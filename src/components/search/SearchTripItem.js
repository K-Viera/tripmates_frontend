import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../res/colors';
import moment from 'moment';
import storage from '../../libs/storage';
import axios from 'axios';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {Swipeable} from 'react-native-gesture-handler';

class SearchTripItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {item, onPress} = this.props;
    return (
      <Pressable onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.nameContainer}>
            <Text style={styles.symbolText}>{item.user.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.nameText}>Salida: {item.from}</Text>
            <Text style={styles.nameText}>Destino: {item.to}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.nameText}>{moment(item.beginDate).format('MMMM DD YYYY')}</Text>
            <Text style={styles.nameText}>{moment(item.finishDate).format('MMMM DD YYYY')}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderBottomColor: Colors.orange,
    backgroundColor: Colors.orange,
    borderRadius: 20,
    margin: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  symbolText: {
    color: Colors.blackPearl,
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 12,
    marginBottom: 2,
  },
  nameText: {
    color: Colors.blackPearl,
    fontSize: 14,
    marginRight: 16,
  },
  nameContainer: {
    justifyContent: 'center',
  },
});

export default SearchTripItem;
