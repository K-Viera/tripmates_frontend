import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import Colors from '../../res/colors';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.white,
            shadowColor: Colors.white,
          },
          headerTintColor: Colors.blackPearl,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginStack;
