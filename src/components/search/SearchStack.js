import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../res/colors';
import SearchScreen from './SearchScreen';
import ProfileScreen from '../profile/ProfileScreen';
import TripDetailScreen from '../trip/TripDetailScreen';
import ChatDetailScreen from '../chat/ChatDetailScreen';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.orange,
          shadowColor: Colors.white,
        },
        headerTintColor: Colors.blackPearl,
      }}>
      <Stack.Screen name="Buscar" component={SearchScreen} />
      <Stack.Screen name="Perfil" component={ProfileScreen} />
      <Stack.Screen name="Chat" component={ChatDetailScreen} />
      <Stack.Screen name="Viaje" component={TripDetailScreen} />
    </Stack.Navigator>
  );
};

export default SearchStack;
