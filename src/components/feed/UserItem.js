import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Colors from '../../res/colors';
import moment from 'moment';
import storage from '../../libs/storage';
import axios from 'axios';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {Swipeable} from 'react-native-gesture-handler';

class UserItem extends Component {
  constructor(props) {
    super(props);
    this.leftAction = this.leftAction.bind(this);
    this.rightAction = this.rightAction.bind(this);
    this.renderLeftAction = this.renderLeftAction.bind(this);
    this.renderRightAction = this.renderRightAction.bind(this);
  }

  renderLeftAction = () => {
    return <View style={styles.leftAction} />;
  };

  leftAction = async trip => {
    const url = 'https://still-shore-58656.herokuapp.com/api/like/like';
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

  renderRightAction = () => {
    return <View style={styles.rightAction} />;
  };

  rightAction = async trip => {
    const url = 'https://still-shore-58656.herokuapp.com/api/like/dislike';
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
          renderLeftActions={this.renderLeftAction}
          renderRightActions={this.renderRightAction}
          onSwipeableLeftOpen={() => this.leftAction(item)}
          onSwipeableRightOpen={() => this.rightAction(item)}>
          <View style={styles.container}>
            <View style={styles.backgroundImage}>
              <Image
                style={styles.imageContainer}
                source={{uri: item.user.avatar}}
              />
            </View>
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
    marginLeft: 8,
  },
  symbolText: {
    color: Colors.blackPearl,
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 12,
    marginLeft: 8,
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
  imageContainer: {
    backgroundColor: Colors.lightblue,
    height: 320,
    width: 320,
    borderRadius: 10,
  },
  backgroundImage: {
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderBottomEndRadius: 20,
    resizeMode: 'cover'
  },
});

export default UserItem;
