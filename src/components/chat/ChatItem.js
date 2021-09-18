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
    const {item, onPress} = this.props;
    return (
      <Pressable onPress={onPress}>
        <View style={styles.container}>
          <Text style={styles.symbolText}>{item.user2.name}</Text>
          <Text style={styles.nameText}>
            {item.Messages[item.Messages.length - 1].message}
          </Text>
          <Text style={styles.nameText}>
            {moment(item.Messages[item.Messages.length - 1].date).format(
              'MMMM DD YYYY',
            )}
          </Text>
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
});

export default ChatItem;
