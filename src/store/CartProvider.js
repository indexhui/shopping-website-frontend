import { useReducer } from 'react';

import CartContext from './CartContext';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CartReducer = (state, action) => {
  const existingCartItemIndex = state.items.findIndex(
    item => item.id === action.item.id
  );
  const existingCartItem = state.items[existingCartItemIndex];
  let updatedTotalAmount;
  let updatedItems;

  switch (action.type) {
    case 'ADD_ITEM':
      console.log('ADD_ITEM');
      // const existingCartItem = state.items[existingCartItemIndex];
      // let updatedTotalAmount;
      // let updatedItems;

      // 如果已經在購物車，保留原本的購物車內容，並將數量加上去
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      // 如果原本不在購物車，直接新增進去
      else {
        updatedItems = [...state.items, action.item];
      }

      updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    case 'REMOVE_ITEM':
      console.log('REMOVE_ITEM');
      // const existingCartItemIndex = state.items.findIndex(
      //   item => item.id === action.id
      // );
      // const existingCartItem = state.items[existingCartItemIndex];
      updatedTotalAmount = state.totalAmount - existingCartItem.price;

      // let updatedItems;
      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter(item => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case 'CLEAR_CART':
      return defaultCartState;
    default:
      return defaultCartState;
  }
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(
    CartReducer,
    defaultCartState
  );

  const addItemToCartHandler = item => {
    dispatchCartAction({
      type: 'ADD_ITEM',
      payload: item,
    });
  };

  const removeItemFromCartHandler = id => {
    dispatchCartAction({
      type: 'REMOVE_ITEM',
      payload: id,
    });
  };

  const clearCartHandler = () => {
    dispatchCartAction({
      type: 'CLEAR_CART',
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
