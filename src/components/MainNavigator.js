import React, {useContext} from 'react';
import FeedNavigator from './feed/FeedNavigator';
import LoginNavigator from './login/LoginNavigator';
import {useLogin} from '../libs/LoginProvider';

const MainNavigator = () => {
  const {isLoggedIn} = useLogin();
  return isLoggedIn ? <FeedNavigator /> : <LoginNavigator />;
};
export default MainNavigator;
