import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../res/colors';
import moment from 'moment';
import storage from '../../libs/storage';
import axios from 'axios';
import {Swipeable} from 'react-native-gesture-handler';

class RatingItem extends Component {
  constructor(props) {
    super(props);
    this.leftAction = this.leftAction.bind(this);
    this.renderLeftAction = this.renderLeftAction.bind(this);
    this.rightAction = this.rightAction.bind(this);
    this.renderRightAction = this.renderRightAction.bind(this);
  }

  renderLeftAction = () => {
    const {item} = this.props;
    return (
      <View style={styles.leftAction}>
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
      </View>
    );
  };

  leftAction = async rate => {
    const url = 'https://still-shore-58656.herokuapp.com/api/rate/approve';
    const token = await storage.instance.get('access-token');

    const config = {
      method: 'put',
      url: url,
      headers: {
        'access-token': token,
      },
      data: {
        rating: rate._id,
        aprove: true,
      },
    };

    const res = await axios(config);
    console.log(res.data.data);
  };

  renderRightAction = () => {
    const {item} = this.props;
    return (
      <View style={styles.rightAction}>
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
      </View>
    );
  };

  rightAction = async rate => {
    const url = 'https://still-shore-58656.herokuapp.com/api/rate/approve';
    const token = await storage.instance.get('access-token');

    const config = {
      method: 'put',
      url: url,
      headers: {
        'access-token': token,
      },
      data: {
        rating: rate._id,
        aprove: false,
      },
    };

    const res = await axios(config);
    console.log(res.data.data);
  };

  render() {
    const {item} = this.props;

    return (
      <Swipeable
        renderLeftActions={this.renderLeftAction}
        onSwipeableLeftOpen={() => this.leftAction(item)}
        renderRightActions={this.renderRightAction}
        onSwipeableRightOpen={() => this.rightAction(item)}>
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
      </Swipeable>
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

export default RatingItem;
