import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Colors from '../../res/colors';
import moment from 'moment';
import {Swipeable} from 'react-native-gesture-handler';

class ChatItem extends Component {
  constructor(props) {
    super(props);

    this.LeftAction = this.LeftAction.bind(this);
  }

  LeftAction = () => {
    return (
      <View style={styles.leftAction}>
        <Text style={styles.nameText}>FF</Text>
      </View>
    );
  };

  render() {
    const {item} = this.props;
    return (
      <Swipeable
        renderLeftActions={this.LeftAction}
        onSwipeableLeftOpen={() => console.log('opening')}>
        <View style={styles.container}>
          <Text style={styles.symbolText}>{item.user.name}</Text>
          <View style={styles.row}>
            <Text style={styles.nameText}>
              {item.Messages[item.Messages.length - 1].message}
            </Text>
            <Text style={styles.nameText}>
              {moment(item.Messages[item.Messages.length - 1].date).format(
                'MMMM DD YYYY',
              )}
            </Text>
          </View>
        </View>
      </Swipeable>
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
  leftAction: {
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
    backgroundColor: Colors.carmine,
    width: '100%',
  },
});

export default ChatItem;
