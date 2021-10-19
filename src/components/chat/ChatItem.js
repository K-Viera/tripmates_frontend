import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import Colors from '../../res/colors';
import moment from 'moment';

class ChatItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {item, onPress, user} = this.props;
    return (
      <Pressable onPress={onPress} style={styles.container}>
        <View>
          <View style={styles.backgroundImage}>
            <Image
              style={styles.imageContainer}
              source={{
                uri:
                  user._id == item.user1._id
                    ? item.user2.avatar
                    : item.user1.avatar,
              }}
            />
          </View>
        </View>
        <View style={styles.msgtxt}>
          <Text style={styles.symbolText}>
            {user._id == item.user1._id ? item.user2.name : item.user1.name}
          </Text>
          <Text style={styles.nameText}>
            {item.Messages[item.Messages.length - 1].text}
          </Text>
        </View>
        <View></View>
        <View></View>
        <View></View>
        <View>
          <Text style={styles.nameText}>
            {moment(item.Messages[item.Messages.length - 1].createdAt).format(
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
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: Colors.blackPearl,
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 12,
  },
  nameText: {
    color: Colors.blackPearl,
    fontSize: 14,
    marginRight: 16,
  },
  imageContainer: {
    backgroundColor: Colors.lightblue,
    height: 50,
    width: 50,
    borderRadius: 200,
  },
  backgroundImage: {
    alignItems: 'center',
    flex: 0,
    resizeMode: 'cover',
  },
  msgtxt: {
    alignSelf: 'flex-start',
  },
});

export default ChatItem;
