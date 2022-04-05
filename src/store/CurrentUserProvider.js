import { useReducer } from 'react';
import CurrentUserContext from './CurrentUserContext';

const defaultCurrentUserState = {
  token: '',
  user: {},
};

const CurrentUserReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('LOGIN');
      console.log('token', action.user.token);
      const userToken = action.user.token || '';
      const userInfo = action.user.user || {};
      return {
        token: userToken,
        user: userInfo,
      };
    case 'SIGN_OUT':
      return defaultCurrentUserState;
    default:
      return defaultCurrentUserState;
  }
};

const CurrentUserProvider = props => {
  const [currentUserState, dispatchCurrentUserAction] = useReducer(
    CurrentUserReducer,
    defaultCurrentUserState
  );

  const userLoginHandler = user => {
    dispatchCurrentUserAction({
      type: 'LOGIN',
      user: user,
    });
  };

  const userSignOutHandler = () => {
    dispatchCurrentUserAction({
      type: 'SIGN_OUT',
    });
  };

  const currentUserContext = {
    token: currentUserState.token,
    user: currentUserState.user,
    login: userLoginHandler,
    signOut: userSignOutHandler,
    signup: () => {},
  };

  return (
    <CurrentUserContext.Provider value={currentUserContext}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
