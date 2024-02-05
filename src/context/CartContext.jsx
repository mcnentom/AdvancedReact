// context/CartContext.js
// import React, { createContext, useReducer } from 'react';

// const initialState = {
//   cartItems: [],
// };

// export const CartContext = createContext(initialState);

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       const existingIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
//       if (existingIndex !== -1) {
//         const updatedCartItems = [...state.cartItems];
//         updatedCartItems[existingIndex].quantity++;
//         return { ...state, cartItems: updatedCartItems };
//       } else {
//         return { ...state, cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }] };
//       }
//     default:
//       return state;
//   }
// };

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = item => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  return <CartContext.Provider value={{ ...state, addToCart }}>{children}</CartContext.Provider>;
};
