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
    this.rightAction = this.rightAction.bind(this);
    this.renderRightAction = this.renderRightAction.bind(this);
  }

  renderRightAction = () => {
    return <View style={styles.rightAction} />;
  };

  rightAction = async trip => {
    const url = 'https://still-shore-58656.herokuapp.com/api/like/like/delete';
    const token = await storage.instance.get('access-token');

    const config = {
      method: 'put',
      url: url,
      headers: {
        'access-token': token,
      },
      data: {
        trip: trip._id,
      },
    };

    const res = await axios(config);
    console.log(res.data.data);
  };

  render() {
    const {item, onPress} = this.props;
    return (
      <Pressable onPress={onPress}>
        <Swipeable
          renderRightActions={this.renderRightAction}
          onSwipeableRightOpen={() => this.rightAction(item)}>
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
        </Swipeable>
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
  rightAction: {
    backgroundColor: Colors.carmine,
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default FavItem;
