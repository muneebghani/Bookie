import React, { createContext, useReducer } from "react";
import { genre } from "../util/genre";
export const AuthContext = createContext();
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  books: [],
  transactions: [],
};

const ActionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_WISHLIST: "SET_WISHLIST",
  SET_MYBOOKS: "SET_MYBOOKS",
  SET_TRANSACTIONS: "SET_TRANSACTIONS",
};
const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case ActionTypes.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case ActionTypes.SET_MYBOOKS:
      return {
        ...state,
        books: action.payload.map((book) => {
          return {
            ...book,
            genre: genre.find((el) => book.genre == el.title),
          };
        }),
      };
    case ActionTypes.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    case ActionTypes.SET_WISHLIST:
      return {
        ...state,
        user: {
          ...state.user,
          wishlist: action.payload.map((book) => {
            return {
              ...book,
              genre: genre.find((el) => book.genre == el.title),
            };
          }),
        },
      };
    default:
      return state;
  }
};

export const AuthProvidor = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        ActionTypes,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
