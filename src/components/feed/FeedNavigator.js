import React from 'react';
import Colors from '../../res/colors';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeedStack from './FeedStack';

const Tabs = createBottomTabNavigator();

const FeedNavigator = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={{
          tintColor: Colors.blackPearl,
          showIcon: true,
          headerShown: false,
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
          name="Principal"
          component={FeedStack}
          options={{
            tabBarIcon: ({tintColor}) => (
              <Icon name="home" size={20} style={{color: tintColor}} />
            ),
          }}
        />
        <Tabs.Screen
          name="Buscar"
          component={FeedStack}
          options={{
            tabBarIcon: ({tintColor}) => (
              <Icon name="search" size={20} style={{color: tintColor}} />
            ),
          }}
        />
        <Tabs.Screen
          name="Viajar"
          component={FeedStack}
          options={{
            tabBarIcon: ({tintColor}) => (
              <Icon name="map-marker" size={20} style={{color: tintColor}} />
            ),
          }}
        />
        <Tabs.Screen
          name="Chat"
          component={FeedStack}
          options={{
            tabBarIcon: ({tintColor}) => (
              <Icon name="whatsapp" size={20} style={{color: tintColor}} />
            ),
          }}
        />
        <Tabs.Screen
          name="Perfil"
          component={FeedStack}
          options={{
            tabBarIcon: ({tintColor}) => (
              <Icon name="user" size={20} style={{color: tintColor}} />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default FeedNavigator;
