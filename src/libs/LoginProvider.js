import React, {
  createContext,
  useContext,
  Component,
  useState,
  useEffect,
} from 'react';
import storage from './storage';

const LoginContext = React.createContext();

/*class LoginProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    return (
      <LoginContext.Provider value={this.state.isLoggedIn}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}*/

const LoginProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    verifiyLogin();
  }, []);

  const verifiyLogin = async () => {
    if ((await storage.instance.get('access-token')) != undefined) {
      console.log('Login Store');
      setIsLoggedIn(true);
    }
  };

  return (
    <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
