import React from 'react';
import FeedNavigator from './feed/FeedNavigator';
import {useLogin} from '../libs/LoginProvider';
import LoginStack from './login/LoginStack';

const MainNavigator = () => {
  const {isLoggedIn} = useLogin();
  return isLoggedIn ? <FeedNavigator /> : <LoginStack />;
};
export default MainNavigator;
