import React from 'react';

const ModalContext = React.createContext({
  isSignIn: Boolean,
  isSignModalOpen: Boolean,
  onSignModalOpen: () => {},
  onSignModalClose: () => {},
  isSuccessRegisterModalOpen: Boolean,
  onSuccessRegisterModalOpen: () => {},
  onSuccessRegisterModalClose: () => {},
});

export default ModalContext;
