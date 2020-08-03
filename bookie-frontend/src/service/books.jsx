import React from "react";
import { genre } from "../util/genre";

export const BooksContext = React.createContext();
const initialState = {
  books: [],
};

export const ActionTypes = {
  SET_BOOKS: "SET_BOOKS",
  DELETE_BOOK: "DELETE_BOOK",
};
const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_BOOKS:
      return {
        ...state,
        books: action.payload.map((book) => {
          return {
            ...book,
            genre: genre.find((el) => book.genre == el.title),
          };
        }),
      };
    case ActionTypes.ADD_BOOK:
      return { ...state, cart: [state.cart, action.payload] };
    case ActionTypes.DELETE_BOOK:
      return {
        ...state,
        cart: state.cart.filter(({ _id }) => _id != action.payload),
      };
    default:
      return state;
  }
};

export const BooksProvidor = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <BooksContext.Provider
      value={{
        state,
        dispatch,
        ActionTypes,
      }}
    >
      {props.children}
    </BooksContext.Provider>
  );
};
