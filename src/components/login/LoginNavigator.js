import React from 'react';
import Colors from '../../res/colors';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginStack from './LoginStack';

const Tabs = createBottomTabNavigator();

const LoginNavigator = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{
          tintColor: Colors.blackPearl,
          showIcon: true,
          style: {
            backgroundColor: Colors.blackPearl,
          },
          tabBarStyle: [
            {
              display: 'flex',
            },
          ],
        }}>
        <Tabs.Screen
          name="TripMates"
          component={LoginStack}
          options={{
            tabBarIcon: ({tintColor}) => (
              <Icon name="user-circle" size={20} style={{color: tintColor}} />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigator;
