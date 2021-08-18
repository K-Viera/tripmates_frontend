import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import SplashScreen from './SplashScreen';
import Colors from '../../res/colors';

const Stack = createStackNavigator();

const FeedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          shadowColor: Colors.blackPearl,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Register" component={SplashScreen} />
    </Stack.Navigator>
  );
};

export default FeedStack;
