import React, {Fragment, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from './src/res/colors';
import LoginStack from './src/components/login/LoginStack';
import FeedStack from './src/components/feed/FeedStack';
import Icon from 'react-native-vector-icons/FontAwesome';
//import Storage from 'src/libs/storage';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './src/components/feed/HomeScreen';

const Tabs = createBottomTabNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

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

export default App;
