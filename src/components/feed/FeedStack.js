import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import Colors from '../../res/colors';
import ProfileScreen from '../profile/ProfileScreen';
import TripDetailScreen from '../trip/TripDetailScreen';
import AddRatingScreen from '../rating/AddRatingScreen';

const Stack = createStackNavigator();

const FeedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.orange,
          shadowColor: Colors.blackPearl,
        },
        headerTintColor: Colors.blackPearl,
      }}>
      <Stack.Screen name="Principal" component={HomeScreen} />
      <Stack.Screen name="Perfil" component={ProfileScreen} />
      <Stack.Screen name="Comentar" component={AddRatingScreen} />
      <Stack.Screen name="Viaje" component={TripDetailScreen} />
    </Stack.Navigator>
  );
};

export default FeedStack;
