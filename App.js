import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import LoginProvider from './src/libs/LoginProvider';
import MainNavigator from './src/components/MainNavigator';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <LoginProvider>
      <MainNavigator />
    </LoginProvider>
  );
};

export default App;
