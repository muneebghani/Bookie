import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Col, message, Rate, Button, Layout } from "antd";
import { Genre } from "./";
import {
  HeartOutlined,
  HeartFilled,
  PlusCircleFilled,
  MinusCircleFilled,
  DeleteFilled,
} from "@ant-design/icons";

import "./card.css";
import { addToWishlist } from "../api/user";
import { BASE_URL } from "../util/api";
import { AuthContext } from "../service/authentication";
import { CartContext } from "../service/cart";
import { deleteBook } from "../api/user";
import { Descipofbooks } from './description';

const CardGrid = {};
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

export const Card = ({
  _id,
  rating,
  title,
  author,
  genre,
  image,
  price,
  rentPrice,
  quantity,
  deletable = false,
}) => {
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);

  const favHanlder = async () => {
    const response = await addToWishlist(_id, authContext.state.token);
    console.log(response.data);

    if (response.data.success) {
      authContext.dispatch({
        type: authContext.ActionTypes.SET_WISHLIST,
        payload: response.data.wishlist,
      });
    } else {
      message.success(response.data.error.message);
    }
  };

  const handleDelete = async (id, token) => {
    console.log("ID ", id + " Token ", token);
    const response = await deleteBook(id, token);
    console.log(response);
    if (response.data) {
      message.success("deletion sucessfull");
    } else {
      console.log("error");
    }
  };

  const addToCart = () => {
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
  };

  const removeFromCart = () => {
    cartContext.dispatch({
      type: cartContext.ActionTypes.REMOVE_FROM_CART,
      payload: _id,
    });
  };

  const history = useHistory();

  function handleClick() {
    history.push("/bookdetail");
  }

  return (
    <Col style={{ background: '#f5f5f5', marginBottom: '50px', marginRight: '50px', borderRadius: '6%' }} {...CardGrid}>
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
           <label><Rate tooltips={desc} allowClear={false} />{rating}</label>
          <div className="actions">
            {authContext.state.user &&
              (authContext.state.user.wishlist.find(
                (book) => book._id == _id
              ) ? (
                <HeartFilled onClick={favHanlder} />
              ) : (
                <HeartOutlined onClick={favHanlder} />
              ))}
            {cartContext.state.items.findIndex(
              (cartItem) => cartItem._id == _id
            ) ? (
              <PlusCircleFilled onClick={addToCart} />
            ) : (
              <MinusCircleFilled onClick={removeFromCart} />
            )}
            {deletable && (
              <DeleteFilled
                onClick={() => {
                  handleDelete(_id, authContext.state.token);
                }}
              />
            )}
          </div>
          <p className="heading-primary primary"> {title}</p>
          <p className="text-primary primary-faded ">{author}</p>
          <p className="text-primary primary-faded ">
            Price: <span className="heading-primary primary">{price}</span>
          </p>
          <p className="text-primary primary-faded  ">
            Rent/Day: <span className="heading-primary primary">{rentPrice}</span>
          </p>
          <div>
            <Genre {...genre} />
          </div>
          <Button size="small" onClick={handleClick}>Read more...</Button>
        </div>
      </div>
    </Col>
  );
};
