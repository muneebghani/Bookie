import React, { Fragment, useEffect, useContext } from "react";
import { Cartitem, Section } from "../components";
import { Row, Button, message } from "antd";
import { CartContext } from "../service/cart";
import { addTransaction } from "../api/user";
import { AuthContext } from "../service/authentication";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

export const Cart = () => {
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);

  const history = useHistory("/");

  const checkout = async () => {
    const response = await addTransaction(
      cartContext.state,
      authContext.state.token
    );
    console.log(response.data);

    if (response.data.success) {
      cartContext.dispatch({
        type: cartContext.ActionTypes.CHECKOUT,
      });
      message.success("check for transactions to keep track");
    }
  };

  if (!authContext.state.isAuthenticated) {
    return <Redirect to="/signin" />;
  } else if (authContext.state.isAuthenticated) {
    return (
      <Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className="heading-large primary">Happy Shopping !</p>
          <div>
            <Button size="large" onClick={checkout}>
              Checkout
            </Button>
          </div>
        </div>
        <Section>
          <Row>
            {cartContext.state.items.map((book) => (
              <Cartitem key={book._id} {...book} />
            ))}
          </Row>
        </Section>
      </Fragment>
    );
  }
};
