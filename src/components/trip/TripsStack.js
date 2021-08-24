import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../res/colors';
import TripsScreen from './TripsScreen';
import AddTripScreen from './AddTripScreen';

const Stack = createStackNavigator();

const TripsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.white,
          shadowColor: Colors.white,
        },
        headerTintColor: Colors.blackPearl,
      }}>
      <Stack.Screen name="Trips" component={TripsScreen} />
      <Stack.Screen name="Add Trip" component={AddTripScreen} />
      <Stack.Screen name="My Trips" component={TripsScreen} />
    </Stack.Navigator>
  );
};

export default TripsStack;
