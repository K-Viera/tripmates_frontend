import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../res/colors';
import TripsScreen from './TripsScreen';
import AddTripScreen from './AddTripScreen';
import MyTripsScreen from './MyTripsScreen';
import ProfileScreen from '../profile/ProfileScreen';
import TripDetailScreen from './TripDetailScreen';
import FavoriteUserScreen from '../profile/FavoriteUserScreen';
import FavoriteTripsScreen from './FavoriteTripsScreen';
import ChatDetailScreen from '../chat/ChatDetailScreen';
import EditTripScreen from './EditTripScreen';
import RatingsScreen from '../rating/RatingsScreen';

const Stack = createStackNavigator();

const TripsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.orange,
          shadowColor: Colors.white,
        },
        headerTintColor: Colors.blackPearl,
      }}>
      <Stack.Screen name="Viajar" component={TripsScreen} />
      <Stack.Screen name="Agregar Viaje" component={AddTripScreen} />
      <Stack.Screen name="Editar Viaje" component={EditTripScreen} />
      <Stack.Screen name="Mis Viajes" component={MyTripsScreen} />
      <Stack.Screen name="Viaje" component={TripDetailScreen} />
      <Stack.Screen name="Perfil" component={ProfileScreen} />
      <Stack.Screen name="Ratings" component={RatingsScreen} />
      <Stack.Screen name="Chat" component={ChatDetailScreen} />
      <Stack.Screen name="Usuarios Favoritos" component={FavoriteUserScreen} />
      <Stack.Screen name="Viajes Favoritos" component={FavoriteTripsScreen} />
    </Stack.Navigator>
  );
};

export default TripsStack;
