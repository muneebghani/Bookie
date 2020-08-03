import React, { useContext } from "react";

import { Col, message } from "antd";
import { Genre } from "./";
import {
  HeartOutlined,
  HeartFilled,
  PlusCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";

import "./card.css";
import { addToWishlist } from "../api/user";
import { BASE_URL } from "../util/api";
import { AuthContext } from "../service/authentication";
import { CartContext } from "../service/cart";

const CardGrid = {};

export const Cartitem = ({
  _id,

  title,
  author,
  genre,
  image,
  price,
  quantity,
}) => {
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  return (
    <Col {...CardGrid}>
      <div className="book-card">
        <div
          className="image"
          style={{
            backgroundPosition: "center",
            backgroundImage: `url('${BASE_URL + "/" + image}')`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="body">
          <p className="heading-primary primary-faded ">{price || 0} Rs</p>
          <div
            className="actions"
            onClick={async () => {
              const response = await addToWishlist(
                _id,
                authContext.state.token
              );
              console.log(response.data);

              if (response.data.success) {
                authContext.dispatch({
                  type: authContext.ActionTypes.SET_WISHLIST,
                  payload: response.data.wishlist,
                });
              } else {
                message.success(response.data.error.message);
              }
            }}
          >
            {authContext.state.user.wishlist.find((book) => book._id == _id) ? (
              <HeartFilled />
            ) : (
              <HeartOutlined />
            )}
            {cartContext.state.items.findIndex(
              (cartItem) => cartItem._id == _id
            ) ? (
              <PlusCircleFilled
                onClick={() => {
                  cartContext.dispatch({
                    type: cartContext.ActionTypes.ADD_TO_CART,
                    payload: {
                      _id,
                      image,
                      title,
                      quantity,
                      genre,
                      author,
                      price,
                    },
                  });
                }}
              />
            ) : (
              <MinusCircleFilled
                onClick={() => {
                  cartContext.dispatch({
                    type: cartContext.ActionTypes.REMOVE_FROM_CART,
                    payload: _id,
                  });
                }}
              />
            )}
          </div>
          <p className="heading-primary primary"> {title}</p>
          <p className="text-primary primary-faded ">{author}</p>

          <div>
            <Genre {...genre} />
          </div>
        </div>
      </div>
    </Col>
  );
};
