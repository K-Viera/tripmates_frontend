import React, {Component} from 'react';
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import Colors from '../../res/colors';
import moment from 'moment';

class ProfileItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {item, onPress} = this.props;
    return (
      <Pressable onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.backgroundImage}>
            <Image style={styles.imageContainer} source={{uri: item.avatar}} />
          </View>
          <Text style={styles.symbolText}>{item.name}</Text>
          <Text style={styles.nameText}>{item.email}</Text>
          <Text style={styles.nameText}>{item.phone}</Text>
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
  },
  symbolText: {
    color: Colors.blackPearl,
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 12,
  },
  nameText: {
    color: Colors.blackPearl,
    fontSize: 14,
    marginRight: 16,
  },
  backgroundImage: {
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomEndRadius: 20,
    flex: 0,
    resizeMode: 'cover',
    padding: -5,
  },
  imageContainer: {
    backgroundColor: Colors.lightblue,
    height: 320,
    width: 320,
    borderRadius: 10,
  },
});

export default ProfileItem;
