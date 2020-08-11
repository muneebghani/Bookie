import React from "react";

export const CartContext = React.createContext();
const initialState = {
  items: [],
};

export const ActionTypes = {
  INIT: "INIT",
  SAVE: "SAVE",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  TOGGLE_QUANTITY: "TOGGLE_QUANTITY",
  CHECKOUT: "CHECKOUT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, { ...action.payload }],
      };
    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(({ _id }) => _id != action.payload),
      };
    case ActionTypes.TOGGLE_QUANTITY:
      return;
    case ActionTypes.CHECKOUT:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

export const CartProvidor = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        ActionTypes,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
