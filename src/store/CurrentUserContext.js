import React from 'react';

const CurrentUserContext = React.createContext({
  token: '0',
  user: {},
  login: () => {},
  signOut: () => {},
  signup: () => {},
});

export default CurrentUserContext;
