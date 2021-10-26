import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyProfileScreen from './MyProfileScreen';
import Colors from '../../res/colors';
import AddTripScreen from '../trip/AddTripScreen';
import MyTripsScreen from '../trip/MyTripsScreen';
import EditProfileScreen from './EditProfileScreen';
import ProfileScreen from './ProfileScreen';
import TripDetailScreen from '../trip/TripDetailScreen';
import FavoriteUserScreen from './FavoriteUserScreen';
import FavoriteTripsScreen from '../trip/FavoriteTripsScreen';
import AddRatingScreen from '../rating/AddRatingScreen';
import MyRatingsScreen from '../rating/MyRatingsScreen';
import ChatDetailScreen from '../chat/ChatDetailScreen';
import EditTripScreen from '../trip/EditTripScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import RatingsScreen from '../rating/RatingsScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.orange,
          shadowColor: Colors.white,
        },
        headerTintColor: Colors.blackPearl,
      }}>
      <Stack.Screen name="Mi Perfil" component={MyProfileScreen} />
      <Stack.Screen name="Editar Perfil" component={EditProfileScreen} />
      <Stack.Screen name="Agregar Viaje" component={AddTripScreen} />
      <Stack.Screen name="Editar Viaje" component={EditTripScreen} />
      <Stack.Screen name="Mis Viajes" component={MyTripsScreen} />
      <Stack.Screen name="Mis Ratings" component={MyRatingsScreen} />
      <Stack.Screen name="Ratings" component={RatingsScreen} />
      <Stack.Screen name="Viaje" component={TripDetailScreen} />
      <Stack.Screen name="Perfil" component={ProfileScreen} />
      <Stack.Screen name="Comentar" component={AddRatingScreen} />
      <Stack.Screen name="Chat" component={ChatDetailScreen} />
      <Stack.Screen name="Usuarios Favoritos" component={FavoriteUserScreen} />
      <Stack.Screen name="Viajes Favoritos" component={FavoriteTripsScreen} />
      <Stack.Screen
        name="Cambiar Contraseña"
        component={ChangePasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
