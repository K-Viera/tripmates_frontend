import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../../res/colors';
import ChatScreen from './ChatScreen';
import ChatDetailScreen from './ChatDetailScreen';

const Stack = createStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.orange,
          shadowColor: Colors.white,
        },
        headerTintColor: Colors.blackPearl,
      }}>
      <Stack.Screen name="Chats" component={ChatScreen} />
      <Stack.Screen name="Chat" component={ChatDetailScreen} />
    </Stack.Navigator>
  );
};

export default ChatStack;
