import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavScreen from './FavScreen';
import Colors from '../../res/colors';
import ProfileStack from '../profile/ProfileStack';
import ProfileScreen from '../profile/ProfileScreen';
import TripDetailScreen from '../trip/TripDetailScreen';

const Stack = createStackNavigator();

const FavsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.orange,
          shadowColor: Colors.white,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen name="Favoritos" component={FavScreen} />
      <Stack.Screen name="Perfil" component={ProfileScreen} />
      <Stack.Screen name="Viaje" component={TripDetailScreen} />
    </Stack.Navigator>
  );
};

export default FavsStack;
