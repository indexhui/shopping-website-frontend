import { useReducer } from 'react';

import ModalContext from './ModalContext';

const defaultModalState = {
  isSignIn: true,
  isSignModalOpen: true,
  isSuccessRegisterModalOpen: false,
};

const ModalReducer = (state, action) => {
  const { isSignIn } = state;
  switch (action.type) {
    case 'SIGN_IN_MODAL_OPEN':
      console.log(action);
      if (action.isSignIn) {
        return {
          isSignIn: true,
          isSignModalOpen: true,
          isSuccessRegisterModalOpen: false,
        };
      }
      return {
        isSignIn: false,
        isSignModalOpen: true,
        isSuccessRegisterModalOpen: false,
      };
    case 'SIGN_IN_MODAL_CLOSE':
      console.log('SIGN_IN_MODAL_CLOSE');
      return {
        isSignIn: false,
        isSignModalOpen: false,
        isSuccessRegisterModalOpen: false,
      };
    case 'SUCCESS_REGISTER_MODAL_OPEN':
      return {
        isSignIn: false,
        isSignModalOpen: false,
        isSuccessRegisterModalOpen: true,
      };
    case 'SUCCESS_REGISTER_MODAL_CLOSE':
      return {
        isSignIn: false,
        isSignModalOpen: false,
        isSuccessRegisterModalOpen: false,
      };
    default:
      return defaultModalState;
  }
};

const ModalProvider = props => {
  const [modalState, dispatchModalAction] = useReducer(
    ModalReducer,
    defaultModalState
  );

  const signInModalOpenHandler = isSignIn => {
    dispatchModalAction({
      type: 'SIGN_IN_MODAL_OPEN',
      isSignIn: isSignIn,
    });
  };

  const signInModalCloseHandler = () => {
    dispatchModalAction({
      type: 'SIGN_IN_MODAL_CLOSE',
    });
  };

  const successRegisterModalOpenHandler = () => {
    dispatchModalAction({
      type: 'SUCCESS_REGISTER_MODAL_OPEN',
    });
  };

  const successRegisterModalCloseHandler = () => {
    dispatchModalAction({
      type: 'SUCCESS_REGISTER_MODAL_CLOSE',
    });
  };

  const modalContext = {
    isSignIn: modalState.isSignIn,
    isSignModalOpen: modalState.isSignModalOpen,
    onSignModalOpen: signInModalOpenHandler,
    onSignModalClose: signInModalCloseHandler,
    isSuccessRegisterModalOpen: modalState.isSuccessRegisterModalOpen,
    onSuccessRegisterModalOpen: successRegisterModalOpenHandler,
    onSuccessRegisterModalClose: successRegisterModalCloseHandler,
  };

  return (
    <ModalContext.Provider value={modalContext}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
