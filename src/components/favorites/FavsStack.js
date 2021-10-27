import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavScreen from './FavScreen';
import Colors from '../../res/colors';
import ProfileScreen from '../profile/ProfileScreen';
import TripDetailScreen from '../trip/TripDetailScreen';
import ChatDetailScreen from '../chat/ChatDetailScreen';
import RatingsScreen from '../rating/RatingsScreen';

const Stack = createStackNavigator();

const FavsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.orange,
          shadowColor: Colors.blackPearl,
        },
        headerTintColor: Colors.blackPearl,
      }}>
      <Stack.Screen name="Favoritos" component={FavScreen} />
      <Stack.Screen name="Perfil" component={ProfileScreen} />
      <Stack.Screen name="Ratings" component={RatingsScreen} />
      <Stack.Screen name="Chat" component={ChatDetailScreen} />
      <Stack.Screen name="Viaje" component={TripDetailScreen} />
    </Stack.Navigator>
  );
};

export default FavsStack;
