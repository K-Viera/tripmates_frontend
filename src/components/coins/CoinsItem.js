import React from 'react';
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import ArrowDown from '../../assets/arrow_down.png';
import ArrowUp from '../../assets/arrow_up.png';

const CoinsItem = ({item, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.nameText}>{item.percent_change_1h}</Text>
        <Image
          style={styles.imgIcon}
          source={item.percent_change_1h > 0 ? ArrowUp : ArrowDown}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  nameText: {
    color: 'white',
    fontSize: 14,
  },
  percentText: {
    color: 'white',
    fontSize: 12,
  },
  imgIcon: {
    width: 22,
    height: 22,
  },
});

export default CoinsItem;
