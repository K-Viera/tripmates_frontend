import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CoinsItem = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.nameText}>{item.percent_change_1h}</Text>
      </View>
    </View>
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
});

export default CoinsItem;
