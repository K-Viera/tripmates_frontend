import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoinsScreen from './CoinsScreen';
import CoinDetailScreen from './CoinDetailScreen';
import Colors from '../../res/colors';
const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
        },
        headerTintColor: Colors.white,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="Coins" component={CoinsScreen} />
      <Stack.Screen name="CoinsDetails" component={CoinDetailScreen} />
    </Stack.Navigator>
  );
};

export default CoinsStack;
